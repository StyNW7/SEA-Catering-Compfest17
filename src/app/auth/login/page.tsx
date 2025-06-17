/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Eye, EyeOff, Mail, Lock, ArrowRight, Leaf, Utensils, Heart, Loader2Icon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner";
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { loginSchema } from "@/lib/zod-schemas"
import { useAuth } from "@/context/AuthContext"

type LoginFormValues = z.infer<typeof loginSchema>;

type DotStyle = {
  top: string
  left: string
  animationDelay: string
  animationDuration: string
}

// Helper function to get a cookie value on the client-side
function getClientCookie(name: string): string | undefined {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
}


export default function LoginPage() {

  const {user} = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const [isLoaded, setIsLoaded] = useState(false)
  const [, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const [dotStyles, setDotStyles] = useState<DotStyle[]>([])

  useEffect(() => {
    const newStyles = Array.from({ length: 12 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }))
    setDotStyles(newStyles)
  }, [])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const { login } = useAuth()

  useEffect(() => {
    setIsLoaded(true)
  }, [])


  const [clientCsrfToken, setClientCsrfToken] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      setIsLoaded(true);
      const token = getClientCookie('x-csrf-token');
      setClientCsrfToken(token);
    }, []);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {

      if (!clientCsrfToken) {
        toast("Registration Failed!", {
          description: "CSRF token not available. Please refresh the page.",
        });
        return;
      }

      await login(data.email, data.password, clientCsrfToken)
      toast.success("Login Successful!", {
        description: "You are now logged in",
      })
      router.push("/")
    } catch (error) {
      toast.error("Login Failed!", {
        description: error instanceof Error ? error.message : "Invalid credentials",
      })
    }
  }


  if (user){
    router.push("/")
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 dark:from-emerald-950/20 dark:via-background dark:to-orange-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-800/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Food Icons */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
            <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-500">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Floating Particles */}
         {dotStyles.map((style, i) => (
            <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-emerald-300/50 to-orange-300/50 dark:from-emerald-600/30 dark:to-orange-600/30 rounded-full animate-ping"
            style={style}
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
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
              <CardDescription className="text-base">
                Sign in to your SEA Catering account to continue your healthy journey
              </CardDescription>
              <Badge className="mx-auto mt-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                🌟 Trusted by 50,000+ customers
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      className="pl-10 h-12 border-2 focus:border-emerald-500 transition-colors"
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
                      className="pl-10 pr-10 h-12 border-2 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Sign up for free
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}