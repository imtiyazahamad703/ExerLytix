import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/banners/banner1.png";

const Login = () => {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[remember,setRemember]=useState(false);
  const navigate = useNavigate(); // ✅ Navigation hook
  const [errorMessage, setErrorMessage] = useState("");// to show login error



  const [isValid,setIsValid]=useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
  



  const handleLogin= async (e)=>{
    e.preventDefault();
    const loginData={email,password}
    try {
    const response = await axiosInstance.post("/login", loginData);
    console.log(response.data);

    if (response.data.success) {
      // Login successful
      setErrorMessage("");           // Clear any previous errors
      navigate("/dashboard");        // Redirect to dashboard
    } else {
      // Login failed (wrong email or password)
      setErrorMessage(response.data.message);
      setTimeout(() => setErrorMessage(""), 2000);

    }
  } catch (error) {
    console.error("Login error:", error);
      setErrorMessage("wrong email or password");
      setTimeout(() => setErrorMessage(""), 2000);

  }
};

  return (
    <>
      <div className="flex min-h-screen bg-blue-200">
        
        <div className="w-full bg-gray-200 md:w-1/2 lg:w-3/5 flex justify-center items-center">
          <img src={loginImg} alt="Fitness"
            className="w-[95%] mt-20 h-[87%] object-cover rounded-3xl"/> 
        </div>

       
        <div className="md:w-1/2 sm:w-full lg:w-2/5 flex justify-center items-center mt-[5%] ">
          <div className="w-full bg-white m-3 sm:mx-10 flex flex-col rounded-xl  p-4 shadow-2xl shadow-gray-600">
            <h1 className="my-6 text-3xl font-black text-blue-800 text-center">Login Here</h1>
            {errorMessage && (
  <p className="text-red-600 text-center font-semibold mb-4">{errorMessage}</p>
)}
            <form onSubmit={handleLogin}>
              <div className="">
                <label htmlFor="email" className="block text-left text-gray-700">Email</label>
                <input type="text" id="email" name="email" value={email} className="w-full p-2 border mt-1 border-gray-300 rounded-md transition-all shadow-sm focus:scale-101 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                 onChange={(event)=>{
                          setEmail(event.target.value);
                          validateEmail(event.target.value); }
                        }
                 />
                  {isValid && <p className="text-red-500 text-sm">{emailError}</p>  }
                
                
              </div>
              <div className="mt-6">
                <label htmlFor="password" className="block text-left text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={password} className="w-full p-2 border my-1 border-gray-300 rounded-md transition-all shadow-sm focus:ring-2 focus:scale-101 focus:ring-indigo-500 focus:outline-none" 
                onChange={(event)=>{
                  setPassword(event.target.value);
                  validatePassword(event.target.value);
                 }}
                />
                {isValid && <p className="text-red-500 text-sm">{passwordError}</p>  }

              </div>
              <div className="flex justify-between mt-5 mb-3">
                <label htmlFor="checkBox" className="text-gray-700">
                  <input type="checkbox" id="checkBox" name="checkBox" value={remember} className="text-left border text-3xl h-3 w-3 accent-indigo-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none mr-1" 
                  onChange={(e)=>setRemember(e.target.value)}
                  />
                  Remember
                </label>
                <Link to="/auth/forgot-password" className="hover:underline hover:text-indigo-800 text-indigo-700 transition duration-300">Forgot Password?</Link>
              </div>

              <div>
                
                <button type="submit" className="w-full my-7 border hover:bg-indigo-800 hover:inset-shadow-2xs transition duration-400 border-gray-300 p-2 rounded-lg bg-indigo-500 font-black text-white active:scale-95 active:bg-blue-900">Login</button> 
              </div>

      <div class=" text-center">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
              </div>

              <div class="relative flex justify-center">
                <span class="bg-white px-2 text-gray-500">Or</span>
              </div>
        </div>
      </div>
      <div>
                <Link to="/auth/register">
                <button type="submit" className="w-full my-7 border hover:bg-indigo-800 hover:inset-shadow-2xs transition duration-400 border-gray-300 p-2 rounded-lg bg-green-400 font-black text-white active:scale-95 active:bg-blue-900">Register</button> 
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
