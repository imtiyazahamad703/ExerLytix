import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const MealPlanner = () => {
  const [activeTab, setActiveTab] = useState("smart");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // === MANUAL PLANNER STATES ===
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  // === SMART PLANNER STATES ===
  const [pantryChips, setPantryChips] = useState([]); // from DB
  const [pantrySearch, setPantrySearch] = useState("");
  const [pantrySearchResults, setPantrySearchResults] = useState([]);
  const [isSearchingPantry, setIsSearchingPantry] = useState(false);
  
  const [targetCalories, setTargetCalories] = useState(2000);
  const [targetProtein, setTargetProtein] = useState(150);
  const [generatedPlans, setGeneratedPlans] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const API_KEY = "DEMO_KEY"; 

  // Helpers
  const getNutrientValue = (nutrients, nutrientId) => {
    const nutrient = nutrients?.find(n => n.nutrientId === nutrientId || n.nutrientNumber === nutrientId.toString() || (n.nutrient && n.nutrient.id === nutrientId));
    return nutrient ? (nutrient.value || nutrient.amount || 0) : 0;
  };

  // --- INIT PANTRY ---
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/pantry", { withCredentials: true });
        setPantryChips(res.data);
      } catch (err) {
        console.error("Failed to load pantry from DB", err);
      }
    };
    fetchPantry();
  }, []);

  // --- PANTRY CHIP FUNCTIONS ---
  const searchPantryFood = async (e) => {
    e.preventDefault();
    if (!pantrySearch) return;
    setIsSearchingPantry(true);
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${pantrySearch}&api_key=${API_KEY}&pageSize=5`);
      const data = await response.json();
      setPantrySearchResults(data.foods || []);
    } catch (error) {
      console.error(error);
    }
    setIsSearchingPantry(false);
  };

  const addPantryChip = async (food) => {
    try {
      const res = await axios.post("http://localhost:8080/api/pantry", {
        fdcId: food.fdcId,
        name: food.description.split(",")[0]
      }, { withCredentials: true });
      setPantryChips([...pantryChips, res.data]);
      setPantrySearchResults([]);
      setPantrySearch("");
    } catch (err) {
      console.error("Failed to save pantry item", err);
      alert("Please login first to save items to your pantry.");
    }
  };

  const removePantryChip = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/pantry/${id}`, { withCredentials: true });
      setPantryChips(pantryChips.filter(chip => chip.id !== id));
    } catch (err) {
      console.error("Failed to delete pantry item", err);
    }
  };

  // --- MANUAL FUNCTIONS ---
  const searchFood = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}&pageSize=5`);
      const data = await response.json();
      setResults(data.foods || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const addToPlan = (food) => {
    const newFood = {
      name: food.description,
      calories: Math.round(getNutrientValue(food.foodNutrients, 1008)),
      protein: Math.round(getNutrientValue(food.foodNutrients, 1003)),
      carbs: Math.round(getNutrientValue(food.foodNutrients, 1005)),
      fat: Math.round(getNutrientValue(food.foodNutrients, 1004))
    };
    setMealPlan([...mealPlan, newFood]);
  };

  const removeFromPlan = (index) => setMealPlan(mealPlan.filter((_, i) => i !== index));

  // --- SMART GENERATOR FUNCTIONS ---
  const generateSmartDiet = async () => {
    if (pantryChips.length === 0) return alert("Add at least one food to your pantry!");
    setIsGenerating(true);
    
    try {
      const fdcIds = pantryChips.map(c => c.fdcId).join(",");
      const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${fdcIds}&api_key=${API_KEY}`);
      const foodsData = await res.json();

      const formattedFoods = foodsData.map(food => ({
        id: food.fdcId,
        name: food.description.split(",")[0],
        protein: getNutrientValue(food.foodNutrients, 1003),
        calories: getNutrientValue(food.foodNutrients, 1008),
      }));

      const generateVariation = (modifier, portionSize) => {
        let currentProtein = 0;
        let currentCals = 0;
        let planMap = {};

        // Shuffle arrays based on modifier to create variety
        const highProtein = formattedFoods.filter(f => f.protein > 10).sort((a,b) => (b.protein * modifier) - (a.protein / modifier));
        const fillers = formattedFoods.filter(f => f.protein <= 10).sort((a,b) => (b.calories * modifier) - (a.calories / modifier));

        for (const food of highProtein) {
          while (currentProtein + (food.protein * (portionSize/100)) <= targetProtein && currentCals + (food.calories * (portionSize/100)) <= targetCalories) {
            if (!planMap[food.id]) planMap[food.id] = { name: food.name, amount: 0, protein: 0, calories: 0 };
            planMap[food.id].amount += portionSize;
            planMap[food.id].protein += (food.protein * (portionSize/100));
            planMap[food.id].calories += (food.calories * (portionSize/100));
            currentProtein += (food.protein * (portionSize/100));
            currentCals += (food.calories * (portionSize/100));
          }
        }

        for (const food of fillers) {
          while (currentCals + (food.calories * (portionSize/100)) <= targetCalories) {
            if (!planMap[food.id]) planMap[food.id] = { name: food.name, amount: 0, protein: 0, calories: 0 };
            planMap[food.id].amount += portionSize;
            planMap[food.id].protein += (food.protein * (portionSize/100));
            planMap[food.id].calories += (food.calories * (portionSize/100));
            currentCals += (food.calories * (portionSize/100));
            currentProtein += (food.protein * (portionSize/100));
          }
        }
        return { items: Object.values(planMap), totalProtein: Math.round(currentProtein), totalCals: Math.round(currentCals) };
      };

      setGeneratedPlans([
        { title: "High Protein Focus", ...generateVariation(1, 50) },
        { title: "Balanced Mix", ...generateVariation(0.5, 40) },
        { title: "Larger Portions", ...generateVariation(1.5, 100) }
      ]);

    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

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
              <p className="text-gray-600 dark:text-slate-400 mt-2">Build your daily nutrition plan.</p>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 text-neon-blue shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* TABS */}
          <div className="flex space-x-4 mb-8">
            <button 
              onClick={() => setActiveTab("smart")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === "smart" ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-400'}`}
            >
              Smart Diet Generator
            </button>
            <button 
              onClick={() => setActiveTab("manual")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === "manual" ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-400'}`}
            >
              Manual Logging
            </button>
          </div>

          {activeTab === "smart" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PANTRY ENGINE */}
              <div className="card h-fit border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-6">1. Your Pantry Inventory</h2>
                
                {/* Search & Add to Pantry */}
                <form onSubmit={searchPantryFood} className="flex gap-4 mb-4 relative z-20">
                  <input type="text" value={pantrySearch} onChange={(e) => setPantrySearch(e.target.value)} placeholder="Search USDA for food..." className="input-field flex-1" />
                  <button type="submit" className="btn-brand" disabled={isSearchingPantry}>{isSearchingPantry ? "..." : "Find"}</button>
                </form>

                {/* Dropdown Results */}
                {pantrySearchResults.length > 0 && (
                  <div className="bg-slate-800 border border-slate-700 rounded-xl mb-6 shadow-xl max-h-48 overflow-y-auto">
                    {pantrySearchResults.map((food, i) => (
                      <div key={i} className="p-3 hover:bg-slate-700 cursor-pointer flex justify-between items-center border-b border-slate-700/50" onClick={() => addPantryChip(food)}>
                        <span className="text-sm font-semibold text-white capitalize">{food.description.toLowerCase()}</span>
                        <span className="text-neon-blue text-lg font-bold">+</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pantry Chips */}
                <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 min-h-[100px]">
                  {pantryChips.length === 0 ? (
                     <p className="text-slate-500 text-sm italic m-auto">Search above to add items to your pantry.</p>
                  ) : (
                    pantryChips.map(chip => (
                      <div key={chip.id} className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
                        {chip.name}
                        <button onClick={() => removePantryChip(chip.id)} className="ml-2 text-red-400 hover:text-red-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <h2 className="text-xl font-bold text-white mb-6">2. Your Daily Goals</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="text-slate-400 text-sm font-bold mb-2 block">Target Calories</label>
                    <input type="number" value={targetCalories} onChange={(e) => setTargetCalories(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-neon-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm font-bold mb-2 block">Target Protein (g)</label>
                    <input type="number" value={targetProtein} onChange={(e) => setTargetProtein(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-neon-blue outline-none" />
                  </div>
                </div>

                <button onClick={generateSmartDiet} disabled={isGenerating} className="w-full bg-neon-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  {isGenerating ? "Calculating Variations..." : "Auto-Generate 3 Plans"}
                </button>
              </div>

              {/* GENERATED DIET PLANS */}
              <div className="h-fit">
                {generatedPlans.length > 0 ? (
                  <div className="space-y-6">
                    {generatedPlans.map((plan, idx) => (
                       <div key={idx} className="card border border-slate-700/50 shadow-xl relative overflow-hidden group hover:border-neon-blue transition-all">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple"></div>
                          <h3 className="text-xl font-black text-white mb-4 ml-4">{plan.title}</h3>
                          
                          <div className="flex gap-4 mb-6 ml-4">
                            <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Calories</p>
                              <p className="text-lg font-bold text-white">{plan.totalCals} <span className="text-xs text-slate-500">/{targetCalories}</span></p>
                            </div>
                            <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Protein</p>
                              <p className="text-lg font-bold text-white">{plan.totalProtein}g <span className="text-xs text-slate-500">/{targetProtein}g</span></p>
                            </div>
                          </div>

                          <div className="space-y-2 ml-4">
                            {plan.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-2 border-b border-slate-700/30 last:border-0">
                                <div>
                                  <p className="font-semibold text-slate-200 text-sm">{item.name}</p>
                                  <p className="text-[10px] text-slate-500">{Math.round(item.calories)} kcal | {Math.round(item.protein)}g pro</p>
                                </div>
                                <span className="text-neon-blue font-bold text-xs bg-neon-blue/10 px-2 py-1 rounded">
                                  {item.amount}g
                                </span>
                              </div>
                            ))}
                            {plan.items.length === 0 && <p className="text-xs text-red-400">Failed to build plan.</p>}
                          </div>
                       </div>
                    ))}
                  </div>
                ) : (
                  <div className="card border border-slate-700/50 h-full flex flex-col items-center justify-center text-slate-500 text-center p-12">
                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p>Build your pantry and click Generate<br/>to get 3 unique diet options.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "manual" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card h-fit border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Search Food Database</h2>
                <form onSubmit={searchFood} className="flex gap-4 mb-6">
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Banana" className="input-field flex-1" />
                  <button type="submit" className="btn-brand" disabled={loading}>{loading ? "..." : "Search"}</button>
                </form>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.map((food, index) => (
                    <div key={index} className="p-4 border border-slate-700/50 rounded-xl bg-slate-800/30 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-200 capitalize">{food.description.toLowerCase()}</h3>
                        <p className="text-xs text-neon-blue mt-1">{Math.round(getNutrientValue(food.foodNutrients, 1008))} kcal | {Math.round(getNutrientValue(food.foodNutrients, 1003))}g Protein</p>
                      </div>
                      <button onClick={() => addToPlan(food)} className="text-2xl text-slate-500 hover:text-neon-blue">+</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card flex flex-col border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-6">Your Manual Log</h2>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {mealPlan.map((food, index) => (
                    <div key={index} className="p-4 border border-slate-700/50 rounded-xl bg-slate-800/30 flex justify-between items-center group">
                      <div>
                        <h3 className="font-bold text-slate-200 capitalize">{food.name.toLowerCase()}</h3>
                        <p className="text-xs text-neon-blue mt-1">{food.calories} kcal</p>
                      </div>
                      <button onClick={() => removeFromPlan(index)} className="text-red-400 opacity-0 group-hover:opacity-100">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
