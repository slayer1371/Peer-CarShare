import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../../context/UserContext';
import Navbar from '../Components/Navbar';
import { Car, MapPin, DollarSign, Calendar, Save, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { API_ENDPOINTS, fetchWithAuth } from '../../config/api';

interface CarFormData {
  make: string;
  model: string;
  year: string;
  location: string;
  pricePerDay: string;
  availability: boolean;
  imageUrl: string;
  description: string;
}

export default function AddListing() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CarFormData>({
    make: '',
    model: '',
    year: '',
    location: '',
    pricePerDay: '',
    availability: true,
    imageUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate year
      const yearNum = parseInt(formData.year);
      if (yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
        throw new Error('Please enter a valid year');
      }

      // Validate price
      const priceNum = parseFloat(formData.pricePerDay);
      if (priceNum <= 0) {
        throw new Error('Price must be greater than 0');
      }

      const response = await fetchWithAuth(API_ENDPOINTS.createCar, {
        method: 'POST',
        body: JSON.stringify({
          make: formData.make,
          model: formData.model,
          year: yearNum,
          location: formData.location,
          pricePerDay: priceNum,
          availability: formData.availability,
          imageUrl: formData.imageUrl || null,
          description: formData.description || null,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create listing';
        try {
          const data = await response.json();
          errorMessage = data.message || data.error || errorMessage;
        } catch {
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      await response.json(); // Car listed successfully
      setSuccess(true);

      // Redirect to listings page after 2 seconds
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
    } catch (err) {
      console.error('Add listing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Car className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              List Your Car
            </h1>
            <p className="text-gray-600">
              Share your vehicle and start earning passive income
            </p>
            {user && (
              <p className="text-sm text-gray-500 mt-2">
                Listing as: <span className="font-semibold">{user.name}</span>
              </p>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">Car listed successfully!</p>
                <p className="text-green-700 text-sm">Redirecting to listings page...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Listing Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                  Car Make *
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Toyota, Honda, Tesla"
                />
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Camry, Civic, Model 3"
                />
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={currentYear + 1}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`e.g., ${currentYear}`}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., New York, NY or San Francisco, CA"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the city and state where the car is available
                </p>
              </div>

              {/* Price Per Day */}
              <div>
                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Day ($) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 50.00"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Set a competitive daily rental rate
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/car-image.jpg"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Paste a direct link to your car's image (from Imgur, Cloudinary, etc.)
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your car's features, condition, and any special requirements..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Help renters understand what makes your car special
                </p>
              </div>

              {/* Availability */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="availability" className="ml-2 text-sm font-medium text-gray-700">
                  Car is available for rent
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Listing...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Listed Successfully!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    List My Car
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Tips for a great listing</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be accurate with your car details</li>
              <li>• Set a competitive price based on similar vehicles in your area</li>
              <li>• Keep your car clean and well-maintained</li>
              <li>• Respond promptly to rental inquiries</li>
              <li>• Update availability regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
