
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Eye, EyeOff, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { logSecurityEvent } from "@/utils/securityUtils";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      
      // Log login attempt for security monitoring
      logSecurityEvent('login_attempt', { email: values.email });
      
      // Call Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (error) {
        toast.error("Login failed", {
          description: error.message
        });
        
        // Log failed login
        logSecurityEvent('login_failed', { 
          email: values.email, 
          reason: error.message
        });
        return;
      }
      
      if (data.user) {
        // Log successful login
        logSecurityEvent('login_successful', { email: values.email });
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Login error", {
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
          <CardTitle className="text-3xl font-semibold text-white">Welcome back</CardTitle>
          <CardDescription className="text-base text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm text-gray-400">
            Demo credentials: patient@example.com / password123
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm">
          <div className="text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-brand-cyan hover:text-brand-cyan/80 font-medium">
              Register
            </a>
          </div>
          <a href="/forgot-password" className="text-brand-cyan hover:text-brand-cyan/80">
            Forgot your password?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
