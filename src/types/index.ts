export interface Testimonial {
  id?: string
  name: string
  location: string
  rating: number
  message: string
  date?: string | Date
  avatar?: string
  verified: boolean
  plan: string
  createdAt: string | Date
  updatedAt?: string | Date
}

export interface MealPlan {
  id: string
  name: string
  price: string
  originalPrice?: string
  description: string
  image: string
  category: "weight-loss" | "muscle-building" | "balanced" | "premium"
  popular?: boolean
  features: string[]
  duration: string
  mealsPerDay: number
  calories: string
  proteinPercent: string
  carbsPercent: string
  fatsPercent: string
  includes: string[]
  benefits: string[]
  sampleMeals: string[]
}

export interface SubscriptionForm {
  totalprice: number
  name: string
  phone: string
  plan: "diet" | "protein" | "royal" | ""
  mealTypes: string[]
  deliveryDays: string[]
  allergies: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  name: string
  phone: string
  mealTypes: string[]
  deliveryDays: string[]
  allergies?: string | null
  totalPrice: number
  startDate: Date
  endDate?: Date | null
  status: string
  createdAt: Date
  updatedAt: Date
  mealPlan?: MealPlan
  user?: {
    id: string
    name: string | null
    email: string
  }
}