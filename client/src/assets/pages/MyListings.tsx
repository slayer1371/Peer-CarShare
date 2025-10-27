import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Components/Navbar';
import { Car as CarIcon, MapPin, DollarSign, Calendar, Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { API_ENDPOINTS, fetchWithAuth } from '../../config/api';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  location: string;
  pricePerDay: number;
  availability: boolean;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export default function MyListings() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchWithAuth(API_ENDPOINTS.myCars);
      
      if (!response.ok) {
        throw new Error('Failed to fetch your listings');
      }
      
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">My Listings</h1>
            <p className="text-lg text-blue-100">
              Manage your car listings and track your earnings
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Listings</p>
                  <p className="text-3xl font-bold text-gray-800">{cars.length}</p>
                </div>
                <CarIcon className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Available</p>
                  <p className="text-3xl font-bold text-green-600">
                    {cars.filter(car => car.availability).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Unavailable</p>
                  <p className="text-3xl font-bold text-gray-600">
                    {cars.filter(car => !car.availability).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⏸</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Listing Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/add-listing')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Listing
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error loading your listings</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && cars.length === 0 && (
            <div className="text-center py-20">
              <CarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No listings yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start earning by listing your first car!
              </p>
              <button
                onClick={() => navigate('/add-listing')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" />
                List Your First Car
              </button>
            </div>
          )}

          {/* Cars Grid */}
          {!loading && !error && cars.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Car Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden relative">
                    {car.imageUrl ? (
                      <img 
                        src={car.imageUrl} 
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg></div>';
                        }}
                      />
                    ) : (
                      <CarIcon className="w-20 h-20 text-gray-400" />
                    )}
                    
                    {/* Availability Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      car.availability 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {car.availability ? 'Available' : 'Unavailable'}
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{car.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{car.year}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm font-semibold">${car.pricePerDay}/day</span>
                      </div>
                    </div>

                    {car.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {car.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {/* TODO: Implement edit functionality */}}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {/* TODO: Implement delete functionality */}}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
