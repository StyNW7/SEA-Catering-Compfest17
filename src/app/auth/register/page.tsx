/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/auth/register/page.tsx

"use client"; // This MUST be the very first line of your client component file

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Eye, EyeOff, Mail, Lock, User, ArrowRight, Utensils, Heart, Star, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for App Router

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/lib/zod-schemas"; // Import your Zod schema
import { toast } from "sonner";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter(); // Correct useRouter import

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "", // This needs to match your Zod schema and Prisma model (name or fullName)
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName, // Map fullName from form to 'name' for your Prisma User model
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      toast("Registration Successful!",{
        description: "You can now log in with your new account.",
      })

      router.push("/auth/login"); // Redirect after successful registration

    } catch (error: any) {

      console.error("Registration error:", error);

      toast("Registration Failed!",{
        description: "Something went wrong. Please try again.",
      })

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 dark:from-orange-950/20 dark:via-background dark:to-emerald-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-800/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Food Icons */}
        <div className="absolute top-32 right-20 animate-bounce delay-300">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
            <Star className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div className="absolute top-20 left-32 animate-bounce delay-700">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="absolute bottom-40 right-32 animate-bounce delay-500">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
            <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-orange-300/50 dark:bg-orange-600/30 rounded-full animate-ping`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">SEA Catering</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div
          className={`w-full max-w-md transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Join SEA Catering</CardTitle>
              <CardDescription className="text-base">
                Create your account and start your healthy eating journey today
              </CardDescription>
              <Badge className="mx-auto mt-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                🎉 Join 50,000+ happy customers
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> {/* Use react-hook-form's handleSubmit */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      {...register("fullName")} // Register the input with react-hook-form
                      className="pl-10 h-12 border-2 focus:border-orange-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>} {/* Display validation error */}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="pl-10 h-12 border-2 focus:border-orange-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="pl-10 pr-10 h-12 border-2 focus:border-orange-500 transition-colors"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
                  <div className="text-xs text-muted-foreground">Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                    <span className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 mt-1" />
                    <span className="text-sm">I want to receive updates about new meal plans and special offers</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Registering...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-orange-600 hover:text-orange-700 font-medium">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}