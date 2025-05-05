
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";
import { Shield, Loader2 } from "lucide-react";
import { simulateVerifyOTP, storeAuthToken } from '@/utils/authUtils';
import { logSecurityEvent } from '@/utils/securityUtils';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const OTPVerification = ({ email, onVerified, onCancel }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

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
    // Log resend request
    logSecurityEvent('otp_resend_request', { email });
    
    // In a real app, this would send a new OTP via API
    toast.success("New OTP sent", {
      description: `A new verification code has been sent to ${email}`
    });
    setResendDisabled(true);
    setCountdown(30);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Invalid OTP", {
        description: "Please enter the complete 6-digit code"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Log OTP verification attempt
      logSecurityEvent('otp_verification_attempt', { email });
      
      // Simulate API call to verify OTP
      const result = await simulateVerifyOTP(email, otp);
      
      if (result.success && result.token) {
        // Store JWT token
        storeAuthToken(result.token);
        
        toast.success("OTP verified successfully");
        
        // Log successful verification
        logSecurityEvent('otp_verification_successful', { email });
        
        onVerified();
      } else {
        toast.error("Verification failed", {
          description: result.message || "Invalid verification code"
        });
        
        // Log failed verification
        logSecurityEvent('otp_verification_failed', { 
          email, 
          reason: result.message || "Invalid code" 
        });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error("Verification error", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
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
              disabled={loading}
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
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-brand-green hover:bg-brand-green/90"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify & Login"
          )}
        </Button>
      </div>
    </div>
  );
};
