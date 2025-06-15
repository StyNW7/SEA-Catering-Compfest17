import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/session'

export async function POST() {
  try {
    await destroySession()
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}