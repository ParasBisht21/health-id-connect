
/**
 * This is a simulation of encryption utilities.
 * In a production environment, you would use proper encryption libraries
 * and implement server-side encryption for sensitive data.
 */

// Simulates encryption of patient data (for demonstration purposes only)
export const encryptData = (data: any): string => {
  try {
    // In a real app, this would use proper encryption
    // For demo purposes, we're just doing a Base64 encode
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Simulates decryption of patient data (for demonstration purposes only)
export const decryptData = (encryptedData: string): any => {
  try {
    // In a real app, this would use proper decryption
    // For demo purposes, we're just doing a Base64 decode
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

// Validates file security requirements
export const validateFileSecurityRequirements = (file: File): { valid: boolean; error?: string } => {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  
  if (file.size > MAX_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds maximum limit (10MB). Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB` 
    };
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not supported. Please upload PDF, JPG or PNG files only.'
    };
  }
  
  return { valid: true };
};

// Generate a random Health ID
export const generateHealthId = (): string => {
  // In a real app, this would be handled on the backend with proper UUID generation
  // This is just for demonstration purposes
  const prefix = 'HL';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = prefix;
  
  // Generate 8 random characters
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// Simulate IP logging for security
export const logSecurityEvent = (event: string, details: Record<string, any> = {}): void => {
  // In a real app, this would log to your security monitoring system
  console.log(`Security Event: ${event}`, {
    timestamp: new Date().toISOString(),
    ...details
  });
};

// Validate password strength
export const validatePasswordStrength = (password: string): { 
  valid: boolean; 
  score: number; 
  feedback: string;
} => {
  // Simple password validation - in a real app, use a more sophisticated approach
  let score = 0;
  let feedback = '';
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  const valid = score >= 3;
  
  if (score < 3) {
    feedback = 'Password is too weak. Try adding uppercase, numbers or special characters.';
  } else if (score < 5) {
    feedback = 'Good password, but could be stronger.';
  } else {
    feedback = 'Strong password!';
  }
  
  return { valid, score, feedback };
};
