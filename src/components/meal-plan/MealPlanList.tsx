"use client"

import { useState, useEffect } from 'react'
import { MealPlan } from '@/types/index'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'

export function MealPlanList() {

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meal plan?')) return

    try {
      const response = await fetch(`/api/meal-plans/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete meal plan')

      setMealPlans(prev => prev.filter(plan => plan.id !== id))
      toast('Success',{
        description: 'Meal plan deleted successfully',
      })
    } catch {
      toast('Error',{
        description: 'Failed to delete meal plan',
      })
    }
  }

  if (loading) return <div>Loading meal plans...</div>

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push('/admin/meal-plans/new')}>
        Create New Meal Plan
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealPlans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.category}</TableCell>
              <TableCell>{plan.price}</TableCell>
              <TableCell>{plan.popular ? 'Yes' : 'No'}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/admin/meal-plans/${plan.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(plan.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}