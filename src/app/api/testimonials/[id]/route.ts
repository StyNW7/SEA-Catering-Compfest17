import { NextRequest, NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    
    const id = (await params).id; 

    // Verify testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id }
    })

    if (!existingTestimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}