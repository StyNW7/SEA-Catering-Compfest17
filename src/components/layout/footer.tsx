"use client"

import Link from "next/link"
import { ChefHat, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-emerald-400">SEA Catering</span>
            </div>
            <p className="text-gray-400">Healthy Meals, Anytime, Anywhere</p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="hover:bg-gray-800 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-gray-800 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-gray-800 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <FooterLink href="#home" text="Home" />
              <FooterLink href="#about" text="About" />
              <FooterLink href="#services" text="Services" />
              <FooterLink href="#contact" text="Contact" />
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <FooterLink href="#" text="Weight Loss Plan" />
              <FooterLink href="#" text="Muscle Building" />
              <FooterLink href="#" text="Balanced Nutrition" />
              <FooterLink href="#" text="Custom Plans" />
            </ul>
          </div>

          {/* Newsletter Column */}
          <NewsletterForm />
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SEA Catering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Sub-component for footer links
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link href={href} className="hover:text-emerald-400 transition-colors">
        {text}
      </Link>
    </li>
  )
}

// Sub-component for newsletter form
function NewsletterForm() {
  return (
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
  )
}