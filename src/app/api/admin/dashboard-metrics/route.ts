/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {prisma} from '@/lib/prisma';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

export async function GET(request: Request) {

  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const startDate = startDateParam ? startOfDay(parseISO(startDateParam)) : new Date(0); // Epoch
    const endDate = endDateParam ? endOfDay(parseISO(endDateParam)) : new Date(); // Now

    // 1. New Subscriptions in selected period
    const newSubscriptionsCount = await prisma.subscription.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // 2. Monthly Recurring Revenue (MRR) from active subscriptions in selected period
    // This is a simplified MRR. A more accurate MRR would involve more complex calculations
    // based on the billing cycle and active subscriptions for a specific month.
    // Here, we'll sum up the total prices of subscriptions created within the range,
    // assuming they contribute to MRR for that period if active.
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'Active',
      },
      select: {
        totalPrice: true,
      },
    });
    const mrr = activeSubscriptions.reduce((sum: any, sub: { totalPrice: any; }) => sum + sub.totalPrice, 0);

    // 3. Reactivations in selected period
    // This assumes a 'Reactivated' status or logic to identify them.
    // For simplicity, we count subscriptions that changed from 'Canceled' to 'Active' within the period.
    // This requires more complex event logging or specific status transitions in your DB.
    // For now, we'll simply count subscriptions that became active within the period,
    // which might not strictly be "reactivations" if they were new.
    // A better approach would be to track status changes over time.
    // For a minimal implementation, let's consider subscriptions whose status changed from 'Canceled'
    // to 'Active' and their `updatedAt` falls within the range.
    // This requires historical data or a specific "reactivated" status.
    // Let's refine this to just count subscriptions that were CANCELED and then became ACTIVE,
    // which is hard with only current `status`.
    // A simple definition: count subscriptions whose `createdAt` is within the range AND
    // they were previously 'Canceled' (which isn't directly observable from `createdAt` alone).
    // Let's count subscriptions whose `status` changed from 'Canceled' back to 'Active'
    // and the `updatedAt` timestamp falls within the filter range.
    // Prisma does not directly expose "previous state" for this.
    // For this example, let's assume a simplified "reactivation" as an active subscription
    // that was somehow marked or implied as reactivated.
    // For now, we'll return 0, as true reactivation tracking requires more intricate logic
    // or a dedicated history table.
    const reactivations = 0; // Requires more complex historical tracking

    // 4. Subscription Growth (Total Active Subscriptions)
    const totalActiveSubscriptions = await prisma.subscription.count({
      where: {
        status: 'Active',
      },
    });

    // Fetch all users for admin table
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch all subscriptions for admin table
    const allSubscriptions = await prisma.subscription.findMany({
      include: {
        mealPlan: {
          select: { name: true, pricePerMeal: true }
        },
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });


    return NextResponse.json({
      data: {
        newSubscriptions: newSubscriptionsCount,
        mrr,
        reactivations,
        totalActiveSubscriptions,
        allUsers,
        allSubscriptions,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Admin dashboard metrics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}