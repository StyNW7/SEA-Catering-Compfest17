"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { ChefHat, BarChart3, Users, DollarSign, CalendarIcon, Settings, Bell, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: ChefHat, label: "Meal Plans", href: "/admin/plans" },
  { icon: CalendarIcon, label: "Deliveries", href: "/admin/deliveries" },
  { icon: DollarSign, label: "Revenue", href: "/admin/revenue" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: HelpCircle, label: "Support", href: "/admin/support" },
]

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {

    const {user, logout} = useAuth();

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
        <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          Admin Panel
        </Badge>
      </div>

      {/* Admin Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/images/placeholder/avatar-1.png" />
            <AvatarFallback>AD</AvatarFallback>
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
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}