import { Car } from "lucide-react";

export default function Footer() {
    return <>
              <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-2xl font-bold">CarShare</span>
              </div>
              <p className="mt-4 text-gray-400">
                The easiest way to share or rent cars in your neighborhood.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Insurance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 CarShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
}