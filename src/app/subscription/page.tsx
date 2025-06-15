/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  User,
  Calendar,
  Utensils,
  Shield,
  CheckCircle,
  CreditCard,
  Star,
  Crown,
  Leaf,
  Calculator,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface SubscriptionForm {
  name: string
  phone: string
  plan: "diet" | "protein" | "royal" | ""
  mealTypes: string[]
  deliveryDays: string[]
  allergies: string
}

const plans = [
  {
    id: "diet",
    name: "Diet Plan",
    price: 30000,
    description: "Perfect for weight management with balanced nutrition",
    icon: Leaf,
    features: ["Calorie controlled", "Fresh ingredients", "Nutritionist approved"],
    color: "emerald",
  },
  {
    id: "protein",
    name: "Protein Plan",
    price: 40000,
    description: "High-protein meals for fitness enthusiasts",
    icon: Star,
    features: ["High protein content", "Muscle building support", "Performance focused"],
    color: "orange",
    popular: true,
  },
  {
    id: "royal",
    name: "Royal Plan",
    price: 60000,
    description: "Premium gourmet experience with luxury ingredients",
    icon: Crown,
    features: ["Premium ingredients", "Gourmet preparation", "Exclusive recipes"],
    color: "purple",
  },
]

const mealTypes = [
  { id: "breakfast", name: "Breakfast", icon: "🌅", time: "7:00 - 9:00 AM" },
  { id: "lunch", name: "Lunch", icon: "☀️", time: "12:00 - 2:00 PM" },
  { id: "dinner", name: "Dinner", icon: "🌙", time: "6:00 - 8:00 PM" },
]

const deliveryDays = [
  { id: "monday", name: "Monday", short: "Mon" },
  { id: "tuesday", name: "Tuesday", short: "Tue" },
  { id: "wednesday", name: "Wednesday", short: "Wed" },
  { id: "thursday", name: "Thursday", short: "Thu" },
  { id: "friday", name: "Friday", short: "Fri" },
  { id: "saturday", name: "Saturday", short: "Sat" },
  { id: "sunday", name: "Sunday", short: "Sun" },
]

