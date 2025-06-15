import { NextResponse } from 'next/server'; // Use NextResponse for consistent JSON responses
import {prisma} from '@/lib/prisma'; // Ensure this is a default import (no curly braces)
import bcrypt from 'bcryptjs'; // For password hashing
import { registerSchema } from '@/lib/zod-schemas'; // Zod schema for validation
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // For specific Prisma error handling

// GET /api/users
// Fetches all users from the database.
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { // Select specific fields to avoid exposing hashed passwords
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
    // Return a generic 500 error for unexpected server issues
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users
// Handles user registration with validation, password hashing, and default role assignment.
export async function POST(request: Request) { // Use Request type for broader compatibility
  try {
    const body = await request.json(); // Parse the request body as JSON

    // Validate the incoming data using Zod schema
    const validatedData = registerSchema.safeParse(body);

    // If validation fails, return a 400 Bad Request with validation errors
    if (!validatedData.success) {
      console.error("Validation failed for /api/users POST:", validatedData.error.flatten().fieldErrors);
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Destructure validated data. Assume frontend sends 'fullName'.
    const { fullName, email, password } = validatedData.data;

    // Hash the plain-text password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds is a good default for security

    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        name: fullName, // Map 'fullName' from frontend to 'name' in Prisma model
        email,
        password: hashedPassword,
        role: "USER", // Assign a default role for new registrations
      },
      select: { // Select specific fields to return, excluding the hashed password
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Return success response with the newly created user (without password)
    return NextResponse.json({ message: 'User registered successfully', user: user }, { status: 201 });

  } catch (error) {
    console.error("API Error (POST /api/users):", error); // Log the full error for debugging

    // Handle specific Prisma errors, e.g., unique constraint violation for email
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') { // P2002 is Prisma's error code for unique constraint violation
        return NextResponse.json(
          { error: 'Email already registered. Please use a different email or log in.' },
          { status: 409 } // 409 Conflict indicates a resource conflict
        );
      }
      // Handle other known Prisma errors if necessary
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    } else if (error instanceof SyntaxError) {
      // This catches errors if `request.json()` fails, meaning the body wasn't valid JSON
      return NextResponse.json({ error: 'Invalid request body. Expected JSON.' }, { status: 400 });
    } else if (error instanceof Error) {
        // Catch any other standard JavaScript errors
        return NextResponse.json({ error: error.message || 'An unexpected server error occurred.' }, { status: 500 });
    } else {
        // Fallback for any truly unknown errors
        return NextResponse.json({ error: 'An unknown server error occurred.' }, { status: 500 });
    }
  }
}