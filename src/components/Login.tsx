"use client"

import React, { useState } from "react";

// --- Inline SVG Icons ---

// Google Icon SVG (Standard G logo)
const GoogleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
    className="w-6 h-6 mr-3"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.343c-1.812,4.721-6.494,8.232-11.343,8.232c-6.621,0-12-5.379-12-12s5.379-12,12-12c3.059,0,5.842,1.159,7.963,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.941,12,24,12c3.059,0,5.842,1.159,7.963,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.665,8.309,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.954-1.82,13.385-4.823l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.284-7.946l-6.522,5.025C9.501,38.563,16.223,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.343c-0.875,2.705-2.585,5.188-4.887,6.884l-5.657-5.657c-1.07-0.929-1.884-2.027-2.433-3.23l-0.003-0.013l-0.003-0.013l-0.002-0.009l-0.002-0.008l-0.001-0.003L14.655,31.81l-6.522,5.025C9.501,38.563,16.223,44,24,44c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

// Checkmark Icon for Success State
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.323 4.128-1.681-1.68a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.144-.094l4.25-5.378z"
      clipRule="evenodd"
    />
  </svg>
);

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulates the OAuth process
  const handleGoogleLogin = () => {
    if (isLoggedIn) return; // Prevent double click

    setIsLoggingIn(true);

    // Simulate API call delay for 2 seconds
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const getButtonText = () => {
    if (isLoggingIn) return "Authenticating...";
    if (isLoggedIn) return "Logged In Successfully";
    return "Sign in with Google";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold font-playfair text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Securely access your account using your Google identity.
          </p>
        </div>

        {/* --- Google Login Button --- */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn || isLoggedIn}
          className={`
            w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-md font-semibold text-gray-700 
            transition-all duration-300
            ${isLoggingIn ? "bg-gray-100 cursor-wait" : "hover:bg-gray-50"}
            ${isLoggedIn ? "bg-green-100 border-green-500 text-green-700" : ""}
            disabled:opacity-80
          `}
        >
          {isLoggedIn ? (
            <CheckCircleIcon className="w-6 h-6 mr-3 text-green-600" />
          ) : (
            <GoogleIcon />
          )}
          {getButtonText()}
        </button>

        {/* --- Simple Footer/Branding --- */}
        <div className="text-center text-xs text-gray-400 pt-4 border-t">
          <p>E-commerce by NordicNest Home</p>
          <p className="mt-1">
            By continuing, you agree to the Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
