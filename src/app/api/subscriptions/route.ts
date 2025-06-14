// import { NextResponse } from 'next/server';
// import { auth } from '@/lib/auth'; // Your NextAuth.js configuration
// import {prisma} from '@/lib/prisma';
// import { subscriptionSchema } from '@/lib/zod-schemas';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// // POST: Create a new subscription
// export async function POST(request: Request) {
//   const session = await auth(); // Get session on the server

//   if (!session || !session.user) {
//     return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//   }

//   try {
//     const body = await request.json();
//     // Ensure totalPrice is passed from the frontend calculation
//     const { name, phoneNumber, planId, mealTypes, deliveryDays, allergies, totalPrice } = body;

//     const validatedData = subscriptionSchema.safeParse({
//       name, phoneNumber, planId, mealTypes, deliveryDays, allergies
//     });

//     if (!validatedData.success) {
//       return NextResponse.json({ error: 'Validation failed', details: validatedData.error.flatten().fieldErrors }, { status: 400 });
//     }

//     const newSubscription = await prisma.subscription.create({
//       data: {
//         userId: session.user.id,
//         planId: validatedData.data.planId,
//         mealTypes: validatedData.data.mealTypes,
//         deliveryDays: validatedData.data.deliveryDays,
//         allergies: validatedData.data.allergies,
//         totalPrice: totalPrice, // Use the calculated total price
//       },
//     });

//     return NextResponse.json({ message: 'Subscription created successfully', data: newSubscription }, { status: 201 });
//   } catch (error) {
//     console.error('Subscription creation API error:', error);
//     if (error instanceof PrismaClientKnownRequestError) {
//       // Handle specific Prisma errors if necessary
//       return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
//     }
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// // GET: Get all subscriptions for the authenticated user
// export async function GET() {
//   const session = await auth();

//   if (!session || !session.user) {
//     return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//   }

//   try {
//     const userSubscriptions = await prisma.subscription.findMany({
//       where: { userId: session.user.id },
//       include: { mealPlan: true }, // Include meal plan details
//       orderBy: { createdAt: 'desc' },
//     });
//     return NextResponse.json({ data: userSubscriptions }, { status: 200 });
//   } catch (error) {
//     console.error('Failed to fetch user subscriptions:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }