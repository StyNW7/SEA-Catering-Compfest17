/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseISO } from 'date-fns'
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

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const whereClause: any = {
      status: 'active'
    }

    if (from && to) {
      whereClause.OR = [
        {
          createdAt: {
            lte: parseISO(to)
          },
          endDate: null
        },
        {
          createdAt: {
            lte: parseISO(to)
          },
          endDate: {
            gte: parseISO(from)
          }
        }
      ]
    }

    const planDistribution = await prisma.mealPlan.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        _count: {
          select: {
            subscriptions: {
              where: whereClause
            }
          }
        }
      },
      orderBy: {
        subscriptions: {
          _count: 'desc'
        }
      }
    })

    const categoryColors: Record<string, string> = {
      'weight-loss': '#10b981',
      'muscle-building': '#f97316',
      'balanced': '#3b82f6',
      'premium': '#8b5cf6'
    }

    const formattedData = planDistribution.map((plan) => ({
      name: plan.name,
      value: plan._count.subscriptions,
      color: categoryColors[plan.category] || '#8884d8'
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching plan distribution data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plan distribution data' },
      { status: 500 }
    )
  }
}