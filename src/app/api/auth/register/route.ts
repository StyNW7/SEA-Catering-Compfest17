import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/zod-schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Validation failed', details: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, password } = validatedData.data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Default role
      },
    });

    // Don't return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _,...userWithoutPassword } = user;

    return NextResponse.json({ message: 'User registered successfully', user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Registration API error:", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') { // Unique constraint violation (e.g., email already exists)
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}