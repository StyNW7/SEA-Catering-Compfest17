"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CreditCard,
  CalendarIcon,
  Bell,
  Play,
  Pause,
  X,
  CheckCircle,
  Utensils,
  Crown,
  Star,
  Leaf,
  AlertTriangle,
  Edit,
  MoreHorizontal,
  Menu,
  Filter,
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserSidebar } from "@/components/layout/user-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext"

interface Subscription {
  id: string
  planName: string
  planType: "diet" | "protein" | "royal"
  totalPrice: number
  mealTypes: string[]
  deliveryDays: string[]
  status: "active" | "paused" | "cancelled"
  startDate: string
  nextBilling: string
  pausedUntil?: string
}

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_001",
    planName: "Protein Plan",
    planType: "protein",
    totalPrice: 516000,
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    deliveryDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    status: "active",
    startDate: "2024-01-15",
    nextBilling: "2024-02-15",
  },
  {
    id: "sub_002",
    planName: "Diet Plan",
    planType: "diet",
    totalPrice: 387000,
    mealTypes: ["Lunch", "Dinner"],
    deliveryDays: ["Monday", "Wednesday", "Friday", "Sunday"],
    status: "paused",
    startDate: "2023-12-01",
    nextBilling: "2024-02-20",
    pausedUntil: "2024-02-01",
  },
]

