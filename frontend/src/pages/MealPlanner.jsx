import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import AsyncSelect from "react-select/async";

const DEFAULT_OPTIONS = [
  { value: 171077, label: "chicken breast" },
  { value: 171287, label: "eggs" },
  { value: 169756, label: "white rice" },
  { value: 173904, label: "oats" },
  { value: 172420, label: "lentils" },
  { value: 170877, label: "broccoli" },
  { value: 173434, label: "peanut butter" },
  { value: 172772, label: "almonds" },
  { value: 171616, label: "whole milk" }
];

const MealPlanner = () => {
  const { profile } = useAuth();
  const userId = profile?.userId;

  const [activeTab, setActiveTab] = useState("smart");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // === MANUAL PLANNER STATES ===
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  // === SMART PLANNER STATES ===
  const [pantryChips, setPantryChips] = useState([]); 
  const [targetCalories, setTargetCalories] = useState(2000);
  const [targetProtein, setTargetProtein] = useState(150);
  const [generatedPlans, setGeneratedPlans] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]); 
  const [isGenerating, setIsGenerating] = useState(false);

  const API_KEY = "DEMO_KEY"; 

  const getNutrientValue = (nutrients, nutrientId) => {
    const nutrient = nutrients?.find(n => n.nutrientId === nutrientId || n.nutrientNumber === nutrientId.toString() || (n.nutrient && n.nutrient.id === nutrientId));
    return nutrient ? (nutrient.value || nutrient.amount || 0) : 0;
  };

  // --- INIT PANTRY & SAVED PLANS ---
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const [pantryRes, savedPlansRes] = await Promise.all([
          axiosInstance.get(`/pantry/${userId}`),
          axiosInstance.get(`/saved-plans/${userId}`)
        ]);
        setPantryChips(pantryRes.data);
        setSavedPlans(savedPlansRes.data.map(p => ({
          ...p,
          items: JSON.parse(p.itemsJson)
        })));
      } catch (err) {
        console.error("Failed to load data from DB", err);
      }
    };
    fetchData();
  }, [userId]);

  // --- PANTRY CHIP FUNCTIONS ---
  const loadPantryOptions = async (inputValue) => {
    if (!inputValue) return DEFAULT_OPTIONS;
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${inputValue}&api_key=${API_KEY}&pageSize=10`);
      const data = await response.json();
      return (data.foods || []).map(food => ({
        value: food.fdcId,
        label: food.description.split(",")[0].toLowerCase()
      }));
    } catch (error) {
      return [];
    }
  };

  const handlePantrySelect = async (selectedOption) => {
    if (!selectedOption || !userId) return;
    if (pantryChips.some(chip => chip.fdcId === selectedOption.value)) return;

    try {
      const res = await axiosInstance.post(`/pantry/${userId}`, {
        fdcId: selectedOption.value,
        name: selectedOption.label
      });
      setPantryChips([...pantryChips, res.data]);
    } catch (err) {}
  };

  const removePantryChip = async (id) => {
    if (!userId) return;
    try {
      await axiosInstance.delete(`/pantry/${userId}/${id}`);
      setPantryChips(pantryChips.filter(chip => chip.id !== id));
    } catch (err) {}
  };

  // --- MANUAL LOGGER (DEBOUNCED SEARCH) ---
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}&pageSize=5`);
        const data = await response.json();
        setResults(data.foods || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }, 500); // Debounce delay
    
    return () => clearTimeout(timeoutId);
  }, [query]);

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

  const totalManualCalories = mealPlan.reduce((acc, curr) => acc + curr.calories, 0);
  const totalManualProtein = mealPlan.reduce((acc, curr) => acc + curr.protein, 0);
  const totalManualCarbs = mealPlan.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalManualFat = mealPlan.reduce((acc, curr) => acc + curr.fat, 0);

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
        { id: Date.now() + 1, title: "High Protein Focus", ...generateVariation(1, 50) },
        { id: Date.now() + 2, title: "Balanced Mix", ...generateVariation(0.5, 40) },
        { id: Date.now() + 3, title: "Larger Portions", ...generateVariation(1.5, 100) }
      ]);
    } catch (err) {}
    setIsGenerating(false);
  };

  const removeGeneratedPlan = (planId) => {
    setGeneratedPlans(generatedPlans.filter(plan => plan.id !== planId));
  };

  const permanentlySavePlan = async (plan) => {
    if (!userId) return;
    try {
      const res = await axiosInstance.post(`/saved-plans/${userId}`, {
        title: plan.title,
        totalCalories: plan.totalCals,
        totalProtein: plan.totalProtein,
        itemsJson: JSON.stringify(plan.items)
      });
      setSavedPlans([{ ...res.data, items: JSON.parse(res.data.itemsJson) }, ...savedPlans]);
      removeGeneratedPlan(plan.id); // Remove from generated list once saved
    } catch (err) {
      console.error(err);
    }
  };

  const removeSavedPlan = async (planId) => {
    if (!userId) return;
    try {
      await axiosInstance.delete(`/saved-plans/${userId}/${planId}`);
      setSavedPlans(savedPlans.filter(p => p.id !== planId));
    } catch (err) {}
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-200">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wide transition-colors">
                AI <span className="brand-text">Meal Planner</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Build your daily nutrition plan.</p>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-neon-blue shadow-sm"
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
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === "smart" ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`}
            >
              Smart Diet Generator
            </button>
            <button 
              onClick={() => setActiveTab("manual")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === "manual" ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`}
            >
              Manual Logging
            </button>
          </div>

          {activeTab === "smart" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PANTRY ENGINE */}
              <div className="card bg-white dark:bg-slate-800 h-fit border border-slate-200 dark:border-slate-700/50">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">1. Your Pantry Inventory</h2>
                
                <div className="mb-6 relative z-30">
                  <AsyncSelect 
                    cacheOptions 
                    defaultOptions={DEFAULT_OPTIONS}
                    loadOptions={loadPantryOptions}
                    onChange={handlePantrySelect}
                    value={null}
                    placeholder="Search USDA or select defaults..."
                    className="text-slate-900 dark:text-white"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: 'transparent',
                        borderColor: '#3b82f6',
                        color: 'inherit',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: '#1e293b',
                        color: 'white'
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#334155' : '#1e293b',
                        color: 'white',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      })
                    }}
                  />
                </div>

                {/* Pantry Chips */}
                <div className="flex flex-wrap gap-3 mb-8 bg-slate-100 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700/30 min-h-[100px] items-start">
                  {pantryChips.length === 0 ? (
                     <p className="text-slate-500 text-sm italic m-auto">Search above to add items to your pantry.</p>
                  ) : (
                    pantryChips.map(chip => (
                      <div key={chip.id} className="relative inline-block mt-2 mr-2">
                        <div className="bg-slate-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md border border-slate-600/50">
                          {chip.name}
                        </div>
                        <button 
                          onClick={() => removePantryChip(chip.id)} 
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-lg border-2 border-slate-100 dark:border-slate-900 transition-all z-10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">2. Your Daily Goals</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 text-sm font-bold mb-2 block">Target Calories</label>
                    <input type="number" value={targetCalories} onChange={(e) => setTargetCalories(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:border-neon-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 text-sm font-bold mb-2 block">Target Protein (g)</label>
                    <input type="number" value={targetProtein} onChange={(e) => setTargetProtein(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:border-neon-blue outline-none" />
                  </div>
                </div>

                <button onClick={generateSmartDiet} disabled={isGenerating} className="w-full bg-neon-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  {isGenerating ? "Calculating Variations..." : "Auto-Generate 3 Plans"}
                </button>
              </div>

              {/* GENERATED & SAVED DIET PLANS */}
              <div className="h-fit space-y-6">
                
                {/* SAVED PLANS SECTION */}
                {savedPlans.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">✓</span>
                      Your Saved DB Plans
                    </h2>
                    <div className="space-y-4">
                      {savedPlans.map(plan => (
                        <div key={plan.id} className="card bg-white dark:bg-slate-800 border border-green-500/50 shadow-lg relative group">
                          <button onClick={() => removeSavedPlan(plan.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                          </button>
                          <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">{plan.title}</h3>
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">{plan.totalCalories} kcal | {plan.totalProtein}g protein</p>
                          <div className="space-y-2">
                            {plan.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-700 pb-1">
                                <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">{item.amount}g</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FRESH GENERATED PLANS */}
                {generatedPlans.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Unsaved Generated Plans</h2>
                    <div className="space-y-6">
                      {generatedPlans.map((plan) => (
                         <div key={plan.id} className="card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-xl relative overflow-hidden group hover:border-neon-blue transition-all">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple"></div>
                            
                            <button onClick={() => removeGeneratedPlan(plan.id)} className="absolute top-3 right-3 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full z-10">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>

                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 ml-4">{plan.title}</h3>
                            
                            <div className="flex gap-4 mb-6 ml-4">
                              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase">Calories</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{plan.totalCals} <span className="text-xs text-slate-400">/{targetCalories}</span></p>
                              </div>
                              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase">Protein</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{plan.totalProtein}g <span className="text-xs text-slate-400">/{targetProtein}g</span></p>
                              </div>
                            </div>

                            <div className="space-y-2 ml-4 mb-4">
                              {plan.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-2 border-b border-slate-100 dark:border-slate-700/30 last:border-0">
                                  <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.name}</p>
                                    <p className="text-[10px] text-slate-500">{Math.round(item.calories)} kcal | {Math.round(item.protein)}g pro</p>
                                  </div>
                                  <span className="text-neon-blue font-bold text-xs bg-blue-50 dark:bg-neon-blue/10 px-2 py-1 rounded">
                                    {item.amount}g
                                  </span>
                                </div>
                              ))}
                            </div>

                            <button onClick={() => permanentlySavePlan(plan)} className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold transition-colors">
                              💾 Save to Database
                            </button>
                         </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {generatedPlans.length === 0 && savedPlans.length === 0 && (
                   <div className="card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 h-full flex flex-col items-center justify-center text-slate-400 text-center p-12">
                     <p>Build your pantry and click Generate<br/>to get diet options.</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "manual" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card bg-white dark:bg-slate-800 h-fit border border-slate-200 dark:border-slate-700/50 relative">
                
                {/* Advanced Macro Tracker Banner */}
                <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-4 rounded-xl shadow-lg mb-8 text-white flex justify-between items-center">
                   <div>
                     <h3 className="font-black text-lg">Total Daily Intake</h3>
                     <p className="text-sm opacity-90">Your live manual log aggregated</p>
                   </div>
                   <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-[10px] font-bold uppercase opacity-80">Calories</p>
                        <p className="font-black text-xl">{totalManualCalories}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase opacity-80">Protein</p>
                        <p className="font-black text-xl">{totalManualProtein}g</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase opacity-80">Carbs</p>
                        <p className="font-black text-xl">{totalManualCarbs}g</p>
                      </div>
                   </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Search Food Database</h2>
                <div className="flex gap-4 mb-6 relative">
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Banana (type to search...)" className="input-field flex-1 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700" />
                  {loading && <span className="absolute right-4 top-3 text-neon-blue font-bold">...</span>}
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.length === 0 && !loading && query.length >= 3 && <p className="text-slate-500">No results found.</p>}
                  {results.map((food, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-200 capitalize">{food.description.toLowerCase()}</h3>
                        <p className="text-xs text-neon-blue mt-1">{Math.round(getNutrientValue(food.foodNutrients, 1008))} kcal | {Math.round(getNutrientValue(food.foodNutrients, 1003))}g Protein</p>
                      </div>
                      <button onClick={() => addToPlan(food)} className="text-2xl text-slate-400 hover:text-neon-blue">+</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-white dark:bg-slate-800 flex flex-col border border-slate-200 dark:border-slate-700/50">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Manual Log</h2>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {mealPlan.map((food, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center group">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-200 capitalize">{food.name.toLowerCase()}</h3>
                        <p className="text-xs text-neon-blue mt-1">{food.calories} kcal | {food.protein}g prot | {food.carbs}g carbs</p>
                      </div>
                      <button onClick={() => removeFromPlan(index)} className="text-red-500 opacity-0 group-hover:opacity-100 font-bold text-sm">Remove</button>
                    </div>
                  ))}
                  {mealPlan.length === 0 && <p className="text-slate-500 text-center py-10">Add foods from the left to build your log.</p>}
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
