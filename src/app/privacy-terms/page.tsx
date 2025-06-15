"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ChefHat,
  Shield,
  FileText,
  Lock,
  Eye,
  Users,
  CreditCard,
  Truck,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function PrivacyTermsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("privacy")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const lastUpdated = "January 15, 2024"

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
              🔒 Legal Information
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy &<span className="text-emerald-600 dark:text-emerald-400"> Terms of Service</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your privacy and trust are important to us. Learn how we protect your information and what terms govern
              our service.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">GDPR</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-muted-foreground">Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Navigation</CardTitle>
                    <CardDescription>Jump to any section</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant={activeSection === "privacy" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("privacy")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button
                      variant={activeSection === "terms" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("terms")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Terms of Service
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Last updated: {lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <Tabs value={activeSection} onValueChange={setActiveSection}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="privacy" className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </TabsTrigger>
                  <TabsTrigger value="terms" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Terms of Service</span>
                  </TabsTrigger>
                </TabsList>

                {/* Privacy Policy */}
                <TabsContent value="privacy" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        <span>Privacy Policy</span>
                      </CardTitle>
                      <CardDescription>
                        Effective Date: {lastUpdated} | This policy explains how SEA Catering collects, uses, and
                        protects your personal information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                      {/* Information We Collect */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Eye className="h-5 w-5 text-emerald-600 mr-2" />
                          Information We Collect
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                            <h4 className="font-semibold mb-2">Personal Information</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Full name and contact details (phone, email, address)</li>
                              <li>• Dietary preferences and allergies</li>
                              <li>• Payment information (processed securely through third-party providers)</li>
                              <li>• Delivery preferences and special instructions</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                            <h4 className="font-semibold mb-2">Usage Information</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Website and app usage patterns</li>
                              <li>• Order history and meal preferences</li>
                              <li>• Customer service interactions</li>
                              <li>• Device information and IP addresses</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* How We Use Information */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Users className="h-5 w-5 text-emerald-600 mr-2" />
                          How We Use Your Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Service Delivery</h4>
                                <p className="text-sm text-muted-foreground">
                                  Process orders, prepare meals, and coordinate deliveries
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Customer Support</h4>
                                <p className="text-sm text-muted-foreground">
                                  Provide assistance and resolve any issues
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Personalization</h4>
                                <p className="text-sm text-muted-foreground">
                                  Customize meal recommendations and improve your experience
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Communication</h4>
                                <p className="text-sm text-muted-foreground">
                                  Send order updates, promotions, and important notices
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Analytics</h4>
                                <p className="text-sm text-muted-foreground">
                                  Improve our services and develop new features
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-sm">Legal Compliance</h4>
                                <p className="text-sm text-muted-foreground">
                                  Meet regulatory requirements and protect our rights
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Data Protection */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Lock className="h-5 w-5 text-emerald-600 mr-2" />
                          How We Protect Your Data
                        </h3>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            We implement industry-standard security measures to protect your personal information:
                          </p>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg">
                              <Lock className="h-8 w-8 text-emerald-600 mb-2" />
                              <h4 className="font-semibold mb-1">Encryption</h4>
                              <p className="text-sm text-muted-foreground">
                                All data is encrypted in transit and at rest using AES-256 encryption
                              </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <Shield className="h-8 w-8 text-emerald-600 mb-2" />
                              <h4 className="font-semibold mb-1">Secure Servers</h4>
                              <p className="text-sm text-muted-foreground">
                                Our servers are hosted in secure, certified data centers
                              </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <Users className="h-8 w-8 text-emerald-600 mb-2" />
                              <h4 className="font-semibold mb-1">Access Control</h4>
                              <p className="text-sm text-muted-foreground">
                                Strict access controls limit who can view your information
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Your Rights */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Your Privacy Rights</h3>
                        <div className="space-y-3">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Access & Portability</h4>
                            <p className="text-sm text-muted-foreground">
                              Request a copy of your personal data in a portable format
                            </p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Correction & Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Update or correct any inaccurate personal information
                            </p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Deletion</h4>
                            <p className="text-sm text-muted-foreground">
                              Request deletion of your personal data (subject to legal requirements)
                            </p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Opt-out</h4>
                            <p className="text-sm text-muted-foreground">
                              Unsubscribe from marketing communications at any time
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Terms of Service */}
                <TabsContent value="terms" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-emerald-600" />
                        <span>Terms of Service</span>
                      </CardTitle>
                      <CardDescription>
                        Effective Date: {lastUpdated} | These terms govern your use of SEA Catering&apos;s services.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                      {/* Service Description */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Our Service</h3>
                        <p className="text-muted-foreground mb-4">
                          SEA Catering provides meal planning, preparation, and delivery services throughout Indonesia.
                          Our service includes:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <ChefHat className="h-6 w-6 text-emerald-600 mb-2" />
                            <h4 className="font-semibold mb-1">Meal Preparation</h4>
                            <p className="text-sm text-muted-foreground">
                              Fresh, healthy meals prepared by certified chefs
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <Truck className="h-6 w-6 text-emerald-600 mb-2" />
                            <h4 className="font-semibold mb-1">Delivery Service</h4>
                            <p className="text-sm text-muted-foreground">
                              Reliable delivery to your specified location
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Subscription Terms */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <CreditCard className="h-5 w-5 text-emerald-600 mr-2" />
                          Subscription & Payment Terms
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                            <h4 className="font-semibold mb-2">Subscription Plans</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Diet Plan: Rp 30,000 per meal</li>
                              <li>• Protein Plan: Rp 40,000 per meal</li>
                              <li>• Royal Plan: Rp 60,000 per meal</li>
                              <li>• Monthly billing calculated as: Plan Price × Meal Types × Delivery Days × 4.3</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                            <h4 className="font-semibold mb-2">Payment Terms</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Payment is due monthly in advance</li>
                              <li>• We accept bank transfers, credit cards, and digital wallets</li>
                              <li>• Failed payments may result in service suspension</li>
                              <li>• Refunds are processed within 7-14 business days</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Delivery Terms */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Truck className="h-5 w-5 text-emerald-600 mr-2" />
                          Delivery Terms
                        </h3>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Delivery Schedule</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Breakfast: 7:00 - 9:00 AM</li>
                                <li>• Lunch: 12:00 - 2:00 PM</li>
                                <li>• Dinner: 6:00 - 8:00 PM</li>
                                <li>• Delivery windows may vary by location</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Delivery Requirements</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Valid delivery address required</li>
                                <li>• Someone must be available to receive orders</li>
                                <li>• Special delivery instructions can be provided</li>
                                <li>• Delivery fees may apply for remote areas</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Cancellation Policy */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                          Cancellation & Refund Policy
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/10">
                            <h4 className="font-semibold mb-2">Subscription Changes</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Modify or pause your subscription anytime through your account</li>
                              <li>• Changes take effect from the next billing cycle</li>
                              <li>• Cancel with 24 hours notice to avoid next billing</li>
                            </ul>
                          </div>
                          <div className="p-4 border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10">
                            <h4 className="font-semibold mb-2">Refund Conditions</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Full refund for undelivered meals</li>
                              <li>• Partial refund for quality issues (case-by-case basis)</li>
                              <li>• No refund for consumed meals unless safety issue</li>
                              <li>• Processing time: 7-14 business days</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* User Responsibilities */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Your Responsibilities</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-sm">Accurate Information</h4>
                              <p className="text-sm text-muted-foreground">
                                Provide accurate delivery and dietary information
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-sm">Payment Obligations</h4>
                              <p className="text-sm text-muted-foreground">
                                Ensure timely payment for subscribed services
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-sm">Proper Use</h4>
                              <p className="text-sm text-muted-foreground">
                                Use our service only for personal consumption
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-sm">Communication</h4>
                              <p className="text-sm text-muted-foreground">
                                Notify us promptly of any issues or changes
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
                <p className="text-muted-foreground">
                  If you have any questions about our Privacy Policy or Terms of Service, we&apos;re here to help.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Our Legal Team</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span>legal@seacatering.id</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span>+62 21 1234 5678</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Data Protection Officer</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span>brian@seacatering.id</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      <span>For privacy-related inquiries</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link href={"/contact"}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Contact Us</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer/>

    </div>
  )
}