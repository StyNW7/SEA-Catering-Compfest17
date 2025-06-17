import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/AuthContext"
import LoadingWrapper from "@/components/utils/loading-wrapper"
import RouteTransitionHandler from "@/components/utils/RouteTransitionHandler"
import { Suspense } from "react"

// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEA Catering",
  description:
    "Customizable healthy meal plans crafted by expert chefs and delivered fresh to your doorstep. Join thousands who've transformed their eating habits with SEA Catering.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <AuthProvider>

          <Suspense>
            <LoadingWrapper>
              <RouteTransitionHandler />
              {children}
              <Toaster/>
            </LoadingWrapper>
          </Suspense>

        </AuthProvider>

      </body>
    </html>
  )
}
