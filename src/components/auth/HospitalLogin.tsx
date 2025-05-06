
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { OTPVerification } from './OTPVerification';
import { logSecurityEvent } from '@/utils/securityUtils';
import { Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

export const HospitalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast.error("Login failed", {
          description: error.message
        });
        
        // Log failed attempt
        logSecurityEvent('hospital_login_failed', { 
          email, 
          reason: error.message
        });
        return;
      }
      
      // Check if the user has the hospital role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        toast.error("Error fetching user role", {
          description: profileError.message
        });
        return;
      }
      
      if (profileData.role !== 'hospital') {
        toast.error("Access denied", {
          description: "This login is only for hospital accounts"
        });
        
        // Sign out the user since they don't have the right role
        await supabase.auth.signOut();
        
        // Log failed attempt
        logSecurityEvent('hospital_login_failed', { 
          email, 
          reason: "Not a hospital account" 
        });
        return;
      }

      // For demonstration, we'll still show the OTP verification flow
      // In a production app, this might use a real OTP via email/SMS
      toast.success("Initial verification successful", {
        description: "Please enter the OTP sent to your email"
      });
      setShowOTP(true);
      
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
    // Log successful login
    logSecurityEvent('hospital_login_successful', { email });
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleCancelOTP = () => {
    setShowOTP(false);
    // Sign out since they canceled the OTP step
    supabase.auth.signOut();
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
