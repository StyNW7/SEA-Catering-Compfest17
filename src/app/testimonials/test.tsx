"use client"

import TestimonialForm from '@/components/testimonials/TestimonialForm'
import TestimonialList from '@/components/testimonials/TestimonialList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TestimonialsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Customer Testimonials</h1>
      
      <Tabs defaultValue="view">
        <TabsList className="grid grid-cols-2 w-[200px] mb-8">
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <TestimonialList />
        </TabsContent>
        
        <TabsContent value="add">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Share Your Experience</h2>
            <TestimonialForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}