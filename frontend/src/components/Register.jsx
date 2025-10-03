import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const [isValid,setIsValid]=useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");



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

  const validatePassword = (password) => {
    setIsValid(false);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8");
      setIsValid(true);
    } else {
      setPasswordError(""); 
    }
  };


  const validateConfirmPassword = (confirmPassword) => {
    setIsValid(false);
    if (confirmPassword !== password) {

      setConfirmPasswordError("Passwords do not match");
      setIsValid(true);
    } else {
      setConfirmPasswordError(""); 
    }
  };

  const  handleRegistration=async (event)=>{
    event.preventDefault();
    const RegisterData={name,email,password};
    try{
      const response=await axiosInstance.post("/register",RegisterData)
      console.log(response.data);
    }
    catch(error){
      console.error(response.error);
    }
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center mt-10">
        <div className="flex h-full rounded-2xl rounded-l-4xl bg-white  sm:h-[90%] sm:w-[70%] md:h-[80%] shadow-2xl shadow-gray-600 ">
          {/* Left Side - Welcome Card */}
          <div className="flex h-full w-1/2 flex-col items-center justify-center rounded-l-4xl bg-gradient-to-r from-blue-950 via-gray-800 to-black ">
            <div className="m-4 space-y-5">
              <span className="block text-center text-4xl font-black text-white">Logo</span>
              <h1 className="text-center font-sans text-3xl font-black text-white">"Welcome to ExerLytix!</h1>
              <p className="text-center text-xl text-white">Your fitness journey starts here! With AI-powered insights and personalized plans, we help you train smarter, stay motivated, and achieve your goals faster.</p>

              <h3 className="text-center text-xl font-bold text-white">Sign up now and take the first step towards a healthier you!"</h3>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex w-1/2 flex-col items-center justify-center p-8 ">
            <div className="w-[80%] max-w-md ">
              <h1 className="m-4 text-center text-2xl font-black">Register Here</h1>
              <form className="space-y-4" onSubmit={handleRegistration}>
                <div>
                  <label htmlFor="name" className="block text-gray-500">Name</label>
                  <input type="text" value={name} id="name" name="name" className="w-full rounded-lg border p-2 shadow-sm transition-all  focus:ring-2 focus:scale-101 focus:ring-blue-500 focus:outline-none" placeholder="Enter your name"
                        onChange={(event)=>setName(event.target.value)}
                  />
                  
                  <label className="text-gray-500 text-sm"></label>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-500">Email</label>
                  <input type="email" value={email} id="emai" name="email" className="w-full rounded-lg border p-2 shadow-sm focus:ring-2 focus:scale-101 focus:ring-blue-500 focus:outline-none" placeholder="example@gmail.com" 
                         onChange={(event)=>{
                          setEmail(event.target.value);
                          validateEmail(event.target.value); }
                        }
                  />
                  {isValid && <p className="text-red-500 text-sm">{emailError}</p>  }
                  <label className="text-gray-500 text-sm"></label>
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-500">Password</label>
                  <input type="password" value={password} id="password" name="password" className="w-full rounded-lg border p-2 shadow-sm focus:ring-2 focus:scale-101 focus:ring-blue-500 focus:outline-none" placeholder="Example@#123" 
                         onChange={(event)=>{
                          setPassword(event.target.value);
                          validatePassword(event.target.value);
                         }}
                  />
                  {isValid && <p className="text-red-500 text-sm">{passwordError}</p>  }
                  <label className="text-gray-500 text-sm"></label>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-500">Confirm Password</label>
                  <input type="password" value={confirmPassword} id="confirmPassword" name="confirmPassword" className="w-full rounded-lg border p-2 shadow-sm focus:ring-2 focus:scale-101 focus:ring-blue-500 focus:outline-none" placeholder="re-enter password" 
                        onChange={(event)=>{
                          setConfirmPassword(event.target.value);
                          validateConfirmPassword(event.target.value); }
                        }
                  />
                  {isValid && <p className="text-red-500 text-sm">{confirmPasswordError}</p>  }
                  <label className="text-gray-500 text-sm">password doesn't match</label>
                </div>
                <div>
                  <button type="submit" className="w-full rounded-lg bg-blue-600 p-2 font-bold text-white shadow-md transition duration-300 hover:bg-blue-800 active:scale-95 active:bg-blue-900" >Register</button>
                </div>
                <div>
                  <label className="text-gray-600 font-light">Do you already have account? <Link to="/auth/login" className="pl-1 font-medium text-blue-900 transition duration-400 hover:underline active:scale-95 active:bg-blue-900">Login</Link></label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
