import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subDays, eachDayOfInterval, format } from 'date-fns'
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
    const days = parseInt(searchParams.get('days') || '30')

    const endDate = new Date()
    const startDate = subDays(endDate, days - 1)

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: endDate
    })

    const growthData = await Promise.all(
      daysInRange.map(async (date) => {
        const nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + 1)

        const [active, newSubs, cancelled] = await Promise.all([
          prisma.subscription.count({
            where: {
              status: 'active',
              createdAt: {
                lte: nextDay
              },
              OR: [
                { endDate: null },
                { endDate: { gte: date } }
              ]
            }
          }),
          prisma.subscription.count({
            where: {
              status: 'active',
              createdAt: {
                gte: date,
                lt: nextDay
              }
            }
          }),
          prisma.subscription.count({
            where: {
              status: 'cancelled',
              updatedAt: {
                gte: date,
                lt: nextDay
              }
            }
          })
        ])

        return {
          date: format(date, 'yyyy-MM-dd'),
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