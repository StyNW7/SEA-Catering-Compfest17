import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get single subscription
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>  {
  try {
    
    const id = (await params).id; 

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        mealPlan: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

// Update subscription
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>  {

  try {

    const id = (await params).id; 
    const body = await request.json()

    // Verify subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Calculate new total price if meal types or delivery days changed
    let totalPrice = existingSubscription.totalPrice
    if (body.mealTypes || body.deliveryDays) {
      const mealTypes = body.mealTypes || existingSubscription.mealTypes
      const deliveryDays = body.deliveryDays || existingSubscription.deliveryDays
      totalPrice = await calculateTotalPrice(existingSubscription.planId, mealTypes, deliveryDays)
    }

    // Update subscription
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        name: body.name || existingSubscription.name,
        phone: body.phone || existingSubscription.phone,
        mealTypes: body.mealTypes || existingSubscription.mealTypes,
        deliveryDays: body.deliveryDays || existingSubscription.deliveryDays,
        allergies: body.allergies ?? existingSubscription.allergies,
        totalPrice,
        status: body.status || existingSubscription.status,
        endDate: body.endDate || existingSubscription.endDate
      }
    })

    return NextResponse.json(updatedSubscription)
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    )
  }
}

// Delete subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>  {
  try {

    const id = (await params).id; 

    // Verify subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Delete subscription
    await prisma.subscription.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Subscription deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting subscription:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscription' },
      { status: 500 }
    )
  }
}

// Reusable calculateTotalPrice function
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