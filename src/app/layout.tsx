import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEA Catering - Healthy Meals Delivered Across Indonesia",
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
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          {children}
          <Toaster/>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