export default function UserDashboard() {

  const {user} = useAuth()

  const [isLoaded, setIsLoaded] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<string>("")
  const [pauseStartDate, setPauseStartDate] = useState<Date>()
  const [pauseEndDate, setPauseEndDate] = useState<Date>()

  const [statusFilter, setStatusFilter] = useState<string>("all")


  // Get all subscriptions

  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     try {
  //       const response = await fetch('/api/subscriptions')
  //       if (!response.ok) throw new Error('Failed to fetch')
  //       const data = await response.json()
  //       setSubscriptions(data)
  //       setIsLoaded(true)
  //     } catch (error) {
  //       console.error('Error:', error)
  //       toast.error('Failed to load subscriptions')
  //     }
  //   }

  //   fetchSubscriptions()
  // }, [])
  

  // Get specific user subscriptions only

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`/api/subscriptions/user?userId=${user?.id}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setSubscriptions(data)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error:', error)
        toast.error('Failed to load subscriptions')
      }
    }

    fetchSubscriptions()
  }, [user?.id])


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

  const getPlanIcon = (type: string) => {
    switch (type) {
      case "diet":
        return Leaf
      case "protein":
        return Star
      case "royal":
        return Crown
      default:
        return Utensils
    }
  }

  const getPlanColor = (type: string) => {
    switch (type) {
      case "diet":
        return "emerald"
      case "protein":
        return "orange"
      case "royal":
        return "purple"
      default:
        return "gray"
    }
  }


  const handlePauseSubscription = async () => {
    if (!pauseStartDate || !pauseEndDate || !selectedSubscription) return;

    try {
        const response = await fetch(`/api/subscriptions/${selectedSubscription}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'paused',
            endDate: pauseEndDate
        })
        });

        if (!response.ok) throw new Error('Failed to pause subscription');

        const updatedSub = await response.json();
        
        // Use a single state update with all changes
        setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id 
            ? { 
                ...updatedSub,
                status: "paused",
                pausedUntil: format(pauseEndDate, "yyyy-MM-dd"),
                totalPrice: sub.totalPrice
            } 
            : sub
        ));
        
        toast.success('Subscription paused successfully');
        setPauseDialogOpen(false);
        setPauseStartDate(undefined);
        setPauseEndDate(undefined);
        setSelectedSubscription("");

    } catch {
        toast.error('Failed to pause subscription');
    }
    };

    const handleCancelSubscription = async () => {
    try {
        const response = await fetch(`/api/subscriptions/${selectedSubscription}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
        });

        if (!response.ok) throw new Error('Failed to cancel subscription');

        const updatedSub = await response.json();
        
        setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id 
            ? { 
                ...updatedSub,
                status: "cancelled",
                totalPrice: sub.totalPrice
            } 
            : sub
        ));

        setCancelDialogOpen(false);
        setSelectedSubscription("");
        toast.success('Subscription cancelled');
        
    } catch {
        toast.error('Failed to cancel subscription');
    }
    };

    const handleReactivateSubscription = async (subscriptionId: string) => {
    try {
        const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            status: 'active',
            endDate: null 
        })
        });

        if (!response.ok) throw new Error('Failed to reactivate subscription');

        const updatedSub = await response.json();
        
        setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id 
            ? { 
                ...updatedSub,
                status: "active",
                pausedUntil: undefined,
                totalPrice: sub.totalPrice
            } 
            : sub
        ));
        
        toast.success('Subscription reactivated');
        
    } catch {
        toast.error('Failed to reactivate subscription');
    }
    };

  // Filter subscriptions based on status
  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (statusFilter === "all") return true
    return sub.status === statusFilter
  })

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active")
  const totalMonthlySpend = activeSubscriptions.reduce((sum, sub) => sum + sub.totalPrice, 0)

  const getStatusCount = (status: string) => {
    if (status === "all") return subscriptions.length
    return subscriptions.filter((sub) => sub.status === status).length
  }

  return (

    <div className="min-h-screen bg-background flex">
        
      {/* Desktop Sidebar */}
      <UserSidebar className="hidden lg:flex" />

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <UserSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your meal subscriptions and preferences</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href={"/subscription"}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Utensils className="h-4 w-4 mr-2" />
                    New Subscription
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
          {/* Stats Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                    <p className="text-2xl lg:text-3xl font-bold text-emerald-600">{activeSubscriptions.length}</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                    <p className="text-xl lg:text-3xl font-bold text-orange-600">{formatPrice(totalMonthlySpend)}</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Delivery</p>
                    <p className="text-2xl lg:text-3xl font-bold text-purple-600">Today</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Filters and List */}

          <div
            className={`transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold">Your Subscriptions</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium hidden sm:inline">Filter by status:</span>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All ({getStatusCount("all")})</SelectItem>
                    <SelectItem value="active">Active ({getStatusCount("active")})</SelectItem>
                    <SelectItem value="paused">Paused ({getStatusCount("paused")})</SelectItem>
                    <SelectItem value="cancelled">Cancelled ({getStatusCount("cancelled")})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredSubscriptions.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No subscriptions found</h3>
                <p className="text-muted-foreground mb-4">
                  {statusFilter === "all"
                    ? "You don't have any subscriptions yet."
                    : `You don't have any ${statusFilter} subscriptions.`}
                </p>
                <Link href={"/subscription"}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Utensils className="h-4 w-4 mr-2" />
                    Create New Subscription
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-4 lg:gap-6">
                {filteredSubscriptions.map((subscription, index) => {
                const PlanIcon = getPlanIcon(subscription.planType)
                const planColor = getPlanColor(subscription.planType)

                return (
                  <Card
                    key={subscription.id}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      subscription.status === "cancelled" ? "opacity-60" : ""
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                     <div className="p-4 lg:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                                  planColor === "emerald"
                                    ? "bg-emerald-100 dark:bg-emerald-900/20"
                                    : planColor === "orange"
                                      ? "bg-orange-100 dark:bg-orange-900/20"
                                      : "bg-purple-100 dark:bg-purple-900/20"
                                }`}
                              >
                                <PlanIcon
                                  className={`h-8 w-8 ${
                                    planColor === "emerald"
                                      ? "text-emerald-600"
                                      : planColor === "orange"
                                        ? "text-orange-600"
                                        : "text-purple-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{subscription.planName}</h3>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">
                                  {formatPrice(subscription.totalPrice)}
                                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  subscription.status === "active"
                                    ? "default"
                                    : subscription.status === "paused"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  subscription.status === "active"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                    : ""
                                }
                              >
                                {subscription.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                                {subscription.status === "paused" && <Pause className="h-3 w-3 mr-1" />}
                                {subscription.status === "cancelled" && <X className="h-3 w-3 mr-1" />}
                                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                              </Badge>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48" align="end">
                                  <div className="space-y-1">
                                    <Button variant="ghost" size="sm" className="w-full justify-start">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Plan
                                    </Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start">
                                      <CalendarIcon className="h-4 w-4 mr-2" />
                                      View Schedule
                                    </Button>
                                    <Separator />
                                    {subscription.status === "active" && (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="w-full justify-start text-orange-600"
                                          onClick={() => {
                                            setSelectedSubscription(subscription.id)
                                            setPauseDialogOpen(true)
                                          }}
                                        >
                                          <Pause className="h-4 w-4 mr-2" />
                                          Pause
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="w-full justify-start text-red-600"
                                          onClick={() => {
                                            setSelectedSubscription(subscription.id)
                                            setCancelDialogOpen(true)
                                          }}
                                        >
                                          <X className="h-4 w-4 mr-2" />
                                          Cancel
                                        </Button>
                                      </>
                                    )}
                                    {subscription.status === "paused" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-emerald-600"
                                        onClick={() => handleReactivateSubscription(subscription.id)}
                                      >
                                        <Play className="h-4 w-4 mr-2" />
                                        Reactivate
                                      </Button>
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          {/* Subscription Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                            <div>
                              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">MEAL TYPES</h4>
                              <div className="space-y-1">
                                {subscription.mealTypes.map((meal, mealIndex) => (
                                  <div key={mealIndex} className="flex items-center space-x-2">
                                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                                    <span className="text-sm">{meal}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">DELIVERY DAYS</h4>
                              <div className="flex flex-wrap gap-1">
                                {subscription.deliveryDays.map((day, dayIndex) => (
                                  <Badge key={dayIndex} variant="outline" className="text-xs">
                                    {day.slice(0, 3)}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">BILLING INFO</h4>
                              <div className="space-y-1 text-sm">
                                <div>Started: {new Date(subscription.startDate).toLocaleDateString()}</div>
                                <div>
                                  Next billing:{" "}
                                  {subscription.status === "active"
                                    ? new Date(subscription.nextBilling).toLocaleDateString()
                                    : "N/A"}
                                </div>
                                {subscription.pausedUntil && (
                                  <div className="text-orange-600">
                                    Paused until: {new Date(subscription.pausedUntil).toLocaleDateString()}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

              <Link href={"/subscription"}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Utensils className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Add New Plan</h3>
                    <p className="text-sm text-muted-foreground">Subscribe to additional meal plans</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={"/menu"}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <CalendarIcon className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Check Menu Plan</h3>
                    <p className="text-sm text-muted-foreground">Explore SEA Catering Menu Plan</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={"/contact"}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Bell className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Get Support</h3>
                    <p className="text-sm text-muted-foreground">Contact our customer service team</p>
                  </CardContent>
                </Card>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Pause Subscription Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Pause className="h-5 w-5 text-orange-600" />
              <span>Pause Subscription</span>
            </DialogTitle>
            <DialogDescription>
              Select the date range for pausing your subscription. No charges will be applied during this period.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Pause Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pauseStartDate ? format(pauseStartDate, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pauseStartDate}
                    onSelect={setPauseStartDate}
                    disabled={(date: Date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                    }}
                    />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Pause End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pauseEndDate ? format(pauseEndDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pauseEndDate}
                    onSelect={setPauseEndDate}
                    disabled={(date: Date) => {
                        if (!pauseStartDate) return true; 
                        return date <= pauseStartDate;
                    }}
                    />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={() => setPauseDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handlePauseSubscription}
                disabled={!pauseStartDate || !pauseEndDate}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Pause Subscription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Cancel Subscription</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this subscription? This action cannot be undone, but you can always
              subscribe again later.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">What happens when you cancel:</h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Your subscription will end immediately</li>
                <li>• No future charges will be applied</li>
                <li>• You&apos;ll lose access to scheduled deliveries</li>
                <li>• You can resubscribe anytime</li>
              </ul>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={() => setCancelDialogOpen(false)} className="flex-1">
                Keep Subscription
              </Button>
              <Button
                onClick={handleCancelSubscription}
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}