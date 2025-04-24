
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Upload, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 flex flex-col">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/70f489f6-f356-463e-b18b-4d61b9c10cc4.png" 
            alt="One Health Logo" 
            className="h-12 w-auto"
          />
          <h1 className="text-2xl font-bold text-emerald-500">One Health</h1>
        </div>
        <nav>
          <Link 
            to="/login" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Login / Register
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-6 text-white">
            Your Health, <br />One Secure ID
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Centralize your medical records, control your data, and share with confidence.
          </p>
          <div className="space-x-4">
            <Link 
              to="/register" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-all inline-flex items-center"
            >
              Get Started
              <ShieldCheck className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <ShieldCheck className="text-emerald-500 h-12 w-12" />
            <div>
              <h3 className="text-xl font-semibold text-white">Secure Health ID</h3>
              <p className="text-gray-400">Unique identifier for seamless medical access</p>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <Upload className="text-cyan-500 h-12 w-12" />
            <div>
              <h3 className="text-xl font-semibold text-white">Easy Uploads</h3>
              <p className="text-gray-400">Upload medical reports instantly</p>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <Users className="text-indigo-500 h-12 w-12" />
            <div>
              <h3 className="text-xl font-semibold text-white">Access Control</h3>
              <p className="text-gray-400">Control who sees your medical history</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1A1A1A] py-6 text-center">
        <p className="text-gray-500">© 2024 One Health. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
