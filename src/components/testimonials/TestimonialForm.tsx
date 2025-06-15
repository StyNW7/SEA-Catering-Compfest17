"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {toast} from "sonner"

export default function TestimonialForm() {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    message: '',
    plan: 'Weight Loss Starter',
    verified: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit testimonial')
      }

      toast("Success",{
        description: 'Your testimonial has been submitted.',
      })
      setFormData({
        name: '',
        location: '',
        rating: 5,
        message: '',
        plan: 'Weight Loss Starter',
        verified: false
      })
    } catch {
      toast("Error",{
        description: 'Failed to submit testimonial. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name*
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="plan" className="block text-sm font-medium mb-1">
          Plan*
        </label>
        <Select
          value={formData.plan}
          onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a plan" />
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
        <label htmlFor="rating" className="block text-sm font-medium mb-1">
          Rating
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Your Experience*
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="verified"
          checked={formData.verified}
          onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="verified" className="text-sm font-medium">
          Verified Customer
        </label>
      </div>

      <Button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
      </Button>
    </form>
  )
}