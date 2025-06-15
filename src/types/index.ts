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

// export interface MealPlan {
//   id: string
//   name: string
//   price: string
//   originalPrice?: string
//   description: string
//   image: string
//   category: "weight-loss" | "muscle-building" | "balanced" | "premium"
//   popular?: boolean
//   features: string[]
//   additionalInfo: {
//     duration: string
//     mealsPerDay: number
//     calories: string
//     macros: {
//       protein: string
//       carbs: string
//       fats: string
//     }
//     includes: string[]
//     benefits: string[]
//     sampleMeals: string[]
//   }
// }

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