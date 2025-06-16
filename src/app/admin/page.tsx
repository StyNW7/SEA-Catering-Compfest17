/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChefHat,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  CalendarIcon,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  RefreshCw,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  Repeat,
  Crown,
  Pause,
  X,
} from "lucide-react"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface DateRange {
  from: Date
  to: Date
}

// Types
interface MetricCardProps {
  title: string
  value: string
  change: number
  isCurrency?: boolean
}

interface ChartData {
  month?: string
  date?: string
  name?: string
  revenue?: number
  subscriptions?: number
  active?: number
  new?: number
  cancelled?: number
  value?: number
  color?: string
}

interface DashboardMetrics {
  newSubscriptions: number
  newSubscriptionsChange: number
  mrr: number
  mrrChange: number
  reactivations: number
  reactivationsChange: number
  activeSubscriptions: number
  activeSubscriptionsChange: number
}

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

// Mock data
const revenueData = [
  { month: "Jan", revenue: 45000000, subscriptions: 1200 },
  { month: "Feb", revenue: 52000000, subscriptions: 1350 },
  { month: "Mar", revenue: 48000000, subscriptions: 1280 },
  { month: "Apr", revenue: 61000000, subscriptions: 1520 },
  { month: "May", revenue: 55000000, subscriptions: 1420 },
  { month: "Jun", revenue: 67000000, subscriptions: 1680 },
]

const subscriptionGrowthData = [
  { date: "2024-01-01", active: 1200, new: 45, cancelled: 12 },
  { date: "2024-01-08", active: 1250, new: 62, cancelled: 8 },
  { date: "2024-01-15", active: 1320, new: 78, cancelled: 15 },
  { date: "2024-01-22", active: 1380, new: 85, cancelled: 10 },
  { date: "2024-01-29", active: 1450, new: 92, cancelled: 18 },
]

const planDistributionData = [
  { name: "Diet Plan", value: 45, color: "#10b981" },
  { name: "Protein Plan", value: 35, color: "#f97316" },
  { name: "Royal Plan", value: 20, color: "#8b5cf6" },
]

