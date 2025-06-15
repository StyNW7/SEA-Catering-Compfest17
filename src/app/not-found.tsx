"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ChefHat, Home, Search, ArrowLeft, Utensils, Heart, Star } from "lucide-react"
import Link from "next/link"

type DotStyle = {
  top: string
  left: string
  animationDelay: string
  animationDuration: string
}

function NotFoundContent() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-orange-50 to-emerald-50 dark:from-emerald-950/20 dark:via-orange-950/20 dark:to-emerald-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Interactive Mouse Follower */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-r from-emerald-200/30 to-orange-200/30 dark:from-emerald-800/20 dark:to-orange-800/20 rounded-full blur-2xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />

        {/* Floating Food Icons */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shadow-lg">
            <Utensils className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="absolute top-32 right-32 animate-bounce delay-700">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-500">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shadow-lg">
            <Star className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
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
          className={`text-center max-w-2xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-gradient-to-r from-emerald-400 via-orange-400 to-emerald-400 bg-clip-text animate-pulse">
              404
            </div>

            {/* Floating Chef Hat */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <ChefHat className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Oops! This Page is Not on Our Menu</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Looks like you&apos;ve wandered into uncharted culinary territory. The page you&apos;re looking for seems to have
              been eaten by our hungry customers!
            </p>

            {/* Interactive Elements */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

              <Link href={"/"}>
                <div className="group p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Home className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Go Home</h3>
                    <p className="text-sm text-muted-foreground mt-2">Return to our delicious homepage</p>
                </div>
              </Link>

              <Link href={"/"}>
                <div className="group p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Search className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-orange-600 dark:text-orange-400">Search Menu</h3>
                    <p className="text-sm text-muted-foreground mt-2">Find what you&apos;re craving</p>
                </div>
              </Link>

              <Link href={"/"}>
                <div className="group p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Utensils className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Browse Meals</h3>
                    <p className="text-sm text-muted-foreground mt-2">Explore our healthy options</p>
                </div>
              </Link>

              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 px-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/menu">
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Browse Menu
              </Link>
            </Button>
          </div>

          {/* Fun Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
            <p className="text-muted-foreground italic">
              &quot;Don&apos;t worry, even our best chefs sometimes lose a recipe. Let&apos;s get you back to the good stuff!&quot;
              <span className="block mt-2 text-emerald-600 dark:text-emerald-400 font-medium">
                - Stanley, CEO of SEA Catering
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function NotFoundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  )
}