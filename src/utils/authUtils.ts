
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// Interface for JWT payload
interface JwtPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

// Mock function to simulate JWT token creation (in a real app, this would be done on the backend)
export const createMockJwtToken = (payload: Omit<JwtPayload, "exp">): string => {
  // In a real app, this would be handled securely by the backend
  // This is just a simulation for the frontend demo
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600; // 1 hour
  
  const fullPayload = {
    ...payload,
    exp: now + expiresIn
  };
  
  // Base64 encode parts (not actual JWT encoding, just for simulation)
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(fullPayload));
  const mockSignature = "MOCK_SIGNATURE"; // In real JWT, this would be a proper signature
  
  return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
};

// Parse the mock JWT token to get the payload
export const parseMockJwtToken = (token: string): JwtPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

// Simulate checking if token is expired
export const isMockTokenExpired = (token: string): boolean => {
  const payload = parseMockJwtToken(token);
  if (!payload) return true;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};

// Store auth token in localStorage
export const storeAuthToken = (token: string): void => {
  localStorage.setItem('healthsync_auth_token', token);
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('healthsync_auth_token');
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('healthsync_auth_token');
};

// Login function using Supabase
export const simulateLogin = async (
  email: string, 
  password: string
): Promise<{ success: boolean; token?: string; message?: string }> => {
  try {
    // Use Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return {
        success: false,
        message: error.message
      };
    }
    
    if (data.session) {
      return {
        success: true,
        token: data.session.access_token
      };
    } else {
      return {
        success: false,
        message: "No session returned from authentication"
      };
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred"
    };
  }
};

// Verify OTP function
export const simulateVerifyOTP = async (
  email: string, 
  otp: string
): Promise<{ success: boolean; token?: string; message?: string }> => {
  try {
    // In a real implementation, we would verify the OTP with a backend service
    // For demo purposes, we'll just check against a hardcoded value
    const DEMO_OTP = "123456";
    
    if (otp === DEMO_OTP) {
      // Create a simulated session token
      const token = createMockJwtToken({
        id: `user-${Date.now()}`,
        email,
        role: 'hospital'
      });
      
      return {
        success: true,
        token
      };
    } else {
      return {
        success: false,
        message: "Invalid verification code"
      };
    }
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return {
      success: false,
      message: "An unexpected error occurred"
    };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  
  return !isMockTokenExpired(token);
};

// Get authenticated user info
export const getAuthUserInfo = (): { id: string; email: string; role: string } | null => {
  const token = getAuthToken();
  if (!token) return null;
  
  const payload = parseMockJwtToken(token);
  if (!payload || isMockTokenExpired(token)) {
    removeAuthToken();
    return null;
  }
  
  return {
    id: payload.id,
    email: payload.email,
    role: payload.role
  };
};

// Simulate logout
export const logout = (): void => {
  removeAuthToken();
  toast.success("Logged out successfully");
};
