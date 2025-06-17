/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/session'

// Get all subscriptions (for current user or filtered)
export async function GET(request: Request) {

  try {

    const session = await getServerSession();
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('userId') // Optional override for admins

    // Base where clause
    const where: any = {}

    // If userId query param is provided (admin override)
    if (userId) {
      where.userId = userId
    } 

    // Otherwise use logged-in user's ID
    else if (session?.user?.id) {
      where.userId = session.user.id
    }

    // No user ID available
    else {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Add status filter if provided
    if (status) {
      where.status = status
    }

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