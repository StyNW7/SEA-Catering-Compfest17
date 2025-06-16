import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, format, parseISO } from 'date-fns'
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
    const interval = searchParams.get('interval') || 'day' // day, week, or month

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Date range parameters (from, to) are required' },
        { status: 400 }
      )
    }

    const fromDate = parseISO(from)
    const toDate = parseISO(to)

    let dateIntervals: Date[];
    
    if (interval === 'month') {
      dateIntervals = eachMonthOfInterval({ start: fromDate, end: toDate })
    } else if (interval === 'week') {
      dateIntervals = eachWeekOfInterval({ start: fromDate, end: toDate })
    } else {
      // Default to daily
      dateIntervals = eachDayOfInterval({ start: fromDate, end: toDate })
    }

    const growthData = await Promise.all(
      dateIntervals.map(async (startDate) => {
        const endDate = new Date(startDate)
        if (interval === 'month') {
          endDate.setMonth(endDate.getMonth() + 1)
        } else if (interval === 'week') {
          endDate.setDate(endDate.getDate() + 7)
        } else {
          endDate.setDate(endDate.getDate() + 1)
        }

        const [active, newSubs, cancelled] = await Promise.all([
          prisma.subscription.count({
            where: {
              status: 'active',
              createdAt: {
                lte: endDate
              },
              OR: [
                { endDate: null },
                { endDate: { gte: startDate } }
              ]
            }
          }),
          prisma.subscription.count({
            where: {
              status: 'active',
              createdAt: {
                gte: startDate,
                lt: endDate
              }
            }
          }),
          prisma.subscription.count({
            where: {
              status: 'cancelled',
              updatedAt: {
                gte: startDate,
                lt: endDate
              }
            }
          })
        ])

        return {
          date: format(startDate, interval === 'month' ? 'MMM yyyy' : 
                      interval === 'week' ? 'MMM dd, yyyy' : 'yyyy-MM-dd'),
          active,
          new: newSubs,
          cancelled
        }
      })
    )

    return NextResponse.json(growthData)
  } catch (error) {
    console.error('Error fetching growth chart data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch growth chart data' },
      { status: 500 }
    )
  }
}