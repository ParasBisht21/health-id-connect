
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { OTPVerification } from './OTPVerification';
import { simulateLogin } from '@/utils/authUtils';
import { logSecurityEvent } from '@/utils/securityUtils';
import { Loader2 } from 'lucide-react';

export const HospitalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      toast.error("All fields required", {
        description: "Please enter both email and password"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Log login attempt for security monitoring
      logSecurityEvent('hospital_login_attempt', { email });
      
      // Simulate API call to backend
      const result = await simulateLogin(email, password);
      
      if (result.success) {
        toast.success("Initial verification successful", {
          description: "Please enter the OTP sent to your email"
        });
        setShowOTP(true);
      } else {
        toast.error("Login failed", {
          description: result.message || "Invalid credentials"
        });
        
        // Log failed attempt
        logSecurityEvent('hospital_login_failed', { 
          email, 
          reason: result.message || "Invalid credentials" 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login error", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = () => {
    // In a real app, JWT would be stored and user redirected
    // Log successful login
    logSecurityEvent('hospital_login_successful', { email });
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handleCancelOTP = () => {
    setShowOTP(false);
  };

  if (showOTP) {
    return (
      <Card className="w-full max-w-md mx-auto bg-black/70 border-white/10 text-white">
        <CardContent className="pt-6">
          <OTPVerification 
            email={email}
            onVerified={handleOTPVerified}
            onCancel={handleCancelOTP}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black/70 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-white">Hospital Login</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Login with your hospital account credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hospital@example.com"
              className="bg-white/5 border-white/10 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-green/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Login"
            )}
          </Button>
          
          <div className="text-xs text-center mt-4 text-gray-400">
            Demo credentials: hospital@example.com / password123
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
