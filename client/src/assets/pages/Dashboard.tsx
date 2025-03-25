import { useUser } from "../../context/UserContext";
import { Car, LogOut, PlusCircle, Handshake, CreditCard, Shield } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useUser();

  const dashboardStats = [
    { 
      icon: Car, 
      title: 'Cars Listed', 
      value: user?.carsListed || 0,
      color: 'text-blue-600'
    },
    { 
      icon: Handshake, 
      title: 'Total Rentals', 
      value: user?.totalRentals || 0,
      color: 'text-green-600'
    },
    { 
      icon: CreditCard, 
      title: 'Total Earnings', 
      value: `$${user?.totalEarnings?.toLocaleString() || 0}`,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-500">Your P2P Car Rental Dashboard</p>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <div 
              key={stat.title}
              className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition"
            >
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">List a Car</h2>
              <PlusCircle className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-800" />
            </div>
            <p className="text-gray-500 mb-4">
              Share your vehicle and start earning passive income from your car.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Add New Listing
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Hire a Car</h2>
              <Car className="w-6 h-6 text-green-600 cursor-pointer hover:text-green-800" />
            </div>
            <p className="text-gray-500 mb-4">
              Browse and book unique cars from local owners near you.
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Find a Car
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-yellow-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">
              Platform Safety
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Verified Users</h3>
              <p className="text-gray-500">Every user is verified</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Insurance Covered</h3>
              <p className="text-gray-500">Full protection during rentals</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Secure Payments</h3>
              <p className="text-gray-500">Encrypted transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}