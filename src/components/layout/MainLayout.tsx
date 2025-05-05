
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, User, LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Sidebar Navigation */}
      <div className="w-16 md:w-64 bg-black/40 border-r border-border/10 backdrop-blur-xl">
        <div className="flex items-center justify-center h-16 md:h-20 border-b border-border/10">
          <div className="rounded-xl bg-emerald-600/10 p-2 backdrop-blur-sm hidden md:block">
            <img src="/lovable-uploads/70f489f6-f356-463e-b18b-4d61b9c10cc4.png" alt="One Health Logo" className="h-10 w-10" />
          </div>
          <h1 className="text-white font-bold text-lg ml-2 hidden md:block">One Health</h1>
        </div>
        <nav className="p-2 md:p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className={`flex items-center p-2 rounded-md transition-colors ${isActive('/dashboard')}`}>
                <Home className="h-5 w-5" />
                <span className="ml-3 hidden md:inline-block">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/reports" className={`flex items-center p-2 rounded-md transition-colors ${isActive('/reports')}`}>
                <FileText className="h-5 w-5" />
                <span className="ml-3 hidden md:inline-block">Reports</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={`flex items-center p-2 rounded-md transition-colors ${isActive('/profile')}`}>
                <User className="h-5 w-5" />
                <span className="ml-3 hidden md:inline-block">Profile</span>
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4 w-full left-0 px-2 md:px-4">
            <Link to="/login" className={`flex items-center p-2 rounded-md transition-colors text-gray-400 hover:text-white hover:bg-white/5`}>
              <LogOut className="h-5 w-5" />
              <span className="ml-3 hidden md:inline-block">Sign Out</span>
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
