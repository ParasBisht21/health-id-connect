
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '@/services/apiService';
import { getAuthToken, isAuthenticated, logout } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';

// Define the shape of the user data
export type UserData = {
  id: string;
  email: string;
  role: string;
  healthId?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  metadata?: Record<string, any>;
};

// Define the shape of the auth context
interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  isLoggedIn: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
  isPatient: boolean;
  isHospital: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  refreshUser: async () => {},
  logout: () => {},
  isPatient: false,
  isHospital: false,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch the user data
  const refreshUser = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await getUserProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
        // If token is invalid, log out
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  // Check authentication on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // Monitor token changes
  useEffect(() => {
    const checkToken = () => {
      const token = getAuthToken();
      if (!token && user) {
        setUser(null);
      }
    };

    // Check token every minute
    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, [user]);

  // Determine user role
  const isPatient = user?.role === 'patient';
  const isHospital = user?.role === 'hospital';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoggedIn: !!user,
      refreshUser,
      logout: handleLogout,
      isPatient,
      isHospital
    }}>
      {children}
    </AuthContext.Provider>
  );
};
