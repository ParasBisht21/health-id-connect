
import React from 'react';
import { HospitalLogin } from '@/components/auth/HospitalLogin';

const HospitalLoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">HealthSync</h1>
        <p className="text-gray-400 text-center">Hospital Secure Access Portal</p>
      </div>
      
      <HospitalLogin />
      
      <p className="mt-8 text-gray-500 text-sm text-center">
        Enhanced security with OTP verification for hospital access
      </p>
    </div>
  );
};

export default HospitalLoginPage;
