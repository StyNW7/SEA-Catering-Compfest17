import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { eachMonthOfInterval, format, parseISO } from 'date-fns'
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

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Date range parameters (from, to) are required' },
        { status: 400 }
      )
    }

    const fromDate = parseISO(from)
    const toDate = parseISO(to)

    // Generate all months in the range
    const monthsInRange = eachMonthOfInterval({
      start: fromDate,
      end: toDate
    })

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
          month: format(monthStart, 'MMM yyyy'),
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