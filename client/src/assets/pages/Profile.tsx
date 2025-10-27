import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import Navbar from '../Components/Navbar';
import { User, Phone, CreditCard, Save, Loader2, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS, fetchWithAuth } from '../../config/api';

interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licenseNumber: string;
}

export default function Profile() {
  const { user } = useUser();
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    licenseNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      const response = await fetchWithAuth(API_ENDPOINTS.profile);

      if (response.ok) {
        const data = await response.json();
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          licenseNumber: data.licenseNumber,
        });
      } else if (response.status === 404) {
        // Profile doesn't exist yet, that's okay
        setError(null);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetchWithAuth(API_ENDPOINTS.profile, {
        method: 'POST',
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        // Try to parse error as JSON, fallback to text
        let errorMessage = 'Failed to save profile';
        try {
          const data = await response.json();
          errorMessage = data.message || data.error || errorMessage;
        } catch {
          const text = await response.text();
          console.error('Server response:', text);
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      await response.json(); // Profile saved successfully
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Profile save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <User className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Profile
            </h1>
            <p className="text-gray-600">
              Complete your profile to start renting or listing cars
            </p>
            {user && (
              <p className="text-sm text-gray-500 mt-2">
                Logged in as: <span className="font-semibold">{user.email}</span>
              </p>
            )}
            {!localStorage.getItem('authToken') && (
              <p className="text-sm text-red-600 mt-2">
                ⚠️ No auth token found - you may need to login again
              </p>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
              className="text-xs text-gray-500 hover:text-gray-700 mt-2 underline cursor-pointer"
            >
              Having issues? Click here to clear session and re-login
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">Profile saved successfully!</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* License Number */}
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Driver's License Number *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="D1234567"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Your license information is kept secure and is required for car rentals
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Why we need this information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Verify your identity for platform safety</li>
              <li>• Enable direct contact during rentals</li>
              <li>• Comply with legal requirements</li>
              <li>• Build trust within the CarShare community</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
