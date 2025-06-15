/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SubscriptionForm } from '@/types/index'
import { getServerSession } from '@/lib/session'

// Helper function to calculate total price
async function calculateTotalPrice(planId: string, mealTypes: string[], deliveryDays: string[]): Promise<number> {

  const mealPlan = await prisma.mealPlan.findUnique({
    where: { id: planId }
  })

  if (!mealPlan) {
    throw new Error('Meal plan not found')
  }

  const pricePerMeal = parseFloat(mealPlan.price)
  const mealsPerDay = mealTypes.length
  const daysPerWeek = deliveryDays.length
  const weeksInMonth = 4.3
  
  return pricePerMeal * mealsPerDay * daysPerWeek * weeksInMonth

}

// Create Subscription
export async function POST(request: Request) {

  try {

    const session = await getServerSession();
    const body: SubscriptionForm = await request.json()

    // Validate required fields
    if (!body.name || !body.phone || !body.plan || !body.mealTypes?.length || !body.deliveryDays?.length) {
      return NextResponse.json(
        { error: 'Name, phone, plan, meal types, and delivery days are required' },
        { status: 400 }
      )
    }

    // Find the meal plan
    const mealPlan = await prisma.mealPlan.findFirst({
      where: { name: body.plan }
    })

    if (!mealPlan) {
      return NextResponse.json(
        { error: 'Selected meal plan not found' },
        { status: 404 }
      )
    }

    // Calculate total price
    const totalPrice = await calculateTotalPrice(mealPlan.id, body.mealTypes, body.deliveryDays)

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        ...(session?.user?.id && { userId: session.user.id }),
        planId: mealPlan.id,
        name: body.name,
        phone: body.phone,
        mealTypes: body.mealTypes,
        deliveryDays: body.deliveryDays,
        allergies: body.allergies,
        totalPrice: totalPrice,
        status: 'active'
      }
    })

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

// Get all subscriptions
export async function GET(request: Request) {
  try {
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    const where: any = {}
    if (userId) where.userId = userId
    if (status) where.status = status

    const subscriptions = await prisma.subscription.findMany({
      where,
      include: {
        mealPlan: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}