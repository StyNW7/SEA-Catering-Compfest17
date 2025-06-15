/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/lib/zod-schemas'
import { createSession, User } from '@/lib/session'

export async function POST(request: Request) {
  try {
    // Parse and validate input
    const body = await request.json()
    const validatedData = loginSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = validatedData.data

    // Find user with password
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session
    const sessionUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    await createSession(sessionUser)

    // Return response without password
    const { password: _, ...userData } = user
    return NextResponse.json(
      {
        message: 'Login successful',
        user: userData
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        error: 'Login failed',
        details: error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    )
  }
}