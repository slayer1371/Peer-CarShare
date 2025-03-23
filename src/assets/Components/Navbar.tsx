import { Car, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

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
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">How It Works</a>
          <a href="#benefits" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Benefits</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Testimonials</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">FAQ</a>
          <button className="ml-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">Sign Up</button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium">Login</button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600"
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
          <a href="#how-it-works" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium">How It Works</a>
          <a href="#benefits" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium">Benefits</a>
          <a href="#testimonials" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium">Testimonials</a>
          <a href="#faq" className="text-gray-700 hover:bg-gray-50 px-4 py-3 font-medium">FAQ</a>
          <div className="flex flex-col px-4 py-3 space-y-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">Sign Up</button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium">Login</button>
          </div>
        </div>
      </div>
    )}
  </nav>
    </>
}