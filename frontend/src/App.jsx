import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Nutrition from "./pages/Nutrition";
import Contact from "./pages/Contact";
import MealPlanner from "./pages/MealPlanner";
import BmiCalculator from "./pages/BmiCalculator";
import Workouts from "./pages/Workouts";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { profile } = useAuth();
  if (!profile?.userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Redirect to Dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { profile } = useAuth();
  if (profile?.userId) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
const Layout = () => {
  const location = useLocation();
  
  // These routes won't show the Footer
  const hideFooterRoutes = ["/dashboard", "/workouts", "/meal-planner", "/bmi", "/login", "/register"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  // These routes won't show the Navbar
  const hideNavbarRoutes = ["/dashboard", "/workouts", "/meal-planner", "/bmi"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-300 flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes - Redirect to Dashboard if logged in */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
          
          {/* Public Routes (Always accessible) */}
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Routes - Redirect to Login if not logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
          <Route path="/meal-planner" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
          <Route path="/bmi" element={<ProtectedRoute><BmiCalculator /></ProtectedRoute>} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