export default function SubscriptionPage() {

  const {user} = useAuth();

  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState<SubscriptionForm>({
    name: "",
    phone: "",
    plan: "",
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const calculateTotalPrice = () => {
    if (!formData.plan || formData.mealTypes.length === 0 || formData.deliveryDays.length === 0) {
      return 0
    }

    const selectedPlan = plans.find((p) => p.id === formData.plan)
    if (!selectedPlan) return 0

    const planPrice = selectedPlan.price
    const mealTypesCount = formData.mealTypes.length
    const deliveryDaysCount = formData.deliveryDays.length
    const multiplier = 4.3

    return planPrice * mealTypesCount * deliveryDaysCount * multiplier
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Indonesian phone number"
    }

    if (!formData.plan) {
      newErrors.plan = "Please select a meal plan"
    }

    if (formData.mealTypes.length === 0) {
      newErrors.mealTypes = "Please select at least one meal type"
    }

    if (formData.deliveryDays.length === 0) {
      newErrors.deliveryDays = "Please select at least one delivery day"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert(
      `Subscription created successfully!\nTotal: ${formatPrice(calculateTotalPrice())}\nThank you for choosing SEA Catering!`,
    )

    // Reset form
    setFormData({
      name: "",
      phone: "",
      plan: "",
      mealTypes: [],
      deliveryDays: [],
      allergies: "",
    })
  }

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        mealTypes: [...prev.mealTypes, mealType],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        mealTypes: prev.mealTypes.filter((type) => type !== mealType),
      }))
    }
  }

  const handleDeliveryDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        deliveryDays: [...prev.deliveryDays, day],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        deliveryDays: prev.deliveryDays.filter((d) => d !== day),
      }))
    }
  }

  const totalPrice = calculateTotalPrice()

  const router = useRouter()
  if (user == null){
    router.push("/auth/login")
  }

  return (

    <div className="min-h-screen bg-background">
      
      <Navbar/>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20">
        <div className="container">
          <div
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              🎯 Start Your Journey
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Subscribe to
              <span className="text-emerald-600 dark:text-emerald-400"> Healthy Living</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your perfect meal plan and let us deliver fresh, healthy meals right to your doorstep. Customize
              your subscription to fit your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 p-4">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-emerald-600" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <CardDescription>Tell us about yourself</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        Active Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+62 812 3456 7890"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className={`h-12 pl-10 ${errors.phone ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        We&apos;ll use this number for payment confirmations and delivery updates
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Plan Selection */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-orange-600" />
                      <span>Choose Your Plan</span>
                    </CardTitle>
                    <CardDescription>Select the meal plan that fits your goals</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RadioGroup
                      value={formData.plan}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, plan: value as any }))}
                      className="space-y-4"
                    >
                      {plans.map((plan) => {
                        const IconComponent = plan.icon
                        return (
                          <div
                            key={plan.id}
                            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.plan === plan.id
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                                : "border-gray-200 hover:border-emerald-300"
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      plan.color === "emerald"
                                        ? "bg-emerald-100 dark:bg-emerald-900/50"
                                        : plan.color === "orange"
                                          ? "bg-orange-100 dark:bg-orange-900/50"
                                          : "bg-purple-100 dark:bg-purple-900/50"
                                    }`}
                                  >
                                    <IconComponent
                                      className={`h-5 w-5 ${
                                        plan.color === "emerald"
                                          ? "text-emerald-600"
                                          : plan.color === "orange"
                                            ? "text-orange-600"
                                            : "text-purple-600"
                                      }`}
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor={plan.id} className="text-lg font-semibold cursor-pointer">
                                        {plan.name}
                                      </Label>
                                      {plan.popular && (
                                        <Badge className="bg-orange-500 text-white text-xs">Most Popular</Badge>
                                      )}
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-600">
                                      {formatPrice(plan.price)}
                                      <span className="text-sm font-normal text-muted-foreground">/meal</span>
                                    </p>
                                  </div>
                                </div>
                                <p className="text-muted-foreground mb-3">{plan.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {plan.features.map((feature, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </RadioGroup>
                    {errors.plan && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.plan}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Meal Types */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 p-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Utensils className="h-5 w-5 text-emerald-600" />
                      <span>Meal Types</span>
                    </CardTitle>
                    <CardDescription>Choose which meals you&apos;d like delivered (select at least one)</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {mealTypes.map((meal) => (
                        <div
                          key={meal.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                            formData.mealTypes.includes(meal.id)
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                              : "border-gray-200 hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={meal.id}
                              checked={formData.mealTypes.includes(meal.id)}
                              onCheckedChange={(checked) => handleMealTypeChange(meal.id, checked as boolean)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-2xl">{meal.icon}</span>
                                <Label htmlFor={meal.id} className="font-semibold cursor-pointer">
                                  {meal.name}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground">{meal.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.mealTypes && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.mealTypes}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Delivery Days */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <span>Delivery Days</span>
                    </CardTitle>
                    <CardDescription>Select the days you want your meals delivered</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {deliveryDays.map((day) => (
                        <div
                          key={day.id}
                          className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-md text-center ${
                            formData.deliveryDays.includes(day.id)
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <Checkbox
                            id={day.id}
                            checked={formData.deliveryDays.includes(day.id)}
                            onCheckedChange={(checked) => handleDeliveryDayChange(day.id, checked as boolean)}
                            className="mb-2"
                          />
                          <Label htmlFor={day.id} className="block font-semibold cursor-pointer text-sm">
                            {day.short}
                          </Label>
                          <p className="text-xs text-muted-foreground">{day.name}</p>
                        </div>
                      ))}
                    </div>
                    {errors.deliveryDays && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.deliveryDays}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Allergies */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 p-4">
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-emerald-600" />
                      <span>Allergies & Dietary Restrictions</span>
                    </CardTitle>
                    <CardDescription>Let us know about any allergies or dietary preferences (optional)</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Textarea
                      placeholder="Please list any allergies, dietary restrictions, or special preferences..."
                      value={formData.allergies}
                      onChange={(e) => setFormData((prev) => ({ ...prev, allergies: e.target.value }))}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      This helps our chefs prepare meals that are safe and suitable for you
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4">
                      <CardTitle className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5" />
                        <span>Order Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Plan Details */}
                      {formData.plan && (
                        <div>
                          <h4 className="font-semibold mb-2">Selected Plan</h4>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span>{plans.find((p) => p.id === formData.plan)?.name}</span>
                              <span className="font-semibold">
                                {formatPrice(plans.find((p) => p.id === formData.plan)?.price || 0)}/meal
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Meal Types */}
                      {formData.mealTypes.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Meal Types ({formData.mealTypes.length})</h4>
                          <div className="space-y-1">
                            {formData.mealTypes.map((type) => (
                              <div key={type} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                <span>{mealTypes.find((m) => m.id === type)?.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Delivery Days */}
                      {formData.deliveryDays.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Delivery Days ({formData.deliveryDays.length})</h4>
                          <div className="flex flex-wrap gap-1">
                            {formData.deliveryDays.map((day) => (
                              <Badge key={day} variant="secondary" className="text-xs">
                                {deliveryDays.find((d) => d.id === day)?.short}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Price Calculation */}
                      {totalPrice > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">Price Calculation</h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Plan price:</span>
                              <span>{formatPrice(plans.find((p) => p.id === formData.plan)?.price || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Meal types:</span>
                              <span>× {formData.mealTypes.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Delivery days:</span>
                              <span>× {formData.deliveryDays.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly multiplier:</span>
                              <span>× 4.3</span>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Monthly Total:</span>
                            <span className="text-emerald-600">{formatPrice(totalPrice)}</span>
                          </div>
                        </div>
                      )}

                      {totalPrice === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Complete the form to see your total</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting || totalPrice === 0}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Subscribe Now</span>
                          </div>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By subscribing, you agree to our{" "}
                        <Link href="/privacy-terms" className="text-emerald-600 hover:underline">
                          Terms & Privacy Policy
                        </Link>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer/>

    </div>
  )
}