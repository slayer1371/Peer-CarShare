// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/api/auth/login`,
  signup: `${API_BASE_URL}/api/auth/signup`,
  
  // Cars
  cars: `${API_BASE_URL}/api/cars`,
  carsSearch: `${API_BASE_URL}/api/cars/search`,
  createCar: `${API_BASE_URL}/api/car`,
  myCars: `${API_BASE_URL}/api/my-cars`,
  
  // User/Profile
  profile: `${API_BASE_URL}/api/profile`,
};

// Helper function to make authenticated requests
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
