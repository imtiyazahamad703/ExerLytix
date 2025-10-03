import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword =()=>{
 
  const [email,setEmail]=useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid,setIsValid]=useState("");

  const validateEmail = (email) => {
    setIsValid(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setIsValid(true);
    } else {
      setEmailError(""); 
    }
  };


return(
<div className="flex h-screen w-full items-center justify-center mt-10">
  <div className="max-w-md rounded-3xl p-8 py-12 shadow-2xl shadow-gray-600">
    <div className="mb-8 w-full text-center">
      <h1 className="mb-1.5 text-center text-2xl font-bold">Forgot Password</h1>
      <p className="text-sm text-gray-500">Provide the email address associated with your account to recover your password</p>
    </div>
    <form className="space-y-5">
      <div>
        <label htmlFor="email" className="block">Email</label>
        <input type="email" value={email} name="email" id="email" className="w-full rounded-md border border-gray-500 p-2 transition-all focus:scale-102 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="xyz@gmail.com" 
          onChange={(event)=>{
            setEmail(event.target.value);
            validateEmail(event.target.value);
          }}
        />
        {isValid && <p className="text-red-500 text-sm">{emailError}</p>  }
      </div>
      <div>
        <Link to="/auth/change-password">   {/* Temporary :when click on Button then 1st Fetch from DB email then send to Change Password*/}
        <button type="submit" className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition-all duration-200 hover:bg-blue-800 active:scale-95 active:bg-blue-900">Reset Password</button>
        </Link>
     </div>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>
      </div>
      <div>
        <Link to="/auth/register">
        <button className="w-full rounded-lg bg-emerald-400 p-3 font-bold text-white transition-all duration-200 hover:bg-green-700 active:scale-95 active:bg-blue-900">Register</button>
        </Link>
      </div>
      
      <div>
        <Link to="/auth/login">
        <button className="w-full rounded-lg bg-cyan-500 p-3 font-bold text-white transition-all duration-200 hover:bg-cyan-600 active:scale-95 active:bg-blue-900">Login</button>
        </Link>
      </div>
    </form>
  </div>
</div>
);
}
export default ForgotPassword;
