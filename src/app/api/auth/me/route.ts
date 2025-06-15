import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/session'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user: session.user }, { status: 200 })
  } catch (error) {
    console.error('Error in /api/auth/me:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}