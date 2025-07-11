import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/session'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    
    // Check if user is admin
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Date range parameters (from, to) are required' },
        { status: 400 }
      )
    }

    const fromDate = new Date(from)
    const toDate = new Date(to)

    // Get all metrics in parallel
    const [newSubscriptions, mrr, activeSubscriptions] = await Promise.all([
      // New subscriptions
      prisma.subscription.count({
        where: {
          createdAt: {
            gte: fromDate,
            lte: toDate
          },
          status: 'active'
        }
      }),

      // MRR (Monthly Recurring Revenue)
      prisma.subscription.aggregate({
        _sum: {
          totalPrice: true
        },
        where: {
          status: 'active',
          createdAt: {
            lte: toDate
          },
          OR: [
            { endDate: null },
            { endDate: { gte: toDate } }
          ]
        }
      }),

      // Active subscriptions
      prisma.subscription.count({
        where: {
          status: 'active',
          OR: [
            { endDate: null },
            { endDate: { gte: toDate } }
          ]
        }
      })
    ])

    // For reactivations, we'll check subscriptions that were cancelled and then reactivated
    const reactivations = await prisma.subscription.count({
      where: {
        status: 'active',
        updatedAt: {
          gte: fromDate,
          lte: toDate
        },
        NOT: {
          endDate: null
        }
      }
    })

    // Calculate changes from previous period (30 days prior)
    const prevFromDate = new Date(fromDate)
    prevFromDate.setDate(prevFromDate.getDate() - 30)
    const prevToDate = new Date(toDate)
    prevToDate.setDate(prevToDate.getDate() - 30)

    const [
      prevNewSubscriptions,
      prevMrr,
      prevActiveSubscriptions
    ] = await Promise.all([
      prisma.subscription.count({
        where: {
          createdAt: {
            gte: prevFromDate,
            lte: prevToDate
          },
          status: 'active'
        }
      }),
      prisma.subscription.aggregate({
        _sum: {
          totalPrice: true
        },
        where: {
          status: 'active',
          createdAt: {
            lte: prevToDate
          },
          OR: [
            { endDate: null },
            { endDate: { gte: prevToDate } }
          ]
        }
      }),
      prisma.subscription.count({
        where: {
          status: 'active',
          OR: [
            { endDate: null },
            { endDate: { gte: prevToDate } }
          ]
        }
      })
    ])

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return 0
      return ((current - previous) / previous) * 100
    }

    return NextResponse.json({
      newSubscriptions,
      newSubscriptionsChange: calculateChange(newSubscriptions, prevNewSubscriptions),
      mrr: mrr._sum.totalPrice || 0,
      mrrChange: calculateChange(mrr._sum.totalPrice || 0, prevMrr._sum.totalPrice || 0),
      reactivations,
      reactivationsChange: 0, // Can't calculate without history
      activeSubscriptions,
      activeSubscriptionsChange: calculateChange(activeSubscriptions, prevActiveSubscriptions)
    })

  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    )
  }
}