"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function RouteTransitionHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This empty effect just triggers re-renders on route changes
  }, [pathname, searchParams])

  return null
}