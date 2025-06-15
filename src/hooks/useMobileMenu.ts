import { useState, useEffect } from "react"

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => closeMenu()
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return { isOpen, toggleMenu, closeMenu }
}