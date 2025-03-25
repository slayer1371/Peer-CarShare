import { useState, useEffect } from "react";
import { Car, Eye, EyeOff, ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { FormDataLogin, ErrorsLogin, UserLogin } from "./types/types-login";

export default function LoginPage() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState<ErrorsLogin>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserLogin>({
    name : "",
    email : ""
  });
  
  // Demo credentials - in a real app these would be verified through an API
  const demoCredentials = {
    email: "demo@carshare.com",
    password: "password123"
  };
  
  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('carShareUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (e) {
        // Handle invalid stored data
        localStorage.removeItem('carShareUser');
      }
    }
  }, []);
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validate = () => {
    const newErrors : ErrorsLogin = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e : React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (formData.email === demoCredentials.email && 
            formData.password === demoCredentials.password) {
          // Create user data
          const userData = {
            email: formData.email,
            name: "Demo User",
            id: "user_demo123",
            lastLogin: new Date().toISOString()
          };
          
          // Store in localStorage for session persistence
          localStorage.setItem('carShareUser', JSON.stringify(userData));
          
          // Update state
          setUser(userData);
          setIsLoggedIn(true);
          
          // Reset form
          setFormData({
            email: "",
            password: ""
          });
        } else {
          // Failed login
          setErrors({
            auth: "Invalid email or password"
          });
        }
        setIsLoading(false);
      }, 1000);
    }
  };
  
  const handleLogout = () => {
    // Clear the session
    localStorage.removeItem('carShareUser');
    
    // Update state
    setUser({name : "", email : ""});
    setIsLoggedIn(false);
    
    // In a real app, you might also want to invalidate the session on the backend
    alert("Logged out successfully!");
    
    // Redirect to homepage - in a real app, use React Router
    // window.location.href = "/";
  };
  
  const redirectToHome = () => {
    // In a real app, use React Router
    alert("Redirecting to home page...");
    // window.location.href = "/";
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Render authenticated user view
  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CarShare</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </header>
        
        {/* Authenticated User Content */}
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
              <p className="mt-2 text-xl text-gray-700">
                {user.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 mb-6">
                You are currently logged in. Your session will persist until you log out, even if you refresh the page.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={redirectToHome}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Dashboard
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2025 CarShare. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Render login form for unauthenticated users
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">CarShare</span>
          </div>
          <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </div>
      </header>
      
      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Log in to access your CarShare account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General auth error */}
            {errors.auth && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.auth}</p>
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
            
            {/* Password field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
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
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>
            
            {/* Remember me checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
            
            {/* Demo credentials helper */}
            {/* <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-xs text-blue-800">
                <strong>Demo credentials:</strong><br />
                Email: demo@carshare.com<br />
                Password: password123
              </p>
            </div> */}
          </form>
          
          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a onClick={() => {
                navigate("/signup");
              }} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                Sign up
              </a>
            </p>
          </div>
          
          {/* Social login options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 CarShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}