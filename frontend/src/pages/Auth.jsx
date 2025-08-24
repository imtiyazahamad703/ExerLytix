import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import ChangePassword from "../components/ChangePassword";
import Dashboard from "./Dashboard";

const Auth = () => {
  return (
    <Routes>
      {/* Redirect `/auth/` to `/auth/login` */}
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
};

export default Auth;
