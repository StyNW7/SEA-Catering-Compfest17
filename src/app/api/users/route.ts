import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/zod-schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// Removed validateCsrfToken and sanitizeObject imports as middleware handles CSRF and validation is by Zod.
// Assuming sanitizeObject is handled via Zod's parsing or is applied earlier if needed universally.
// If you still use sanitizeObject for other purposes, keep its import and usage.

// Fetches all users from the database.
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error('API Error (GET /api/users):', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Handles user registration with validation, password hashing, and default role assignment.
export async function POST(request: Request) {
  try {
    // CSRF validation is now primarily handled by the middleware.
    // If this function is reached, CSRF should have passed.

    const body = await request.json(); // Parse the request body as JSON
    const requestData = body; // Assume JSON body for registration

    // Validate and sanitize input
    // The `cleanData` step using `sanitizeObject` is now less critical here if Zod's safeParse
    // and your frontend inputs are properly constrained. If `sanitizeObject` is for XSS/SQL injection,
    // ensure those are also handled by Zod's refinements or by Prisma's parameterized queries.
    const validatedData = registerSchema.safeParse(requestData);
    if (!validatedData.success) {
      console.error("Validation failed for /api/users POST:", validatedData.error.flatten().fieldErrors);
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, password } = validatedData.data; // Already cleaned by Zod if you use transforms

    // Hash the plain-text password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({ message: 'User registered successfully', user: user }, { status: 201 });

  } catch (error) {
    console.error("Registration API error:", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email already registered. Please use a different email or log in.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    } else if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body. Expected JSON.' }, { status: 400 });
    } else if (error instanceof Error) {
        return NextResponse.json({ error: error.message || 'An unexpected server error occurred.' }, { status: 500 });
    } else {
        return NextResponse.json({ error: 'An unknown server error occurred.' }, { status: 500 });
    }
  }
}
