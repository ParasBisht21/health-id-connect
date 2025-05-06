
/**
 * API Service - Simulates backend API calls
 * 
 * In a real application, these functions would make actual HTTP requests to your 
 * Node.js + Express backend. For this demo, they simulate the responses.
 */

import { logSecurityEvent } from '@/utils/securityUtils';
import { createMockJwtToken, getAuthToken, parseMockJwtToken } from '@/utils/authUtils';

// Simulate database of users (in a real app, this would be MongoDB)
const mockUsers = [
  {
    id: 'user_123',
    email: 'patient@example.com',
    password: 'password123', // In reality, would be hashed
    role: 'patient',
    healthId: 'HL7DK39XY',
    firstName: 'John',
    lastName: 'Doe',
    metadata: {
      birthDate: '1990-05-15',
      bloodType: 'O+',
      contactNumber: '555-123-4567'
    }
  },
  {
    id: 'hosp_123456',
    email: 'hospital@example.com',
    password: 'password123', // In reality, would be hashed
    role: 'hospital',
    name: 'General Hospital',
    metadata: {
      address: '123 Medical Center Blvd',
      phone: '555-987-6543',
      license: 'MC98765432'
    }
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API response type
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// Login user
export async function loginUser(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
  // Simulate API call to Express backend
  await delay(800);
  
  logSecurityEvent('login_attempt', { email });
  
  const user = mockUsers.find(u => u.email === email);
  if (!user || user.password !== password) {
    logSecurityEvent('login_failed', { email, reason: 'invalid_credentials' });
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
  
  // In a real app, this token would be generated on the backend
  const token = createMockJwtToken({
    id: user.id,
    email: user.email,
    role: user.role
  });
  
  logSecurityEvent('login_successful', { email, userId: user.id });
  return {
    success: true,
    data: {
      token
    }
  };
}

// Register user
export async function registerUser(userData: {
  email: string;
  password: string;
  fullName: string;
}): Promise<ApiResponse<{ token: string; healthId: string }>> {
  // Simulate API call
  await delay(1000);
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return {
      success: false,
      error: 'Email already in use'
    };
  }
  
  // Generate health ID (in reality, this would be done on the backend)
  const healthId = generateHealthId();
  
  // Create new user (in a real app, this would be stored in MongoDB)
  const [firstName, ...lastNameParts] = userData.fullName.split(' ');
  const lastName = lastNameParts.join(' ');
  
  const newUser = {
    id: `user_${Date.now()}`,
    email: userData.email,
    password: userData.password, // Would be hashed in reality
    role: 'patient',
    healthId,
    firstName,
    lastName,
    metadata: {}
  };
  
  // In a real app, this would be saved to the database
  // mockUsers.push(newUser);
  
  // Generate token
  const token = createMockJwtToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role
  });
  
  logSecurityEvent('user_registered', { email: userData.email, userId: newUser.id });
  
  return {
    success: true,
    data: {
      token,
      healthId
    }
  };
}

// Verify OTP
export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<{ token: string }>> {
  // Simulate API call
  await delay(800);
  
  // In a real app, this would validate the OTP against what was sent
  if (otp.length !== 6) {
    return {
      success: false,
      error: 'Invalid verification code'
    };
  }
  
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    return {
      success: false,
      error: 'User not found'
    };
  }
  
  // Generate token
  const token = createMockJwtToken({
    id: user.id,
    email: user.email,
    role: user.role
  });
  
  logSecurityEvent('otp_verified', { email, userId: user.id });
  
  return {
    success: true,
    data: {
      token
    }
  };
}

// Get user profile
export async function getUserProfile(): Promise<ApiResponse<any>> {
  // Simulate API call
  await delay(600);
  
  const token = getAuthToken();
  if (!token) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }
  
  const payload = parseMockJwtToken(token);
  if (!payload) {
    return {
      success: false,
      error: 'Invalid token'
    };
  }
  
  const user = mockUsers.find(u => u.id === payload.id);
  if (!user) {
    return {
      success: false,
      error: 'User not found'
    };
  }
  
  // Don't return password in response
  const { password, ...userWithoutPassword } = user;
  
  return {
    success: true,
    data: userWithoutPassword
  };
}

// Helper function to generate Health ID
function generateHealthId(): string {
  const prefix = 'HL';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = prefix;
  
  // Generate 8 random characters
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

// Upload medical report (simulation)
export async function uploadReport(file: File, metadata: any): Promise<ApiResponse<{ reportId: string }>> {
  // Simulate API call
  await delay(1500);
  
  // In a real app, this would upload to Firebase Storage or AWS S3
  // and store metadata in MongoDB
  
  const reportId = `report_${Date.now()}`;
  
  return {
    success: true,
    data: {
      reportId
    },
    message: 'Report uploaded successfully'
  };
}

// Get medical reports
export async function getMedicalReports(): Promise<ApiResponse<any[]>> {
  // Simulate API call
  await delay(800);
  
  // In a real app, this would fetch from MongoDB
  const mockReports = [
    {
      id: 'report_123',
      title: 'Annual Checkup',
      date: '2025-04-15',
      hospital: 'General Hospital',
      doctor: 'Dr. Smith',
      type: 'General',
      fileUrl: '#'
    },
    {
      id: 'report_124',
      title: 'Blood Test Results',
      date: '2025-03-22',
      hospital: 'City Medical Center',
      doctor: 'Dr. Johnson',
      type: 'Laboratory',
      fileUrl: '#'
    }
  ];
  
  return {
    success: true,
    data: mockReports
  };
}
