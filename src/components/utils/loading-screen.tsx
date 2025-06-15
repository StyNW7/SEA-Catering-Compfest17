"use client"

import { useEffect, useState } from "react"
import { ChefHat, Utensils, Heart, Leaf } from "lucide-react"

interface LoadingScreenProps {
  isLoading?: boolean
  message?: string
  key?: string | number  // Add key prop to force reset
}

type DotStyle = {
  top: string
  left: string
  animationDelay: string
  animationDuration: string
}


export default function LoadingScreen({
  isLoading = true,
  message = "Preparing your healthy meals...",
}: LoadingScreenProps) {


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

  
  const [progress, setProgress] = useState(0)
  const [currentIcon, setCurrentIcon] = useState(0)

  const icons = [ChefHat, Utensils, Heart, Leaf]
  const IconComponent = icons[currentIcon]

  useEffect(() => {
    // Reset progress when isLoading changes
    setProgress(0)
    
    if (!isLoading) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 25
      })
    }, 200)

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(iconInterval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-orange-50 dark:from-emerald-950/90 dark:via-background dark:to-orange-950/90 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Particles */}
        {dotStyles.map((style, i) => (
            <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-emerald-300/50 to-orange-300/50 dark:from-emerald-600/30 dark:to-orange-600/30 rounded-full animate-ping"
            style={style}
            />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto p-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full shadow-lg">
            <ChefHat className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">SEA Catering</span>
        </div>

        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-orange-100 dark:from-emerald-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <IconComponent className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-bounce" />
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-spin">
              <div className="w-2 h-2 bg-emerald-500 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-foreground">{message}</h2>
          <p className="text-muted-foreground">We&apos;re crafting something delicious for you...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-muted-foreground mb-8">{Math.round(Math.min(progress, 100))}% Complete</div>

        {/* Loading Steps */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div
            className={`flex items-center space-x-2 transition-opacity duration-300 ${progress > 20 ? "opacity-100" : "opacity-50"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${progress > 20 ? "bg-emerald-500" : "bg-gray-300"} transition-colors`}
            />
            <span>Selecting fresh ingredients...</span>
          </div>
          <div
            className={`flex items-center space-x-2 transition-opacity duration-300 ${progress > 50 ? "opacity-100" : "opacity-50"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${progress > 50 ? "bg-emerald-500" : "bg-gray-300"} transition-colors`}
            />
            <span>Preparing your meal plan...</span>
          </div>
          <div
            className={`flex items-center space-x-2 transition-opacity duration-300 ${progress > 80 ? "opacity-100" : "opacity-50"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${progress > 80 ? "bg-emerald-500" : "bg-gray-300"} transition-colors`}
            />
            <span>Almost ready to serve...</span>
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
          <p className="text-xs text-muted-foreground italic">
            &quot;Good food takes time, but great food is worth the wait!&quot; 🍽️
          </p>
        </div>
      </div>
    </div>
  )
}