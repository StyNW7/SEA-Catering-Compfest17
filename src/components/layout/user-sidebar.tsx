"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { getClientCookie } from "@/utils/cookie"
import { ChefHat, User, CreditCard, CalendarIcon, Settings, Bell, HelpCircle, LogOut, Utensils } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const sidebarItems = [
  { icon: User, label: "Dashboard", href: "/dashboard", active: true },
  { icon: CreditCard, label: "Subscriptions", href: "/dashboard/subscriptions" },
  { icon: CalendarIcon, label: "Delivery Schedule", href: "/dashboard/schedule" },
  { icon: Utensils, label: "Meal History", href: "/dashboard/meals" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings, label: "Account Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
]

interface UserSidebarProps {
  className?: string
}

export function UserSidebar({ className }: UserSidebarProps) {

  const {user, logout} = useAuth();

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
        return;
      }

      await logout(clientCsrfToken)
    } catch (error) {
      console.log("Error : " + error)
    }
  }

  return (
    <div
      className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col ${className}`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">SEA Catering</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/images/placeholder/avatar-1.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={onSubmit}>
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>

    </div>

  )
}