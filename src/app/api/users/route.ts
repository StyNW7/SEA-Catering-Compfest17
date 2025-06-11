import { NextRequest } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify({ data: users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
    status: 500,
    });
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      },
    });
    return new Response(JSON.stringify({ data: user }), {
      status: 201,
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 400,
    });
  }
}