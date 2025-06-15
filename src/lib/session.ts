import { cookies } from 'next/headers'
import { encrypt, decrypt } from './session-utils'

export type User = {
  id: string
  name: string | null
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export async function getServerSession() {
    
  const session = (await cookies()).get('session')?.value
  if (!session) return null

  try {
    const parsed = await decrypt(session)
    return parsed as { user: User }
  } catch (error) {
    console.error('Failed to parse session:', error)
    return null
  }
}

export async function createSession(user: User) {
  try {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
    const session = await encrypt({ user })

    ;(await cookies()).set('session', session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    })
  } catch (error) {
    console.error('Session creation failed:', error)
    throw new Error('Failed to create session')
  }
}

export async function destroySession() {
  (await cookies()).delete('session')
}