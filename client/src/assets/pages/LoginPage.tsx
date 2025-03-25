import React, { useState } from "react";
import { Car, Eye, EyeOff, ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { ErrorsLogin, FormDataLogin } from "../types/types-login";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, logout } = useUser();

  // Form state
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: ""
  });
  
  // UI state
  const [errors, setErrors] = useState<ErrorsLogin>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof ErrorsLogin]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name as keyof ErrorsLogin];
        return newErrors;
      });
    }
  };
  
  // Form validation
  const validate = (): boolean => {
    const newErrors: ErrorsLogin = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset any previous auth errors
    setErrors({});
    
    // Validate form
    if (!validate()) {
      return;
    }
    
    // Start loading state
    setIsLoading(true);

    try {
      // Actual API call
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // credentials: 'include', // Important for cookie-based auth
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Use context login method
        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          lastLogin: new Date().toISOString()
        });

        // Store auth token securely
        localStorage.setItem('authToken', data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Handle login errors
        setErrors({ 
          auth: data.message || "Login failed. Please check your credentials."
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ 
        auth: "Network error. Please try again later." 
      });
    } finally {
      // Always stop loading
      setIsLoading(false);
    }
  };
  
  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // If user is already logged in
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CarShare</span>
            </div>
            <button 
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome Back, {user.name}!
            </h2>
            <p className="text-gray-600 mb-6">
              You are currently logged in. Would you like to go to your dashboard?
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 CarShare. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }

  // Login form for unauthenticated users
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">CarShare</span>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
            Log in to CarShare
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Authentication Error */}
            {errors.auth && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md">
                {errors.auth}
              </div>
            )}
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
                  ${errors.email 
                    ? 'border-red-300 text-red-900' 
                    : 'border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Password Input */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm 
                    ${errors.password 
                      ? 'border-red-300 text-red-900' 
                      : 'border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            
            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </div>
            
            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <p className="text-center text-sm text-gray-500">
          © 2025 CarShare. All rights reserved.
        </p>
      </footer>
    </div>
  );
}