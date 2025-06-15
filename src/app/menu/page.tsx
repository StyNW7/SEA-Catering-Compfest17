"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChefHat,
  Clock,
  Users,
  CheckCircle,
  Star,
  Truck,
  Shield,
  Leaf,
  Dumbbell,
  Heart,
  Zap,
  Award,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { toast } from "sonner"
import { MealPlan } from "@/types"
import Link from "next/link"

// const mealPlans: MealPlan[] = [
//   {
//     id: "weight-loss-basic",
//     name: "Weight Loss Starter",
//     price: "Rp 150,000",
//     originalPrice: "Rp 180,000",
//     description:
//       "Perfect for beginners looking to start their weight loss journey with portion-controlled, nutritious meals.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "weight-loss",
//     features: ["Calorie controlled", "High protein", "Low carb options", "Nutritionist approved"],
//     additionalInfo: {
//       duration: "7 days minimum",
//       mealsPerDay: 3,
//       calories: "1200-1400 per day",
//       macros: {
//         protein: "35%",
//         carbs: "30%",
//         fats: "35%",
//       },
//       includes: ["Breakfast", "Lunch", "Dinner", "Nutrition guide", "Progress tracking"],
//       benefits: ["Sustainable weight loss", "Improved metabolism", "Better energy levels", "Reduced cravings"],
//       sampleMeals: ["Grilled chicken salad", "Quinoa bowl with vegetables", "Baked salmon with asparagus"],
//     },
//   },
//   {
//     id: "muscle-building-pro",
//     name: "Muscle Building Pro",
//     price: "Rp 200,000",
//     description: "High-protein meals designed for athletes and fitness enthusiasts looking to build lean muscle mass.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "muscle-building",
//     popular: true,
//     features: ["High protein content", "Post-workout meals", "Balanced macros", "Performance focused"],
//     additionalInfo: {
//       duration: "14 days minimum",
//       mealsPerDay: 4,
//       calories: "2200-2500 per day",
//       macros: {
//         protein: "40%",
//         carbs: "35%",
//         fats: "25%",
//       },
//       includes: ["4 meals daily", "Pre/post workout snacks", "Protein supplements", "Training nutrition guide"],
//       benefits: ["Muscle growth", "Faster recovery", "Increased strength", "Better performance"],
//       sampleMeals: ["Protein-packed breakfast bowl", "Lean beef with sweet potato", "Greek yogurt parfait"],
//     },
//   },
//   {
//     id: "balanced-family",
//     name: "Balanced Family Plan",
//     price: "Rp 120,000",
//     description: "Well-rounded meals perfect for families who want to maintain a healthy lifestyle together.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "balanced",
//     features: ["Variety of cuisines", "Balanced nutrition", "Family friendly", "Flexible portions"],
//     additionalInfo: {
//       duration: "7 days minimum",
//       mealsPerDay: 3,
//       calories: "1800-2000 per day",
//       macros: {
//         protein: "25%",
//         carbs: "45%",
//         fats: "30%",
//       },
//       includes: ["Family-sized portions", "Kid-friendly options", "Variety menu", "Meal planning guide"],
//       benefits: ["Balanced nutrition", "Family bonding", "Convenient meals", "Healthy habits"],
//       sampleMeals: ["Indonesian gado-gado", "Grilled fish with rice", "Vegetable stir-fry"],
//     },
//   },
//   {
//     id: "premium-gourmet",
//     name: "Premium Gourmet",
//     price: "Rp 300,000",
//     description: "Luxury dining experience with chef-crafted gourmet meals using premium ingredients.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "premium",
//     features: ["Premium ingredients", "Chef-crafted", "Gourmet experience", "Exclusive recipes"],
//     additionalInfo: {
//       duration: "3 days minimum",
//       mealsPerDay: 3,
//       calories: "2000-2200 per day",
//       macros: {
//         protein: "30%",
//         carbs: "40%",
//         fats: "30%",
//       },
//       includes: ["Premium ingredients", "Chef presentation", "Wine pairing suggestions", "Exclusive recipes"],
//       benefits: ["Gourmet experience", "Premium quality", "Unique flavors", "Restaurant-quality"],
//       sampleMeals: ["Wagyu beef tenderloin", "Lobster thermidor", "Truffle risotto"],
//     },
//   },
//   {
//     id: "keto-advanced",
//     name: "Keto Advanced",
//     price: "Rp 180,000",
//     description: "Strict ketogenic diet plan for those committed to achieving and maintaining ketosis.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "weight-loss",
//     features: ["Ultra low carb", "High healthy fats", "Ketosis support", "Expert guidance"],
//     additionalInfo: {
//       duration: "14 days minimum",
//       mealsPerDay: 3,
//       calories: "1600-1800 per day",
//       macros: {
//         protein: "25%",
//         carbs: "5%",
//         fats: "70%",
//       },
//       includes: ["Keto-friendly meals", "MCT oil supplements", "Ketone testing strips", "Keto guide"],
//       benefits: ["Rapid fat loss", "Mental clarity", "Stable energy", "Appetite control"],
//       sampleMeals: ["Avocado egg bowl", "Salmon with cauliflower", "Coconut curry chicken"],
//     },
//   },
//   {
//     id: "vegan-power",
//     name: "Vegan Power Plan",
//     price: "Rp 140,000",
//     description: "Plant-based nutrition packed with protein and essential nutrients for optimal health.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "balanced",
//     features: ["100% plant-based", "High protein", "Nutrient dense", "Environmentally friendly"],
//     additionalInfo: {
//       duration: "7 days minimum",
//       mealsPerDay: 3,
//       calories: "1800-2000 per day",
//       macros: {
//         protein: "20%",
//         carbs: "55%",
//         fats: "25%",
//       },
//       includes: ["Plant-based proteins", "Superfood ingredients", "B12 supplements", "Vegan nutrition guide"],
//       benefits: ["Improved digestion", "Lower inflammation", "Environmental impact", "Ethical eating"],
//       sampleMeals: ["Quinoa Buddha bowl", "Lentil curry", "Chickpea protein salad"],
//     },
//   },
// ]

