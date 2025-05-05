
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
