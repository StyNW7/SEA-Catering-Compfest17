/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const algorithm = 'aes-256-cbc'

// Validate session secret exists and is the correct length
function getSessionSecret(): Buffer {
  const secretKey = process.env.SESSION_SECRET
  if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  
  // Hex string should be 32 bytes (64 characters)
  if (secretKey.length !== 64) {
    throw new Error('SESSION_SECRET must be 64-character hex string (32 bytes)')
  }

  return Buffer.from(secretKey, 'hex')
}

export async function encrypt(payload: any): Promise<string> {
  try {
    const iv = randomBytes(16)
    const secretKey = getSessionSecret()
    const cipher = createCipheriv(algorithm, secretKey, iv)
    
    let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    return `${iv.toString('hex')}:${encrypted}`
  } catch (error) {
    console.error('Encryption failed:', error)
    throw new Error('Failed to encrypt session data')
  }
}

export async function decrypt(session: string): Promise<any> {
  try {
    const [ivHex, encrypted] = session.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const secretKey = getSessionSecret()
    
    const decipher = createDecipheriv(algorithm, secretKey, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt session data')
  }
}