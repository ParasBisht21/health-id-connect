
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { logSecurityEvent } from "@/utils/securityUtils";
import { validatePasswordStrength } from "@/utils/securityUtils";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState({ valid: false, score: 0, feedback: "" });
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Check password strength
  const handlePasswordChange = (password: string) => {
    if (password.length > 0) {
      const strength = validatePasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ valid: false, score: 0, feedback: "" });
    }
  };

  React.useEffect(() => {
    const password = form.watch("password");
    handlePasswordChange(password);
  }, [form.watch("password")]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      
      // Additional password strength validation
      if (!passwordStrength.valid) {
        toast.error("Password too weak", {
          description: passwordStrength.feedback
        });
        return;
      }
      
      // Log registration attempt
      logSecurityEvent('registration_attempt', { email: values.email });
      
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: 'patient'
          }
        }
      });
      
      if (error) {
        toast.error("Registration failed", {
          description: error.message
        });
        
        // Log failed registration
        logSecurityEvent('registration_failed', { 
          email: values.email, 
          reason: error.message
        });
        return;
      }

      // Log successful registration
      logSecurityEvent('registration_successful', { email: values.email });
      
      // Check if email confirmation is required
      if (data.user && data.session) {
        toast.success("Registration successful", {
          description: "Your account has been created. Redirecting to dashboard..."
        });
        navigate('/dashboard');
      } else {
        toast.success("Registration successful", {
          description: "Please check your email to confirm your account"
        });
        navigate('/login');
      }
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error("Registration error", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <Card className="w-full max-w-md border-border/10 shadow-2xl bg-black/40 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-emerald-600/10 p-4 backdrop-blur-sm">
              <img src="/lovable-uploads/70f489f6-f356-463e-b18b-4d61b9c10cc4.png" alt="One Health Logo" className="h-16 w-16" />
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold text-white">Create an account</CardTitle>
          <CardDescription className="text-base text-gray-400">
            Enter your information to create your One Health ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="pl-10 h-12 bg-white/5 border-white/10 text-white" 
                          disabled={loading}
                        />
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="name@example.com" 
                          {...field} 
                          type="email" 
                          className="pl-10 h-12 bg-white/5 border-white/10 text-white" 
                          disabled={loading}
                        />
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          className="pr-10 pl-3 h-12 bg-white/5 border-white/10 text-white"
                          disabled={loading}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {passwordStrength.score > 0 && field.value && (
                      <div className="mt-1">
                        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength.score >= 4 ? "bg-green-500" : 
                              passwordStrength.score >= 3 ? "bg-blue-500" : 
                              passwordStrength.score >= 2 ? "bg-yellow-500" : "bg-red-500"
                            }`} 
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <p className={`text-xs mt-1 ${
                          passwordStrength.valid ? "text-green-400" : "text-yellow-400"
                        }`}>
                          {passwordStrength.feedback}
                        </p>
                      </div>
                    )}
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showConfirmPassword ? "text" : "password"}
                          className="pr-10 pl-3 h-12 bg-white/5 border-white/10 text-white"
                          disabled={loading}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-green hover:bg-brand-green/90 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="px-8">
            <p className="text-sm text-gray-400">
              By clicking register, you agree to our 
              <a href="/terms" className="text-brand-cyan hover:text-brand-cyan/80 ml-1">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="text-brand-cyan hover:text-brand-cyan/80">Privacy Policy</a>.
            </p>
          </div>
          <div className="text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-brand-cyan hover:text-brand-cyan/80 font-medium">
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
