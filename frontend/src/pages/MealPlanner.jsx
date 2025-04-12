import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const MealPlanner = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // USDA API Key
  const API_KEY = "DEMO_KEY"; 

  const searchFood = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}&pageSize=5`
      );
      const data = await response.json();
      setResults(data.foods || []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
    setLoading(false);
  };

  const getNutrientValue = (nutrients, nutrientId) => {
    const nutrient = nutrients?.find(n => n.nutrientId === nutrientId || n.nutrientNumber === nutrientId.toString());
    return nutrient ? Math.round(nutrient.value) : 0;
  };

  const addToPlan = (food) => {
    const calories = getNutrientValue(food.foodNutrients, 1008);
    const protein = getNutrientValue(food.foodNutrients, 1003);
    const carbs = getNutrientValue(food.foodNutrients, 1005);
    const fat = getNutrientValue(food.foodNutrients, 1004);

    const newFood = {
      name: food.description,
      calories: calories || 0,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0
    };
    
    setMealPlan([...mealPlan, newFood]);
  };

  const removeFromPlan = (index) => {
    const newPlan = mealPlan.filter((_, i) => i !== index);
    setMealPlan(newPlan);
  };

  const totalCalories = mealPlan.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = mealPlan.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = mealPlan.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFat = mealPlan.reduce((acc, curr) => acc + curr.fat, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide transition-colors">
                AI <span className="brand-text">Meal Planner</span>
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mt-2 transition-colors">Search foods and build your daily nutrition plan.</p>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 text-blue-600 dark:text-neon-blue shadow-sm transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Search */}
            <div className="card h-fit">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Search Food Database</h2>
              <form onSubmit={searchFood} className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Chicken breast, Rice, Banana"
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-brand whitespace-nowrap" disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </button>
              </form>

              {/* Search Results */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {results.map((food, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-slate-700/50 rounded-xl bg-gray-100 dark:bg-slate-800/30 flex justify-between items-center transition-colors">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-slate-200 capitalize transition-colors">{food.description.toLowerCase()}</h3>
                      <p className="text-xs text-blue-600 dark:text-neon-blue mt-1 transition-colors">
                        {getNutrientValue(food.foodNutrients, 1008)} kcal | {getNutrientValue(food.foodNutrients, 1003)}g Protein
                      </p>
                    </div>
                    <button 
                      onClick={() => addToPlan(food)}
                      className="text-2xl text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Meal Plan Summary */}
            <div className="card flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Your Daily Plan</h2>
              
              {/* Macro Summary */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-100 dark:bg-neon-purple/20 border border-purple-200 dark:border-neon-purple/30 p-4 rounded-xl text-center transition-colors">
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase transition-colors">Calories</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-neon-purple transition-colors">{totalCalories}</p>
                </div>
                <div className="bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 p-4 rounded-xl text-center transition-colors">
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase transition-colors">Protein</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-slate-200 transition-colors">{totalProtein}g</p>
                </div>
                <div className="bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 p-4 rounded-xl text-center transition-colors">
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase transition-colors">Carbs</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-slate-200 transition-colors">{totalCarbs}g</p>
                </div>
                <div className="bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 p-4 rounded-xl text-center transition-colors">
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase transition-colors">Fat</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-slate-200 transition-colors">{totalFat}g</p>
                </div>
              </div>

              {/* Plan List */}
              <div className="flex-1 overflow-y-auto space-y-3">
                {mealPlan.map((food, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-slate-700/50 rounded-xl bg-gray-100 dark:bg-slate-800/30 flex justify-between items-center group transition-colors">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-slate-200 capitalize transition-colors">{food.name.toLowerCase()}</h3>
                      <p className="text-xs text-blue-600 dark:text-neon-blue mt-1 transition-colors">
                        {food.calories} kcal
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromPlan(index)}
                      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                {mealPlan.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 py-12 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300 dark:text-slate-700 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                    </svg>
                    <p>Your meal plan is empty.</p>
                    <p className="text-sm mt-1">Search for foods above to add them.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
