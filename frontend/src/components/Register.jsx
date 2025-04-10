import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/member/save', data);
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Register</h2>
        
        <input 
          {...register("name")} 
          type="text" 
          placeholder="Full Name" 
          className="p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input 
          {...register("email")} 
          type="email" 
          placeholder="Email" 
          className="p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          {...register("password")} 
          type="password" 
          placeholder="Password" 
          className="p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button type="submit" className="bg-green-600 hover:bg-green-500 text-white p-3 rounded font-bold mt-2 transition-colors">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
