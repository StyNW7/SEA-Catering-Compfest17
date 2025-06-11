"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChefHat,
  Truck,
  Heart,
  Star,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Leaf,
  Award,
  TrendingUp,
  Utensils,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">SEA Catering</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#home" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Services
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Order Now</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  🌟 Indonesia&apos;s #1 Healthy Catering
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Healthy Meals
                  <span className="text-emerald-600 dark:text-emerald-400"> Delivered</span>
                  <br />
                  Across Indonesia
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Customizable healthy meal plans crafted by expert chefs and delivered fresh to your doorstep. Join
                  thousands who&apos;ve transformed their eating habits with SEA Catering.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  View Menu
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100+</div>
                  <div className="text-sm text-muted-foreground">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Healthy meal delivery"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium">Fresh & Healthy</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span className="text-sm font-medium">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              About SEA Catering
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Indonesia&apos;s Food Culture</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What started as a small business has quickly become a nationwide sensation. We&apos;re working hard to meet the
              rising demand for healthy, convenient meals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make healthy eating accessible, convenient, and delicious for everyone across Indonesia. We believe
                  that good nutrition shouldn&apos;t be a luxury, but a fundamental right.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <Leaf className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold">100% Fresh</div>
                  <div className="text-sm text-muted-foreground">Ingredients</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold">Food Safety</div>
                  <div className="text-sm text-muted-foreground">Certified</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <Award className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold">Award Winning</div>
                  <div className="text-sm text-muted-foreground">Quality</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold">Rapid Growth</div>
                  <div className="text-sm text-muted-foreground">Nationwide</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="About SEA Catering"
                width={500}
                height={500}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Steps to Healthy Eating</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with SEA Catering is easy. Follow these simple steps and transform your meals today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Plan",
                description: "Select from our variety of meal plans tailored to your dietary needs and preferences.",
                icon: Utensils,
              },
              {
                step: "02",
                title: "Customize Your Meals",
                description: "Personalize your menu with our wide selection of healthy, delicious options.",
                icon: Heart,
              },
              {
                step: "03",
                title: "Enjoy Fresh Delivery",
                description: "Receive your freshly prepared meals delivered right to your doorstep on schedule.",
                icon: Truck,
              },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{item.step}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meal Plans for Every Lifestyle</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re looking to lose weight, gain muscle, or simply eat healthier, we have the perfect meal plan
              for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Weight Loss Plan",
                description:
                  "Carefully portioned meals designed to help you reach your weight loss goals while maintaining nutrition.",
                price: "From Rp 150,000/day",
                features: ["Calorie controlled", "High protein", "Low carb options", "Nutritionist approved"],
                popular: false,
              },
              {
                title: "Muscle Building Plan",
                description:
                  "High-protein meals perfect for athletes and fitness enthusiasts looking to build lean muscle.",
                price: "From Rp 200,000/day",
                features: ["High protein content", "Post-workout meals", "Balanced macros", "Performance focused"],
                popular: true,
              },
              {
                title: "Balanced Nutrition",
                description:
                  "Well-rounded meals for those who want to maintain a healthy lifestyle with delicious variety.",
                price: "From Rp 120,000/day",
                features: ["Variety of cuisines", "Balanced nutrition", "Family friendly", "Flexible portions"],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${plan.popular ? "ring-2 ring-emerald-500 scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 pt-2">{plan.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              Meet Our Founder
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Vision Behind SEA Catering</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="SEA Catering Founder"
                width={500}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-emerald-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">2019</div>
                  <div className="text-sm">Founded</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Chef Sarah Wijaya</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">Founder & Head Chef</p>
                <p className="text-muted-foreground mb-6">
                  &quot;I started SEA Catering with a simple mission: to make healthy eating accessible to everyone in
                  Indonesia. Having worked in top restaurants across Southeast Asia, I saw how difficult it was for busy
                  people to maintain a healthy diet. That&apos;s when I decided to bring restaurant-quality, nutritious meals
                  directly to people&apos;s homes.&quot;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">50+</div>
                  <div className="text-sm text-muted-foreground">Awards Won</div>
                </div>
              </div>

              <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-muted-foreground">
                &quot;Every meal we prepare is a step towards a healthier Indonesia. We&apos;re not just delivering food; we&apos;re
                delivering hope, health, and happiness.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact Across Indonesia</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Numbers that showcase our commitment to transforming Indonesia&apos;s food culture
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Happy Customers", icon: Users },
              { number: "2M+", label: "Meals Delivered", icon: Utensils },
              { number: "100+", label: "Cities Covered", icon: MapPin },
              { number: "4.9/5", label: "Customer Rating", icon: Star },
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real people who have transformed their lives with SEA Catering
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Andi Pratama",
                role: "Software Engineer, Jakarta",
                content:
                  "SEA Catering has been a game-changer for my busy lifestyle. The meals are delicious, healthy, and always delivered on time. I've lost 15kg in 6 months!",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Sari Dewi",
                role: "Marketing Manager, Surabaya",
                content:
                  "As a working mom, SEA Catering saves me so much time while ensuring my family eats healthy. The variety is amazing and my kids love the meals too!",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Budi Santoso",
                role: "Fitness Trainer, Bandung",
                content:
                  "The muscle-building plan is perfect for my training regimen. High-quality ingredients, perfect portions, and excellent taste. Highly recommended!",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about SEA Catering
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How does SEA Catering work?",
                  answer:
                    "Simply choose your meal plan, customize your preferences, and we'll deliver fresh, healthy meals to your doorstep according to your schedule. You can modify or pause your subscription anytime.",
                },
                {
                  question: "What areas do you deliver to?",
                  answer:
                    "We currently deliver to over 100 cities across Indonesia, including Jakarta, Surabaya, Bandung, Medan, and many more. Check our coverage area on the order page.",
                },
                {
                  question: "Can I customize my meals?",
                  answer:
                    "You can customize your meals based on dietary restrictions, preferences, and allergies. We offer vegetarian, vegan, gluten-free, and many other options.",
                },
                {
                  question: "How fresh are the meals?",
                  answer:
                    "All meals are prepared fresh daily in our certified kitchens and delivered within 24 hours. We use only the freshest ingredients sourced from trusted local suppliers.",
                },
                {
                  question: "What if I'm not satisfied with my order?",
                  answer:
                    "We offer a 100% satisfaction guarantee. If you're not happy with your meal, contact us within 24 hours and we'll provide a full refund or replacement.",
                },
                {
                  question: "Can I pause or cancel my subscription?",
                  answer:
                    "Yes, you have full control over your subscription. You can pause, modify, or cancel anytime through your account dashboard or by contacting our customer service.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Contact Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <span>+62 21 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <span>hello@seacatering.id</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Mon - Fri: 8AM - 8PM</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Button size="icon" variant="outline" className="hover:bg-emerald-50 hover:border-emerald-500">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="hover:bg-emerald-50 hover:border-emerald-500">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="hover:bg-emerald-50 hover:border-emerald-500">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input placeholder="+62 812 3456 7890" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Eating Habits?</h2>
            <p className="text-xl text-emerald-100">
              Join thousands of satisfied customers who have already started their healthy eating journey with SEA
              Catering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8">
                <Zap className="h-5 w-5 mr-2" />
                Start Your Journey Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                View Sample Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-emerald-400">SEA Catering</span>
              </div>
              <p className="text-gray-400">Transforming Indonesia&apos;s food culture, one healthy meal at a time.</p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="hover:bg-gray-800">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-gray-800">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-gray-800">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#home" className="hover:text-emerald-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-emerald-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-emerald-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-emerald-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-emerald-400 transition-colors">
                    Weight Loss Plan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400 transition-colors">
                    Muscle Building
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400 transition-colors">
                    Balanced Nutrition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-emerald-400 transition-colors">
                    Custom Plans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new meal plans and special offers.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SEA Catering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
