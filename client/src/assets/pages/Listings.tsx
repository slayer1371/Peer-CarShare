import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import { Search, MapPin, DollarSign, Calendar, Car as CarIcon, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

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
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function Listings() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [locationFilter, setLocationFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all available cars
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.cars);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
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

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (locationFilter) params.append('location', locationFilter);
      if (maxPrice) params.append('priceRange', maxPrice);
      
      const url = params.toString() 
        ? `${API_ENDPOINTS.carsSearch}?${params.toString()}`
        : API_ENDPOINTS.cars;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      console.error('Error searching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLocationFilter('');
    setMaxPrice('');
    setSearchTerm('');
    fetchCars();
  };

  // Client-side filtering by make/model search term
  const filteredCars = cars.filter(car => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      car.make.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Browse Available Cars</h1>
            <p className="text-lg text-blue-100">
              Find the perfect car for your next adventure from local owners
            </p>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="container mx-auto px-6 -mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (e.g., New York)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Max Price Filter */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max price per day"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Make/Model Search */}
              <div className="relative">
                <CarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Make or Model"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Search Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-6 py-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error loading listings</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredCars.length === 0 && (
            <div className="text-center py-20">
              <CarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No cars found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new listings
              </p>
            </div>
          )}

          {/* Cars Grid */}
          {!loading && !error && filteredCars.length > 0 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'} Available
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Car Image */}
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                      {car.imageUrl ? (
                        <img 
                          src={car.imageUrl} 
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg></div>';
                          }}
                        />
                      ) : (
                        <CarIcon className="w-20 h-20 text-gray-400" />
                      )}
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
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            ${car.pricePerDay}
                          </p>
                          <p className="text-xs text-gray-500">per day</p>
                        </div>

                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                          Book Now
                        </button>
                      </div>

                      {car.user && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Listed by <span className="font-semibold">{car.user.name}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}