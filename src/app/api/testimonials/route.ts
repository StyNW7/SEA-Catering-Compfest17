import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {prisma} from '@/lib/prisma';
import { testimonialSchema } from '@/lib/zod-schemas';

// POST: Create a new testimonial
export async function POST(request: Request) {
  const session = await auth(); // Get session for optional user linking

  try {
    const body = await request.json();
    const validatedData = testimonialSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Validation failed', details: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { customerName, reviewMessage, rating } = validatedData.data;

    const newTestimonial = await prisma.testimonial.create({
      data: {
        customerName,
        reviewMessage,
        rating,
        customerId: session?.user?.id || null, // Link to user if authenticated
      },
    });

    return NextResponse.json({ message: 'Testimonial submitted successfully', data: newTestimonial }, { status: 201 });
  } catch (error) {
    console.error('Testimonial submission API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: Get all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, // Limit for carousel display
    });
    return NextResponse.json({ data: testimonials }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
