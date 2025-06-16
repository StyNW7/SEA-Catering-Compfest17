"use client"

import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import LoadingScreen from "@/components/utils/loading-screen"

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {

  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Preparing your healthy meals...")
  const [loadingKey, setLoadingKey] = useState(0) // Add key state
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const messages = [
    "Preparing your healthy meals...",
    "Selecting the freshest ingredients...",
    "Crafting your perfect meal plan...",
    "Getting your order ready...",
    "Almost done cooking...",
  ]

  useEffect(() => {
    // Increment key to force LoadingScreen reset
    setLoadingKey(prev => prev + 1)
    
    const newMessage = messages[Math.floor(Math.random() * messages.length)]
    setLoadingMessage(newMessage)
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        message={loadingMessage}
        key={loadingKey} // Pass key to force remount
      />
      {children}
    </>
  )
}