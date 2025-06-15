"use client"

import { useState } from "react"
import LoadingScreen from "@/components/utils/loading-screen"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoadingDemoPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Preparing your healthy meals...")

  const messages = [
    "Preparing your healthy meals...",
    "Selecting the freshest ingredients...",
    "Crafting your perfect meal plan...",
    "Getting your order ready...",
    "Almost done cooking...",
  ]

  const startLoading = () => {
    setIsLoading(true)
    setLoadingMessage(messages[Math.floor(Math.random() * messages.length)])

    // Simulate loading completion
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Loading Screen Demo</CardTitle>
            <CardDescription>Click the button below to see the beautiful loading screen in action</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={startLoading} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Loading..." : "Show Loading Screen"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <LoadingScreen isLoading={isLoading} message={loadingMessage} />

    </div>

  )
}