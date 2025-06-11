import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {prisma} from '@/lib/prisma';

interface Params {
  id: string;
}

// PUT: Update a subscription (e.g., pause/resume)
export async function PUT(request: Request, { params }: { params: Params }) {
  const session = await auth();
  const subscriptionId = params.id;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status, endDate } = body; // Example: { status: "Paused", endDate: "2025-07-31T00:00:00Z" }

    // Find the subscription to ensure it belongs to the user or if user is admin
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!existingSubscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Authorization check: User can only update their own subscriptions, Admin can update any.
    if (existingSubscription.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to update this subscription' }, { status: 403 });
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: status,
        endDate: endDate ? new Date(endDate) : null, // Set endDate for pause
      },
    });

    return NextResponse.json({ message: 'Subscription updated successfully', data: updatedSubscription }, { status: 200 });
  } catch (error) {
    console.error(`Error updating subscription ${subscriptionId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Cancel a subscription
export async function DELETE(request: Request, { params }: { params: Params }) {
  const session = await auth();
  const subscriptionId = params.id;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    // Find the subscription to ensure it belongs to the user or if user is admin
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!existingSubscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Authorization check: User can only cancel their own subscriptions, Admin can cancel any.
    if (existingSubscription.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to cancel this subscription' }, { status: 403 });
    }

    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'Canceled',
        endDate: new Date(), // Set end date to now when canceled
      },
    });

    return NextResponse.json({ message: 'Subscription cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error cancelling subscription ${subscriptionId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}