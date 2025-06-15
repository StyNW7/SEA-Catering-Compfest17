"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Users,
  TrendingUp,
  Heart,
  Send,
  Quote,
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  message: string
  date: string
  avatar?: string
  verified: boolean
  plan: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Andi Pratama",
    location: "Jakarta",
    rating: 5,
    message:
      "SEA Catering has completely transformed my eating habits! The Weight Loss plan helped me lose 15kg in 6 months. The meals are delicious, nutritious, and always delivered on time. I especially love the variety - never gets boring!",
    date: "2024-01-15",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Weight Loss Starter",
  },
  {
    id: "2",
    name: "Sari Dewi",
    location: "Surabaya",
    rating: 5,
    message:
      "As a working mom, SEA Catering is a lifesaver! The Family Plan saves me hours of meal prep while ensuring my kids eat healthy. The customer service is exceptional, and they accommodate all our dietary preferences perfectly.",
    date: "2024-01-10",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Balanced Family Plan",
  },
  {
    id: "3",
    name: "Budi Santoso",
    location: "Bandung",
    rating: 5,
    message:
      "The Muscle Building Pro plan is exactly what I needed for my fitness goals. High-quality proteins, perfect portions, and the post-workout meals are incredible. Gained 8kg of lean muscle in 4 months!",
    date: "2024-01-08",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Muscle Building Pro",
  },
  {
    id: "4",
    name: "Maya Sinta",
    location: "Medan",
    rating: 4,
    message:
      "Love the Premium Gourmet plan! The presentation is restaurant-quality and the flavors are amazing. Only wish there were more Indonesian fusion options, but overall very satisfied with the service.",
    date: "2024-01-05",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Premium Gourmet",
  },
  {
    id: "5",
    name: "Rizki Hakim",
    location: "Yogyakarta",
    rating: 5,
    message:
      "The Keto Advanced plan helped me achieve ketosis quickly and safely. Lost 12kg in 3 months and feel more energetic than ever. The meal variety keeps me motivated, and the nutritionist support is invaluable.",
    date: "2024-01-03",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Keto Advanced",
  },
  {
    id: "6",
    name: "Indira Putri",
    location: "Bali",
    rating: 5,
    message:
      "Switched to the Vegan Power Plan 6 months ago and couldn't be happier! The plant-based meals are creative, filling, and nutritious. My digestion improved significantly, and I have more energy throughout the day.",
    date: "2024-01-01",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Vegan Power Plan",
  },
  {
    id: "7",
    name: "Fajar Nugroho",
    location: "Semarang",
    rating: 4,
    message:
      "Great service overall! The meals are tasty and delivery is always punctual. Sometimes I wish for more spicy options, but the quality is consistently good. Customer support is very responsive.",
    date: "2023-12-28",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Balanced Family Plan",
  },
  {
    id: "8",
    name: "Lestari Wulan",
    location: "Makassar",
    rating: 5,
    message:
      "SEA Catering made healthy eating so convenient! The Weight Loss plan fits perfectly into my busy schedule. Lost 10kg and gained so much confidence. The nutritionist consultations are a great bonus!",
    date: "2023-12-25",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    plan: "Weight Loss Starter",
  },
]

const ITEMS_PER_PAGE = 6

export default function TestimonialsPage() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    location: "",
    message: "",
    rating: 5,
    plan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)

    // Auto-rotate featured testimonials
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % Math.min(testimonials.length, 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = ratingFilter === "all" || testimonial.rating.toString() === ratingFilter

    return matchesSearch && matchesRating
  })

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Featured testimonials (top 3 highest rated)
  const featuredTestimonials = testimonials.filter((t) => t.rating === 5).slice(0, 3)

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setNewTestimonial({
      name: "",
      location: "",
      message: "",
      rating: 5,
      plan: "",
    })

    setIsSubmitting(false)
    alert("Thank you for your testimonial! It will be reviewed and published soon.")
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    }

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
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
              💬 Customer Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Customers
              <span className="text-emerald-600 dark:text-emerald-400"> Say About Us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real stories from real people who have transformed their lives with SEA Catering. Join thousands of
              satisfied customers!
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">2,500+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Carousel */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Success Stories</h2>
            <p className="text-xl text-muted-foreground">Inspiring transformations from our community</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20 border-2 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <Quote className="h-12 w-12 text-emerald-600/30 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-muted-foreground italic mb-6">
                      &quot;{featuredTestimonials[featuredIndex]?.message}&quot;
                    </p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={featuredTestimonials[featuredIndex]?.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {featuredTestimonials[featuredIndex]?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{featuredTestimonials[featuredIndex]?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {featuredTestimonials[featuredIndex]?.location}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(featuredTestimonials[featuredIndex]?.rating || 5, "sm")}
                          <Badge variant="secondary" className="text-xs">
                            {featuredTestimonials[featuredIndex]?.plan}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Controls */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === featuredIndex ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Submit Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Experience</h2>
              <p className="text-xl text-muted-foreground">
                Help others discover the benefits of healthy eating with SEA Catering
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                  <span>Write a Testimonial</span>
                </CardTitle>
                <CardDescription>
                  Share your journey and inspire others to start their healthy eating transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTestimonial} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Name *</label>
                      <Input
                        placeholder="Enter your full name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input
                        placeholder="City, Province"
                        value={newTestimonial.location}
                        onChange={(e) => setNewTestimonial((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Meal Plan</label>
                    <Select
                      value={newTestimonial.plan}
                      onValueChange={(value) => setNewTestimonial((prev) => ({ ...prev, plan: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weight Loss Starter">Weight Loss Starter</SelectItem>
                        <SelectItem value="Muscle Building Pro">Muscle Building Pro</SelectItem>
                        <SelectItem value="Balanced Family Plan">Balanced Family Plan</SelectItem>
                        <SelectItem value="Premium Gourmet">Premium Gourmet</SelectItem>
                        <SelectItem value="Keto Advanced">Keto Advanced</SelectItem>
                        <SelectItem value="Vegan Power Plan">Vegan Power Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating *</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewTestimonial((prev) => ({ ...prev, rating: star }))}
                          className="p-1"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= newTestimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Experience *</label>
                    <Textarea
                      placeholder="Tell us about your experience with SEA Catering. How has it helped you achieve your goals?"
                      rows={5}
                      value={newTestimonial.message}
                      onChange={(e) => setNewTestimonial((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Submit Testimonial</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Customer Reviews</h2>
            <p className="text-xl text-muted-foreground">Browse through all our customer testimonials</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search testimonials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by rating:</span>
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold flex items-center space-x-2">
                          <span>{testimonial.name}</span>
                          {testimonial.verified && (
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      </div>
                    </div>
                    {renderStars(testimonial.rating)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-4">{testimonial.message}</p>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.plan}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(testimonial.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No testimonials found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Satisfaction</h2>
            <p className="text-xl text-emerald-100">Numbers that speak for our quality and service</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2,500+", label: "Total Reviews", icon: MessageSquare },
              { number: "4.9/5", label: "Average Rating", icon: Star },
              { number: "98%", label: "Satisfaction Rate", icon: Heart },
              { number: "50K+", label: "Happy Customers", icon: Users },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-orange-100">
              Start your healthy eating journey today and become our next success story!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                View Meal Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer/>

    </div>
  )
}