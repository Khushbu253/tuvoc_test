import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<string>("");
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    if (!username ) {
      setError("Username  are required.");
      return;
    }
    if ( !password) {
      setError("password are required.");
      return;
    }
    
    try {
      const response = await axios.post<{ token: string }>(
        "https://fakestoreapi.com/auth/login", 
        { username: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("user",JSON.parse(response.config.data).username)
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials, please try again.");
    }
  };
  const handlechangeUsername = (e) =>{
    setUsername(e.target.value)
    setError("")
  } 
  const handlechangePassword = (e) =>{
  setPassword(e.target.value)
    setError("")
  } 

  const handleToggle = () => {
    if (passwordType==='password'){
       setShowPassword(true);
       setPasswordType('text')
    } else {
       setShowPassword(false)
       setPasswordType('password')
    }
 }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full flex items-center justify-start bg-gradient-to-b from-[#2563EB] to-[#1E40AF] text-white p-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">ShopStyle</h2>
          <h1 className="text-5xl font-bold mt-4">Welcome Back</h1>
          <p className="text-1xl mt-4">Your journey continues here</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left ">Log in</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">Enter your credentials to access your account</p>
          
          <label className="block mb-2 text-gray-700">Username</label>
          <input 
            type="text" 
            placeholder="Enter your username" 
            className="w-full p-3 border rounded-lg mb-4" 
            value={username} 
            onChange={ handlechangeUsername }
          />
          {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
          
          {/* Password Input */}
          <label className="block mb-2 text-gray-700">Password</label>
          <div className="relative">
            <input 
              type={passwordType}
              placeholder="Enter your password" 
              className="w-full p-3 border rounded-lg" 
              value={password} 
              onChange={ handlechangePassword }
            />
         <span className="absolute right-3 top-3 cursor-pointer" onClick={handleToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
         
          </div>
          {error && <p className="text-red-500 text-start mb-4 mt-4">{error}</p>}
          
          {/* Remember me & Forgot password */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-3">
            <label className="flex items-center text-gray-600 mb-3 md:mb-0">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-600 font-medium">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button 
            className="w-full mt-6 py-3 bg-gradient-to-b from-[#2563EB] to-[#1E40AF] hover:bg-blue-700 text-white font-semibold rounded-lg" 
            onClick={handleLogin}
          >
            Log in
          </button>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          
          {/* Social Buttons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="p-3 border rounded-lg flex items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-6 h-6" />
            </button>
            <button className="p-3 border rounded-lg flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-6 h-6" />
            </button>
            <button className="p-3 border rounded-lg flex items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-6 h-6" />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;