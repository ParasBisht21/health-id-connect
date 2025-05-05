
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { OTPVerification } from './OTPVerification';

export const HospitalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      toast.error("All fields required", {
        description: "Please enter both email and password"
      });
      return;
    }

    // In a real app, this would verify credentials with the backend
    // For demo, we'll simulate OTP flow
    toast.success("Initial verification successful", {
      description: "Please enter the OTP sent to your email"
    });
    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    // In a real app, this would redirect to dashboard
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
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-green/90"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
