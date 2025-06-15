import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import { Testimonial } from '@/types/index'
import { getServerSession } from '@/lib/session';

export async function POST(request: Request) {
  try {

    const session = await getServerSession();
    const body: Testimonial = await request.json()

    // Validate required fields
    if (!body.name || !body.message || !body.plan) {
      return NextResponse.json(
        { error: 'Name, message, and plan are required' },
        { status: 400 }
      )
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        location: body.location || '',
        rating: body.rating || 5,
        message: body.message,
        avatar: body.avatar,
        verified: body.verified || false,
        plan: body.plan,
        ...(session?.user?.id && { customerId: session.user.id })
      }
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(testimonials, { status: 200 })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}