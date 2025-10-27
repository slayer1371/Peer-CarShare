import { Car, Menu, X, UserCircle, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useUser();

    function handleclick() {
        navigate("/");
    }   

    return <>
    <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div onClick={handleclick} className="flex-shrink-0 flex items-center cursor-pointer">
            <Car className="h-8 w-8 text-blue-600" />
            <span  className="ml-2 text-2xl font-bold text-gray-900">CarShare</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">How It Works</a>
          <a href="/#benefits" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">Benefits</a>
          <a href="/#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">Testimonials</a>
          <a href="/#faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">FAQ</a>
          <button onClick={() => navigate("/listings")} className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">Listings</button>
          
          {/* Show different buttons based on auth status */}
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/dashboard")} className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">Dashboard</button>
              <button onClick={() => navigate("/profile")} className="flex items-center gap-1 text-gray-700 hover:text-blue-600 px-3 py-2 font-medium cursor-pointer">
                <UserCircle className="w-4 h-4" />
                Profile
              </button>
              <button onClick={logout} className="flex items-center gap-1 text-red-600 hover:text-red-700 px-3 py-2 font-medium cursor-pointer">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => window.open("/signup", "_blank")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">Sign Up</button>
              <button onClick={() => window.open("/login", "_blank")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium cursor-pointer">Login</button>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-white shadow-lg rounded-lg m-4">
        <div className="flex flex-col py-2">
          <a href="#how-it-works" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium cursor-pointer">How It Works</a>
          <a href="#benefits" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium cursor-pointer">Benefits</a>
          <a href="#testimonials" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium cursor-pointer">Testimonials</a>
          <a href="#faq" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium cursor-pointer">FAQ</a>
          <button onClick={() => navigate("/listings")} className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium text-left cursor-pointer">Listings</button>
          
          {/* Show different buttons based on auth status */}
          <div className="flex flex-col px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">Dashboard</button>
                <button onClick={() => navigate("/profile")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
                <button onClick={logout} className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">Sign Up</button>
                <button onClick={() => navigate("/login")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium cursor-pointer">Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </nav>
    </>
}