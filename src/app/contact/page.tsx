"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Building,
  Users,
  HeadphonesIcon,
  Globe,
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import Link from "next/link"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+62 21 1234 5678", "+62 812 3456 7890"],
    description: "Available 24/7 for urgent inquiries",
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["brian@seacatering.id", "support@seacatering.id"],
    description: "We respond within 2 hours",
  },
  {
    icon: MapPin,
    title: "Head Office",
    details: ["Jl. Sudirman No. 123", "Jakarta Pusat 10220", "Indonesia"],
    description: "Visit us during business hours",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday: 9:00 AM - 5:00 PM", "Sunday: Closed"],
    description: "Customer service available",
  },
]

const departments = [
  {
    icon: HeadphonesIcon,
    name: "Customer Service",
    email: "support@seacatering.id",
    phone: "+62 21 1234 5678",
    description: "General inquiries and support",
  },
  {
    icon: Users,
    name: "Sales Team",
    email: "sales@seacatering.id",
    phone: "+62 21 1234 5679",
    description: "New subscriptions and partnerships",
  },
  {
    icon: Building,
    name: "Corporate Sales",
    email: "corporate@seacatering.id",
    phone: "+62 21 1234 5680",
    description: "Bulk orders and corporate catering",
  },
  {
    icon: Globe,
    name: "Media & Press",
    email: "media@seacatering.id",
    phone: "+62 21 1234 5681",
    description: "Press inquiries and partnerships",
  },
]

const socialMedia = [
  { icon: Instagram, name: "Instagram", handle: "@seacatering", url: "#", color: "bg-pink-500" },
  { icon: Facebook, name: "Facebook", handle: "SEA Catering Indonesia", url: "#", color: "bg-blue-600" },
  { icon: Twitter, name: "Twitter", handle: "@seacatering_id", url: "#", color: "bg-blue-400" },
  { icon: Linkedin, name: "LinkedIn", handle: "SEA Catering", url: "#", color: "bg-blue-700" },
]

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "support",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert("Thank you for your message! We'll get back to you within 24 hours.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      department: "support",
    })
  }

  return (

    <div className="min-h-screen bg-background">
      
      <Navbar/>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative">
          <div
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              📞 Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We&apos;re Here to
              <span className="text-emerald-600 dark:text-emerald-400"> Help You</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about our meal plans? Need support with your subscription? Our friendly team is ready to
              assist you every step of the way.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{"<2hrs"}</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">100+</div>
                <div className="text-sm text-muted-foreground">Cities Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card
                  key={index}
                  className={`text-center hover:shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Departments */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Contact by Department</h3>
              <p className="text-lg text-muted-foreground">Reach the right team for faster assistance</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, index) => {
                const IconComponent = dept.icon
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-emerald-500"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-3 w-3 text-emerald-600" />
                              <span>{dept.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3 text-emerald-600" />
                              <span>{dept.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Social Media */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                  <span>Send us a Message</span>
                </CardTitle>
                <CardDescription>Fill out the form and we&apos;ll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input
                        placeholder="+62 812 3456 7890"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Department</label>
                      <select
                        className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background text-sm"
                        value={formData.department}
                        onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                      >
                        <option value="support">Customer Service</option>
                        <option value="sales">Sales Team</option>
                        <option value="corporate">Corporate Sales</option>
                        <option value="media">Media & Press</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <Input
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
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
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social Media & Additional Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us on Social Media</CardTitle>
                  <CardDescription>Stay updated with our latest news and offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.handle}</div>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="bg-gradient-to-r from-emerald-50 to-orange-50 dark:from-emerald-950/20 dark:to-orange-950/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Need Quick Answers?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check out our FAQ section for instant answers to common questions about our meal plans, delivery,
                    and more.
                  </p>
                  <Link href={"/"}>
                    <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                      View FAQ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-600">Emergency Contact</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    For urgent delivery issues or food safety concerns, contact us immediately:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span>+62 811 EMERGENCY (24/7)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <span>emergency@seacatering.id</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-xl text-muted-foreground">Located in the heart of Jakarta</p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-emerald-100 to-orange-100 dark:from-emerald-900/20 dark:to-orange-900/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEA Catering Head Office</h3>
                <p className="text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                <Link href={"https://www.google.com/maps/"}>
                    <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">Get Directions</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer/>

    </div>
  )
}