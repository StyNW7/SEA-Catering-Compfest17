/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/session'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // First get all meal plans with their active subscription counts
    const mealPlans = await prisma.mealPlan.findMany({
      select: {
        id: true,
        name: true,
        category: true, // Using category instead of color
        _count: {
          select: {
            subscriptions: {
              where: {
                status: 'active'
              }
            }
          }
        }
      }
    })

    // Map categories to colors
    const categoryColors: Record<string, string> = {
      'weight-loss': '#10b981',    // Green
      'muscle-building': '#f97316', // Orange
      'balanced': '#3b82f6',       // Blue
      'premium': '#8b5cf6'         // Purple
    }

    // Then format and sort the data
    const formattedData = mealPlans
      .map((plan: { name: any; _count: { subscriptions: any }; category: string | number }) => ({
        name: plan.name,
        value: plan._count.subscriptions,
        color: categoryColors[plan.category] || '#8884d8' // Default color
      }))
      .sort((a: { value: number }, b: { value: number }) => b.value - a.value) // Sort by count descending

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching plan distribution data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plan distribution data' },
      { status: 500 }
    )
  }
}