
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";
import { Shield } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const OTPVerification = ({ email, onVerified, onCancel }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: number | undefined;
    if (resendDisabled && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendDisabled, countdown]);

  const handleResendOTP = () => {
    // In a real app, this would send a new OTP
    toast.success("New OTP sent", {
      description: `A new verification code has been sent to ${email}`
    });
    setResendDisabled(true);
    setCountdown(30);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Invalid OTP", {
        description: "Please enter the complete 6-digit code"
      });
      return;
    }
    
    // In a real app, this would verify the OTP with the backend
    // For demo purposes, we'll just accept any 6-digit code
    toast.success("OTP verified successfully");
    onVerified();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="rounded-full bg-white/10 p-3">
          <Shield className="h-6 w-6 text-brand-green" />
        </div>
        <h3 className="text-xl font-bold text-center text-white">Secure Verification</h3>
        <p className="text-sm text-center text-gray-400">
          For additional security, we sent a verification code to <strong>{email}</strong>
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="gap-2"
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index}
                  className="rounded-md border bg-white/5 border-white/10 text-white" 
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <div className="flex items-center justify-center">
          {resendDisabled ? (
            <p className="text-sm text-gray-400">Resend code in {countdown}s</p>
          ) : (
            <Button 
              variant="link" 
              className="text-brand-green"
              onClick={handleResendOTP}
            >
              Resend Code
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="outline"
          className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-brand-green hover:bg-brand-green/90"
          onClick={handleVerify}
        >
          Verify & Login
        </Button>
      </div>
    </div>
  );
};
