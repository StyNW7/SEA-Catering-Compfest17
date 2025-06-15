"use client"

import { useState, useEffect } from 'react'
import { Leaf, Star, Crown, Utensils, Pause, Play, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface Subscription {
  id: string
  planName: string
  planType: "diet" | "protein" | "royal"
  price: number
  mealTypes: string[]
  deliveryDays: string[]
  status: "active" | "paused" | "cancelled"
  startDate: string
  nextBilling: string
  pausedUntil?: string
}

export default function SubscriptionDashboard() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState("")
  const [pauseStartDate, setPauseStartDate] = useState<Date>()
  const [pauseEndDate, setPauseEndDate] = useState<Date>()

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscriptions')
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
      case "diet": return Leaf
      case "protein": return Star
      case "royal": return Crown
      default: return Utensils
    }
  }

  const getPlanColor = (type: string) => {
    switch (type) {
      case "diet": return "bg-emerald-100 text-emerald-600"
      case "protein": return "bg-orange-100 text-orange-600"
      case "royal": return "bg-purple-100 text-purple-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const handlePauseSubscription = async () => {
    if (!pauseStartDate || !pauseEndDate || !selectedSubscription) return

    try {
      const response = await fetch(`/api/subscriptions/${selectedSubscription}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'paused',
          endDate: pauseEndDate
        })
      })

      if (!response.ok) throw new Error('Failed to pause subscription')

      const updatedSub = await response.json()
      setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id ? updatedSub : sub
      ))
      
      toast.success('Subscription paused successfully')
      setPauseDialogOpen(false)
    } catch (error) {
      toast.error('Failed to pause subscription')
    }
  }

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(`/api/subscriptions/${selectedSubscription}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      })

      if (!response.ok) throw new Error('Failed to cancel subscription')

      const updatedSub = await response.json()
      setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id ? updatedSub : sub
      ))
      
      toast.success('Subscription cancelled')
      setCancelDialogOpen(false)
    } catch (error) {
      toast.error('Failed to cancel subscription')
    }
  }

  const handleReactivateSubscription = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'active',
          endDate: null 
        })
      })

      if (!response.ok) throw new Error('Failed to reactivate subscription')

      const updatedSub = await response.json()
      setSubscriptions(prev => prev.map(sub => 
        sub.id === updatedSub.id ? updatedSub : sub
      ))
      
      toast.success('Subscription reactivated')
    } catch (error) {
      toast.error('Failed to reactivate subscription')
    }
  }

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active')
  const totalMonthlySpend = activeSubscriptions.reduce((sum, sub) => sum + sub.price, 0)

  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Active Plans</h3>
            <p className="text-2xl font-bold">{activeSubscriptions.length}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Monthly Total</h3>
            <p className="text-2xl font-bold">{formatPrice(totalMonthlySpend)}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Next Billing</h3>
            <p className="text-2xl font-bold">
              {activeSubscriptions[0]?.nextBilling 
                ? format(new Date(activeSubscriptions[0].nextBilling), 'MMM dd, yyyy')
                : 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Subscriptions</h2>
        {subscriptions.map(sub => (
          <div key={sub.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${getPlanColor(sub.planType)} p-2 rounded-full`}>
                    {getPlanIcon(sub.planType)({ className: "h-5 w-5" })}
                  </div>
                  <h3 className="text-lg font-semibold">{sub.planName}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sub.status === 'active' ? 'bg-green-100 text-green-600' :
                    sub.status === 'paused' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-4">{formatPrice(sub.price)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Meal Types</h4>
                    <p>{sub.mealTypes.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Delivery Days</h4>
                    <p>{sub.deliveryDays.join(', ')}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {sub.status === 'active' ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedSubscription(sub.id)
                        setPauseDialogOpen(true)
                      }}
                    >
                      <Pause className="h-4 w-4 mr-2" /> Pause
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedSubscription(sub.id)
                        setCancelDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </>
                ) : sub.status === 'paused' ? (
                  <Button 
                    onClick={() => handleReactivateSubscription(sub.id)}
                  >
                    <Play className="h-4 w-4 mr-2" /> Reactivate
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pause Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2">Pause Start Date</h4>
              <Calendar
                mode="single"
                selected={pauseStartDate}
                onSelect={setPauseStartDate}
                disabled={(date) => date < new Date()}
              />
            </div>
            <div>
              <h4 className="mb-2">Pause End Date</h4>
              <Calendar
                mode="single"
                selected={pauseEndDate}
                onSelect={setPauseEndDate}
                disabled={(date) => !pauseStartDate || date <= pauseStartDate}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPauseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePauseSubscription}>
              Confirm Pause
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to cancel this subscription?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              No, Keep It
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}