const categories = [
  { id: "all", name: "All Plans", icon: ChefHat },
  { id: "weight-loss", name: "Weight Loss", icon: Target },
  { id: "muscle-building", name: "Muscle Building", icon: Dumbbell },
  { id: "balanced", name: "Balanced", icon: Heart },
  { id: "premium", name: "Premium", icon: Award },
]

export default function MealPlansPage() {

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [, setLoading] = useState(true)
  
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch('/api/meal-plans')
        if (!response.ok) throw new Error('Failed to fetch meal plans')
        const data = await response.json()
        setMealPlans(data)
      } catch {
        toast('Error',{
          description: 'Failed to load meal plans',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlans()
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredPlans =
    selectedCategory === "all" ? mealPlans : mealPlans.filter((plan) => plan.category === selectedCategory)

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
              🍽️ Choose Your Perfect Plan
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meal Plans Designed for
              <span className="text-emerald-600 dark:text-emerald-400"> Your Goals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From weight loss to muscle building, we have the perfect meal plan to help you achieve your health and
              fitness goals.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">6+</div>
                <div className="text-sm text-muted-foreground">Meal Plans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-12 px-6 ${
                    selectedCategory === category.id
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meal Plans Grid */}

      <section className="py-20">

        <div className="container">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular ? "ring-2 ring-emerald-500 scale-105" : ""
                } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-emerald-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {plan.originalPrice && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-orange-500 text-white">
                      Save{" "}
                      {Math.round(
                        (1 -
                          Number.parseInt(plan.price.replace(/\D/g, "")) /
                            Number.parseInt(plan.originalPrice.replace(/\D/g, ""))) *
                          100,
                      )}
                      %
                    </Badge>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <Image
                    src={plan.image || "/placeholder.svg"}
                    alt={plan.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                      {plan.name}
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">{plan.price}</div>
                      {plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}</div>
                      )}
                      <div className="text-xs text-muted-foreground">per day</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-2">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">

                    <Dialog>

                      <DialogTrigger asChild>

                        <Button
                          variant="outline"
                          className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                        >
                          See More Details
                        </Button>

                      </DialogTrigger>

                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">

                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center space-x-2">
                            <span>{plan.name}</span>
                            {plan.popular && (
                              <Badge className="bg-emerald-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </DialogTitle>
                          <DialogDescription className="text-base">{plan.description}</DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 mt-6">
                          <div className="space-y-6">
                            <Image
                              src={plan.image || "/placeholder.svg"}
                              alt={plan.name}
                              width={400}
                              height={300}
                              className="w-full h-64 object-cover rounded-lg"
                            />

                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                                <div>
                                  <div className="text-3xl font-bold text-emerald-600">{plan.price}</div>
                                  {plan.originalPrice && (
                                    <div className="text-sm text-muted-foreground line-through">
                                      {plan.originalPrice}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                  <div>per day</div>
                                  <div>{plan.duration}</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-muted/50 rounded-lg">
                                  <Clock className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                                  <div className="font-semibold">{plan.mealsPerDay}</div>
                                  <div className="text-xs text-muted-foreground">Meals/Day</div>
                                </div>
                                <div className="text-center p-3 bg-muted/50 rounded-lg">
                                  <Zap className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                                  <div className="font-semibold">{plan.calories}</div>
                                  <div className="text-xs text-muted-foreground">Calories</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                                <TabsTrigger value="meals">Meals</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center">
                                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                                    What&apos;s Included
                                  </h4>
                                  <ul className="space-y-1">
                                    {plan.includes.map((item, index) => (
                                      <li key={index} className="flex items-center space-x-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center">
                                    <Calendar className="h-4 w-4 text-emerald-600 mr-2" />
                                    Plan Details
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Duration:</span>
                                      <span className="font-medium">{plan.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Meals per day:</span>
                                      <span className="font-medium">{plan.mealsPerDay}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Daily calories:</span>
                                      <span className="font-medium">{plan.calories}</span>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="nutrition" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center">
                                    <TrendingUp className="h-4 w-4 text-emerald-600 mr-2" />
                                    Macro Distribution
                                  </h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Protein</span>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: plan.proteinPercent }}
                                          />
                                        </div>
                                        <span className="text-sm font-medium">
                                          {plan.proteinPercent}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Carbs</span>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: plan.carbsPercent }}
                                          />
                                        </div>
                                        <span className="text-sm font-medium">{plan.carbsPercent}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Fats</span>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: plan.fatsPercent }}
                                          />
                                        </div>
                                        <span className="text-sm font-medium">{plan.fatsPercent}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="benefits" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center">
                                    <Heart className="h-4 w-4 text-emerald-600 mr-2" />
                                    Health Benefits
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {plan.benefits.map((benefit, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center space-x-2 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg"
                                      >
                                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                        <span className="text-sm">{benefit}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="meals" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center">
                                    <ChefHat className="h-4 w-4 text-emerald-600 mr-2" />
                                    Sample Meals
                                  </h4>
                                  <div className="space-y-2">
                                    {plan.sampleMeals.map((meal, index) => (
                                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                                          <span className="text-sm font-medium text-emerald-600">{index + 1}</span>
                                        </div>
                                        <span className="text-sm">{meal}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <div className="flex space-x-3 pt-4">
                              <Link href={"/subscription"}>
                                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                                Choose This Plan
                              </Button>
                              </Link>
                              <Button variant="outline" className="border-emerald-600 text-emerald-600">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Link href={"/subscription"}>
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">Choose Plan</Button>
                    </Link>

                  </div>

                </CardContent>

              </Card>

            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SEA Catering?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re committed to providing you with the best meal experience possible
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Fresh Ingredients",
                description: "Sourced daily from trusted local suppliers",
              },
              {
                icon: Shield,
                title: "Food Safety",
                description: "Certified kitchens with highest safety standards",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Delivered fresh within 24 hours",
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Nutritionists and chefs at your service",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Healthy Journey?</h2>
            <p className="text-xl text-emerald-100">
              Choose your perfect meal plan and let us take care of your nutrition while you focus on your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/subscription"}>
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8">
                  Get Started Today
                </Button>
              </Link>
              <Link href={"/contact"}>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10 px-8 hover:text-white">
                  Contact Nutritionist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer/>

    </div>
  )
}