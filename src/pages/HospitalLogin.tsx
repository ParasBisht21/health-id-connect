
import React from 'react';
import { HospitalLogin } from '@/components/auth/HospitalLogin';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const HospitalLoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">HealthSync</h1>
        <p className="text-gray-400 text-center">Hospital Secure Access Portal</p>
      </div>
      
      <HospitalLogin />
      
      <div className="mt-8 max-w-md">
        <div className="flex items-start space-x-3 mb-4">
          <Shield className="h-5 w-5 text-brand-green mt-0.5" />
          <p className="text-gray-500 text-sm">
            Enhanced security with OTP verification for hospital access
          </p>
        </div>
        
        <div className="flex items-start space-x-3 mb-4">
          <Lock className="h-5 w-5 text-brand-green mt-0.5" />
          <p className="text-gray-500 text-sm">
            All communications are encrypted and secured with JWT authentication
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <p className="text-gray-500 text-sm">
            Note: This is a demonstration. In production, a proper backend would handle authentication securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalLoginPage;