export default function AdminDashboard() {

  const router = useRouter();
  const {user} = useAuth();

  const [isLoaded, setIsLoaded] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num)
  }

  const [metrics, setMetrics] = useState<DashboardMetrics>({
      newSubscriptions: 0,
      newSubscriptionsChange: 0,
      mrr: 0,
      mrrChange: 0,
      reactivations: 0,
      reactivationsChange: 0,
      activeSubscriptions: 0,
      activeSubscriptionsChange: 0,
    })

  const [revenueData, setRevenueData] = useState<ChartData[]>([])
  const [growthData, setGrowthData] = useState<ChartData[]>([])
  const [planData, setPlanData] = useState<ChartData[]>([])

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    const now = new Date()

    switch (period) {
      case "7d":
        setDateRange({ from: subDays(now, 7), to: now })
        break
      case "30d":
        setDateRange({ from: subDays(now, 30), to: now })
        break
      case "90d":
        setDateRange({ from: subDays(now, 90), to: now })
        break
      case "1y":
        setDateRange({ from: subDays(now, 365), to: now })
        break
      default:
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) })
    }
  }


  // Fetch dashboard metrics
  const fetchMetrics = async () => {
    try {
      if (!dateRange.from || !dateRange.to) return
      
      const from = format(dateRange.from, 'yyyy-MM-dd')
      const to = format(dateRange.to, 'yyyy-MM-dd')

      const response = await fetch(`/api/admin/metrics?from=${from}&to=${to}`)
      if (!response.ok) throw new Error('Failed to fetch metrics')
      
      const data = await response.json()
      setMetrics(data)
    } catch {
      toast('Error',{
        description: 'Failed to load dashboard metrics',
      })
    }
  }

  // Fetch revenue chart data
  const fetchRevenueData = async () => {
    try {
      const response = await fetch('/api/admin/charts/revenue?months=6')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      
      const data = await response.json()
      setRevenueData(data)
    } catch {
      toast('Error',{
        description: 'Failed to load revenue data',
      })
    }
  }

  // Fetch growth chart data
  const fetchGrowthData = async () => {
    try {
      const response = await fetch('/api/admin/charts/growth?days=30')
      if (!response.ok) throw new Error('Failed to fetch growth data')
      
      const data = await response.json()
      setGrowthData(data)
    } catch {
      toast('Error',{
        description: 'Failed to load growth data',
      })
    }
  }

  // Fetch plan distribution data
  const fetchPlanData = async () => {
    try {
      const response = await fetch('/api/admin/charts/plans')
      if (!response.ok) throw new Error('Failed to fetch plan data')
      
      const data = await response.json()
      setPlanData(data)
    } catch {
      toast('Error',{
        description: 'Failed to load plan distribution data',
      })
    }
  }

  // Fetch all data
  const fetchAllData = async () => {
    setIsLoaded(false)
    try {
      await Promise.all([
        fetchMetrics(),
        fetchRevenueData(),
        fetchGrowthData(),
        fetchPlanData()
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoaded(true)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAllData()
  }, [])

  // Refetch metrics when date range changes
  useEffect(() => {
    if (isLoaded) {
      fetchMetrics()
    }
  }, [])

  // Period buttons
  const periodButtons = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
    { label: "1Y", value: "1y" },
    { label: "MTD", value: "mtd" },
  ]

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  if (user == null) {
    router.push("/")
  }

  else if (user?.role === "USER") {
    router.push("/dashboard")
  }

  return (
    
    <div className="min-h-screen bg-background flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
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
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage your catering business</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          {/* Date Range Selector */}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Date Range:</span>
              </div>
              <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to })
                      }
                    }}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Key Metrics */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* New Subscriptions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Subscriptions</p>
                    <p className="text-3xl font-bold text-emerald-600">{formatNumber(metrics.newSubscriptions)}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                      <span className="text-sm text-emerald-600 font-medium">+{metrics.newSubscriptionsChange}%</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Recurring Revenue */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                    <p className="text-3xl font-bold text-orange-600">{formatPrice(metrics.mrr)}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-orange-600 mr-1" />
                      <span className="text-sm text-orange-600 font-medium">+{metrics.mrrChange}%</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reactivations */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reactivations</p>
                    <p className="text-3xl font-bold text-purple-600">{formatNumber(metrics.reactivations)}</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm text-red-600 font-medium">{metrics.reactivationsChange}%</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <Repeat className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                    <p className="text-3xl font-bold text-blue-600">{formatNumber(metrics.activeSubscriptions)}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600 font-medium">+{metrics.activeSubscriptionsChange}%</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div
            className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Revenue Trend */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Revenue Trend</span>
                </CardTitle>
                <CardDescription>Monthly revenue and subscription growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value: number) => `${value / 1000000}M`} />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          name === "revenue" ? formatPrice(value as number) : formatNumber(value as number),
                          name === "revenue" ? "Revenue" : "Subscriptions",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Growth */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>Subscription Growth</span>
                </CardTitle>
                <CardDescription>Active subscriptions growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value: string | number | Date) => format(new Date(value), "MMM dd")} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value: string | number | Date) => format(new Date(value), "MMM dd, yyyy")}
                        formatter={(value: number, name: string) => [
                          formatNumber(value as number),
                          name === "active" ? "Active" : name === "new" ? "New" : "Cancelled",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="active"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="new"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cancelled"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plan Distribution & Recent Activity */}
          <div
            className={`grid lg:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Plan Distribution */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ChefHat className="h-5 w-5 text-purple-600" />
                  <span>Plan Distribution</span>
                </CardTitle>
                <CardDescription>Breakdown of active subscription plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {planData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${value}%`, "Share"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {planData.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                        <span className="text-sm font-medium">{plan.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{plan.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {/* <Card className="col-span-2">

              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest subscription activities and updates</CardDescription>
              </CardHeader>

              <CardContent>

                <div className="space-y-4">
                  {[
                    {
                      type: "new",
                      user: "Sarah Johnson",
                      action: "subscribed to Protein Plan",
                      time: "2 minutes ago",
                      icon: UserPlus,
                      color: "emerald",
                    },
                    {
                      type: "pause",
                      user: "Michael Chen",
                      action: "paused Diet Plan subscription",
                      time: "15 minutes ago",
                      icon: Pause,
                      color: "orange",
                    },
                    {
                      type: "upgrade",
                      user: "Lisa Wong",
                      action: "upgraded to Royal Plan",
                      time: "1 hour ago",
                      icon: Crown,
                      color: "purple",
                    },
                    {
                      type: "reactivate",
                      user: "David Kim",
                      action: "reactivated subscription",
                      time: "2 hours ago",
                      icon: Repeat,
                      color: "blue",
                    },
                    {
                      type: "cancel",
                      user: "Emma Davis",
                      action: "cancelled subscription",
                      time: "3 hours ago",
                      icon: X,
                      color: "red",
                    },
                  ].map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.color === "emerald"
                              ? "bg-emerald-100 dark:bg-emerald-900/20"
                              : activity.color === "orange"
                                ? "bg-orange-100 dark:bg-orange-900/20"
                                : activity.color === "purple"
                                  ? "bg-purple-100 dark:bg-purple-900/20"
                                  : activity.color === "blue"
                                    ? "bg-blue-100 dark:bg-blue-900/20"
                                    : "bg-red-100 dark:bg-red-900/20"
                          }`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${
                              activity.color === "emerald"
                                ? "text-emerald-600"
                                : activity.color === "orange"
                                  ? "text-orange-600"
                                  : activity.color === "purple"
                                    ? "text-purple-600"
                                    : activity.color === "blue"
                                      ? "text-blue-600"
                                      : "text-red-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card> */}

          </div>
        </div>
      </div>
    </div>
  )
}