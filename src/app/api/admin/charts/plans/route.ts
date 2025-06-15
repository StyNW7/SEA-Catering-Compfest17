/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const planDistribution = await prisma.$queryRaw`
      SELECT 
        mp.name as name,
        COUNT(s.id) as value,
        mp.color as color
      FROM 
        "Subscription" s
      JOIN 
        "MealPlan" mp ON s."planId" = mp.id
      WHERE 
        s.status = 'active'
      GROUP BY 
        mp.name, mp.color
      ORDER BY 
        value DESC
    `

    return NextResponse.json(planDistribution)
  } catch (error) {
    console.error('Error fetching plan distribution data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plan distribution data' },
      { status: 500 }
    )
  }
}