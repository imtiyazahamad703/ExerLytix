import React from "react";
import Navbar from "./components/Navbar";  // Adjust path if needed
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
