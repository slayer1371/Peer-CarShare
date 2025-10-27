import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of user data
export interface User {
  id: string;
  name: string;
  email: string; 
  lastLogin?: string;
  // Dashboard stats
  carsListed?: number;
  totalRentals?: number;
  totalEarnings?: number;
  // Profile info (optional)
  phoneNumber?: string;
  licenseNumber?: string;
  // Additional fields
  profilePicture?: string;
  isVerified?: boolean;
}

// Define the context type
interface UserContextType {
  user: User | null;
  login: (userData: User, token?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage on context creation with safe parsing
    try {
      const storedUser = localStorage.getItem('carShareUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      return null;
    }
  });

  const login = (userData: User, token?: string) => {
    setUser(userData);
    localStorage.setItem('carShareUser', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('authToken', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carShareUser');
    localStorage.removeItem('authToken');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('carShareUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};