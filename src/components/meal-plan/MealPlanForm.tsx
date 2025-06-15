"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MealPlan } from '@/types/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const defaultValues: Partial<MealPlan> = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: 'weight-loss',
  popular: false,
  features: [],
  additionalInfo: {
    duration: '',
    mealsPerDay: 3,
    calories: '',
    macros: {
      protein: '',
      carbs: '',
      fats: ''
    },
    includes: [],
    benefits: [],
    sampleMeals: []
  }
}

export function MealPlanForm({ 
  initialData,
  onSuccess
}: {
  initialData?: MealPlan
  onSuccess?: () => void
}) {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<MealPlan>({
    defaultValues: initialData || defaultValues
  })

  const onSubmit = async (data: MealPlan) => {
    setIsLoading(true)
    try {
      const url = initialData?.id 
        ? `/api/meal-plans/${initialData.id}`
        : '/api/meal-plans'
      const method = initialData?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to save meal plan')

      toast('Success',{
        description: initialData?.id 
          ? 'Meal plan updated successfully'
          : 'Meal plan created successfully',
      })
      onSuccess?.()
    } catch {
      toast('Error',{
        description: 'Failed to save meal plan',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Name*</label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Category*</label>
          <Select {...register('category')}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight-loss">Weight Loss</SelectItem>
              <SelectItem value="muscle-building">Muscle Building</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add other fields similarly */}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Meal Plan'}
      </Button>
    </form>
  )
}