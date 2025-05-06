
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from "@/components/ui/sonner";

// Define the shape of the user data
export type UserData = {
  id: string;
  email: string;
  role?: string;
  healthId?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  metadata?: Record<string, any>;
};

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoggedIn: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  isPatient: boolean;
  isHospital: boolean;
  userProfile: any | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isLoggedIn: false,
  refreshUser: async () => {},
  logout: async () => {},
  isPatient: false,
  isHospital: false,
  userProfile: null,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Helper to clean up auth state from localStorage
const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching user profile:', error);
      return null;
    }
  };

  // Function to refresh the user data
  const refreshUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        setSession(session);
        setUser(session.user);
        
        // Fetch user profile
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setSession(null);
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setSession(null);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Update state
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      // Show toast
      toast.success("Logged out successfully");
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Logout failed", {
        description: "Please try again"
      });
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Update synchronously
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch profile data with a slight delay to prevent deadlocks
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id).then(profile => {
              setUserProfile(profile);
            });
          }, 0);
        } else {
          setUserProfile(null);
        }

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            toast.success("Signed in successfully");
            break;
          case 'SIGNED_OUT':
            // Already handled by our explicit logout function
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
          case 'USER_UPDATED':
            toast.success("User profile updated");
            break;
        }
      }
    );

    // Then check for existing session
    refreshUser();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Determine user role
  const isPatient = userProfile?.role === 'patient';
  const isHospital = userProfile?.role === 'hospital';

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      loading, 
      isLoggedIn: !!user,
      refreshUser,
      logout: handleLogout,
      isPatient,
      isHospital,
      userProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
