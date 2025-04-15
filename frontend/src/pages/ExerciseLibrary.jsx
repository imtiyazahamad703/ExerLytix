import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const WGER_CATEGORIES = [
  { id: 10, name: "Abs" },
  { id: 8, name: "Arms" },
  { id: 12, name: "Back" },
  { id: 14, name: "Calves" },
  { id: 15, name: "Cardio" },
  { id: 11, name: "Chest" },
  { id: 9, name: "Legs" },
  { id: 13, name: "Shoulders" }
];

// Module-level cache to prevent re-fetching on tab switch
const exerciseCache = {};

const ExerciseImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Skeleton Loader shown while downloading */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-700/50 animate-pulse rounded-md flex items-center justify-center">
           <svg className="w-8 h-8 text-slate-500 animate-spin" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`max-h-full max-w-full object-contain rounded-md transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
};

const ExerciseLibrary = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState("8"); // Default to Arms
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExercises = async (categoryId) => {
    if (exerciseCache[categoryId]) {
      setExercises(exerciseCache[categoryId]);
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      // Fetch more items since we will filter many out
      const response = await fetch(`https://wger.de/api/v2/exerciseinfo/?language=2&category=${categoryId}&limit=100`, {
        headers: { 'Authorization': `Token ee8d34ebfc80c9ef65b6d40672724e68c9e3197e` }
      });
      if (!response.ok) throw new Error("Failed to fetch exercises");
      const data = await response.json();
      
      // Filter out exercises that do not have an actual image
      const exercisesWithImages = data.results.filter(ex => ex.images && ex.images.length > 0);

      const parsedExercises = exercisesWithImages.map(ex => {
        let name = ex.name || "Unknown";
        let description = ex.description || "No description provided.";
        
        // Language 2 is English in wger
        const engTranslation = ex.translations ? ex.translations.find(t => t.language === 2) : null;
        
        if (engTranslation && engTranslation.name) {
          name = engTranslation.name;
          description = engTranslation.description || description;
        } else if (!ex.name && ex.translations && ex.translations.length > 0) {
          // Fallback if no English translation and no base name
          name = ex.translations[0].name || name;
          description = ex.translations[0].description || description;
        }
        
        const imageUrl = ex.images[0].image;

        return {
          id: ex.id,
          name: name,
          description: description,
          equipment: ex.equipment ? ex.equipment.map(e => e.name).join(", ") : "None",
          image: imageUrl
        };
      });

      exerciseCache[categoryId] = parsedExercises;
      setExercises(parsedExercises);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises(category);
  }, [category]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full relative z-10">
          
          <div className="mb-8 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wide flex items-center">
                <svg className="w-8 h-8 text-neon-blue mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Exercise <span className="gradient-text">Library</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Explore exercises with full visual guides (Powered by wger).</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors cursor-pointer"
                >
                  <optgroup label="Body Regions">
                    {WGER_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Mobile Sidebar Toggle */}
              <button 
                className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-neon-blue shadow-sm"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-10 w-10 text-neon-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exercises.map((ex) => (
                <div key={ex.id} className="bg-white dark:glass-card flex flex-col border border-slate-200 dark:border-slate-700/50 hover:border-neon-blue dark:hover:border-neon-purple transition-all duration-300 rounded-xl overflow-hidden shadow-lg">
                  
                  {/* Image Display */}
                  <div className="h-64 bg-slate-50 dark:bg-white flex items-center justify-center p-2 border-b border-slate-200 dark:border-slate-700/50 rounded-t-xl">
                    {ex.image ? (
                      <ExerciseImage src={ex.image} alt={ex.name} />
                    ) : (
                      <div className="text-slate-500 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">No Image Available</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight capitalize">{ex.name}</h3>
                    </div>
                    
                    <div className="flex gap-2 mb-6 flex-wrap">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700">
                        Equip: {ex.equipment || 'Bodyweight'}
                      </span>
                    </div>
                    
                    <div className="flex-1 mt-auto">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-2">Instructions:</p>
                      <div 
                        className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-6 hover:line-clamp-none transition-all duration-300 prose prose-slate dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: ex.description }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {exercises.length === 0 && !loading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-400 text-lg">No exercises found for this category.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
