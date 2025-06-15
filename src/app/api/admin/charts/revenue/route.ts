import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subMonths, eachMonthOfInterval, format } from 'date-fns'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const months = parseInt(searchParams.get('months') || '6')

    const endDate = new Date()
    const startDate = subMonths(endDate, months - 1)

    // Generate all months in the range
    const monthsInRange = eachMonthOfInterval({
      start: startDate,
      end: endDate
    })

    // Get revenue data for each month
    const revenueData = await Promise.all(
      monthsInRange.map(async (monthStart) => {
        const monthEnd = new Date(monthStart)
        monthEnd.setMonth(monthEnd.getMonth() + 1)

        const result = await prisma.subscription.aggregate({
          _sum: {
            totalPrice: true
          },
          _count: {
            id: true
          },
          where: {
            status: 'active',
            createdAt: {
              lte: monthEnd
            },
            OR: [
              { endDate: null },
              { endDate: { gte: monthStart } }
            ]
          }
        })

        return {
          month: format(monthStart, 'MMM'),
          revenue: result._sum.totalPrice || 0,
          subscriptions: result._count.id
        }
      })
    )

    return NextResponse.json(revenueData)
  } catch (error) {
    console.error('Error fetching revenue chart data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue chart data' },
      { status: 500 }
    )
  }
}