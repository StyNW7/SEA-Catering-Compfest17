"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import { useMobileMenu } from "@/hooks/useMobileMenu"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getClientCookie } from "@/utils/cookie"

export function Navbar() {

  const { isOpen, toggleMenu, closeMenu } = useMobileMenu()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscription", label: "Subscription" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact Us" },
  ]

  const [, setIsLoaded] = useState(false)

  const [clientCsrfToken, setClientCsrfToken] = useState<string | undefined>(undefined)
    
  useEffect(() => {
    setIsLoaded(true);
    const token = getClientCookie('x-csrf-token');
    setClientCsrfToken(token);
  }, []);

  const onSubmit = async () => {
    try {

      if (!clientCsrfToken) {
        toast("Registration Failed!", {
          description: "CSRF token not available. Please refresh the page.",
        });
        return;
      }

      await logout(clientCsrfToken)
      toast.success("Logout Succeed!")
    } catch (error) {
      toast.error("Logout Failed!", {
        description: error instanceof Error ? error.message : "Invalid credentials",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            SEA Catering
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-600",
                pathname === link.href ? "text-emerald-600" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        {user ? (
          <div className="hidden md:flex items-center space-x-4">

            {user.role === "ADMIN" ? (
              <Link href="/admin">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Admin Dashboard
                </Button>
              </Link>
            ) : 

              (
                <Link href="/dashboard">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    User Dashboard
                  </Button>
                </Link>
              )
            
            }

            <Button
              variant="outline" className="text-emerald-600 hover:text-emerald-700 border-emerald-600 hover:bg-emerald-50"
              onClick={onSubmit}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="text-emerald-600 hover:text-emerald-700 border-emerald-600 hover:bg-emerald-50">
                Register
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6"/>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-background border-t overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block py-2 font-medium transition-colors hover:text-emerald-600",
                pathname === link.href ? "text-emerald-600" : "text-foreground"
              )}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-4 border-t">
            {user ? (
              <>

                {user.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className="block w-full py-2 text-center font-medium text-emerald-600"
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                ) : 

                  (
                    <Link
                      href="/dashboard"
                      className="block w-full py-2 text-center font-medium text-emerald-600"
                      onClick={closeMenu}
                    >
                      User Dashboard
                    </Link>
                  )
                
                }

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => {
                    onSubmit()
                    closeMenu()
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block w-full py-2 text-center font-medium text-emerald-600"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block w-full py-2 text-center bg-emerald-400 text-white rounded-md font-medium"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}