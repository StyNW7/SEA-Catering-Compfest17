import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import { MealPlan } from '@/types/index'

// Create Meal Plan

export async function POST(request: Request) {
  try {
    const body: MealPlan = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Name, price, description, and category are required' },
        { status: 400 }
      )
    }

    // Create meal plan
    const mealPlan = await prisma.mealPlan.create({
      data: {
        name: body.name,
        price: body.price,
        originalPrice: body.originalPrice,
        description: body.description,
        image: body.image,
        category: body.category,
        popular: body.popular || false,
        features: body.features,
        duration: body.additionalInfo.duration,
        mealsPerDay: body.additionalInfo.mealsPerDay,
        calories: body.additionalInfo.calories,
        proteinPercent: body.additionalInfo.macros.protein,
        carbsPercent: body.additionalInfo.macros.carbs,
        fatsPercent: body.additionalInfo.macros.fats,
        includes: body.additionalInfo.includes,
        benefits: body.additionalInfo.benefits,
        sampleMeals: body.additionalInfo.sampleMeals
      }
    })

    return NextResponse.json(mealPlan, { status: 201 })
  } catch (error) {
    console.error('Error creating meal plan:', error)
    return NextResponse.json(
      { error: 'Failed to create meal plan' },
      { status: 500 }
    )
  }
}

// Get all meal plans

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category && category !== 'all' 
      ? { category } 
      : {}

    const mealPlans = await prisma.mealPlan.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(mealPlans)
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch meal plans' },
      { status: 500 }
    )
  }
}

