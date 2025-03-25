import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of user data
export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin?: string;
}

// Define the context type
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage on context creation
    const storedUser = localStorage.getItem('carShareUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('carShareUser', JSON.stringify(userData));
    localStorage.setItem('authToken', 'your-auth-token'); // Store auth token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carShareUser');
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
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