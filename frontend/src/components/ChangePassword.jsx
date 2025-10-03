import { useState } from "react";
import { Link } from "react-router-dom";

const ChangePassword=()=>{

    const [newPassword,setNewPassword]=useState("");
    const [confirmNewPassword,setConfirmNewPassword]=useState("");

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isValid,setIsValid]=useState(false);

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

    return(
<div className="flex h-screen w-full items-center justify-center mt-10">
  <div className="max-w-md rounded-3xl p-8 py-12 shadow-2xl shadow-gray-600">
    <div className="mb-8 w-full text-center">
      <h1 className="mb-1.5 text-center text-2xl font-bold">Change Password</h1>
      <p className="text-sm text-gray-500">Provide your new password to update your account security</p>
    </div>
    <form className="space-y-5">
      
      <div>
        <label htmlFor="newPassword" className="block">New Password</label>
        <input type="password" value={newPassword} name="newPassword" id="newPassword" className="w-full rounded-md border border-gray-500 p-2 transition-all focus:scale-102 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter new password" 
              onChange={(event)=>{
                setNewPassword(event.target.value);
                validatePassword(event.target.value);}
              }
        />
        {isValid && <p className="text-red-500 text-sm">{passwordError}</p>  }
      </div>
     
      <div>
        <label htmlFor="confirmNewPassword" className="block">Confirm New Password</label>
        <input type="password" value={confirmNewPassword} name="confirmNewPassword" id="confirmNewPassword" className="w-full rounded-md border border-gray-500 p-2 transition-all focus:scale-102 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Re-enter new password" 
               onChange={(event)=>{
                setConfirmNewPassword(event.target.value);
                validateConfirmPassword(event.target.value);
               }}
        />
        {isValid && <p className="text-red-500 text-sm">{confirmPasswordError}</p>  }
      </div>
     
      <div>
        <button type="submit" className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition-all duration-200 hover:bg-blue-800 active:scale-95 active:bg-blue-900">Submit</button>
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
     
    </form>
  </div>
</div>
    );
}
export default ChangePassword;