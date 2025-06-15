"use client"

import { useEffect, useState } from 'react'
import { Testimonial } from '@/types/index'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import Image from 'next/image'

export default function TestimonialList() {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials')
        }
        const data = await response.json()
        setTestimonials(data)
      } catch {
        toast("Error",{
          description: 'Failed to load testimonials',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [toast])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }

      setTestimonials(prev => prev.filter(t => t.id !== id))
      toast("Success!",{
        description: 'Testimonial deleted successfully',
      })
    } catch {
      toast("Error",{
        description: 'Failed to delete testimonial',
      })
    }
  }

  if (isLoading) {
    return <div>Loading testimonials...</div>
  }

  return (
    <div className="space-y-6">
      {testimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={testimonial.avatar || '/placeholder.svg'}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    width={"60"}
                    height={"60"}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.location} • {testimonial.plan}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {testimonial.message}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </span>
                {testimonial.verified && (
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
                    Verified
                  </span>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="mt-4"
                onClick={() => testimonial.id && handleDelete(testimonial.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}