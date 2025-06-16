"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function RouteTransitionHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
  }, [pathname, searchParams])

  return null
}