"use client";

import { useState } from "react";
import { loginUser } from "@/app/lib/apis/server";

export default function LoginForm({title}) {
  const [email, setEmail] = useState("nandana@gmail.com");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    
    // if((!email) && (!password)){
    //   setEmailError("Email is required!");
    //   setPasswordError("Password is required!");
    //   return false;
    // } else {
    //   setEmailError("");
    //   setPasswordError("");
    // }

    if(!email){
      setEmailError("Email is required!");
      return false;
    } else {
      setEmailError("");
    }

    if(!password){
      setPasswordError("Password is required!");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validateForm();//Check validation

      if(isValid){
        
        const login = await loginUser({ email: email, password: password });
        console.log("LOGIN RESPONSE", login);
      }        
    }

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* title */}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            {title}
          </h3>
          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 border-gray-300 rounded-lg text-gray-900 focus:ring-1 ring-offset-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="yourname@email.com"
            />
            {emailError && (<div className="text-red-600 text-xs mt-1 ml-1">{emailError}</div>)}
          </div>
          
          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 border-gray-300 rounded-lg text-gray-900 focus:ring-1 ring-offset-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="*********"
            />
            {passwordError && (<div className="text-red-600 text-xs mt-1 ml-1">{passwordError}</div>)}
          </div>
          
          {/* remember me */}
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="remember"
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 block mb-2"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="/forget-password"
              className="text-sm text-blue-700 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>
          {/* submit button */}
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign in
            </button>
          </div>
          <div className="text-sm text-gray-500 font-medium flex justify-center space-x-1">
            <span>Not registered?</span>
            <a
              href="/register"
              className="text-sm text-blue-700 hover:underline"
            >
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
