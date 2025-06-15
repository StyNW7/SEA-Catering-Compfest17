import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MealPlan } from '@/types/index'

// Update Meal Plan
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params
    const body: MealPlan = await request.json()

    // Verify meal plan exists
    const existingMealPlan = await prisma.mealPlan.findUnique({
      where: { id }
    })

    if (!existingMealPlan) {
      return NextResponse.json(
        { error: 'Meal plan not found' },
        { status: 404 }
      )
    }

    // Update meal plan
    const updatedMealPlan = await prisma.mealPlan.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        originalPrice: body.originalPrice,
        description: body.description,
        image: body.image,
        category: body.category,
        popular: body.popular,
        features: body.features,
        duration: body.duration,
        mealsPerDay: body.mealsPerDay,
        calories: body.calories,
        proteinPercent: body.proteinPercent,
        carbsPercent: body.carbsPercent,
        fatsPercent: body.fatsPercent,
        includes: body.includes,
        benefits: body.benefits,
        sampleMeals: body.sampleMeals
      }
    })

    return NextResponse.json(updatedMealPlan)
  } catch (error) {
    console.error('Error updating meal plan:', error)
    return NextResponse.json(
      { error: 'Failed to update meal plan' },
      { status: 500 }
    )
  }
}

// Delete Meal Plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params

    // Verify meal plan exists
    const existingMealPlan = await prisma.mealPlan.findUnique({
      where: { id }
    })

    if (!existingMealPlan) {
      return NextResponse.json(
        { error: 'Meal plan not found' },
        { status: 404 }
      )
    }

    // Delete meal plan
    await prisma.mealPlan.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Meal plan deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting meal plan:', error)
    return NextResponse.json(
      { error: 'Failed to delete meal plan' },
      { status: 500 }
    )
  }
}