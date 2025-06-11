import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    const mealPlans = await prisma.mealPlan.findMany();
    return NextResponse.json({ data: mealPlans }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch meal plans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
