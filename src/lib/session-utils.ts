/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { env } from '@/../env'

// Use Web Crypto API available in both Node and Edge
const crypto = globalThis.crypto || require('@peculiar/webcrypto').Crypto

// Validate session secret exists and is the correct length
function getSessionKey(): Promise<CryptoKey> {
  const secretKey = env.SESSION_SECRET
  if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  
  // Hex string should be 32 bytes (64 characters)
  if (secretKey.length !== 64) {
    throw new Error('SESSION_SECRET must be 64-character hex string (32 bytes)')
  }

  // Convert hex string to ArrayBuffer
  const keyBuffer = new Uint8Array(
    secretKey.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  return crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encrypt(payload: any): Promise<string> {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(16))
    const key = await getSessionKey()
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      key,
      new TextEncoder().encode(JSON.stringify(payload))
    )
    
    return `${Buffer.from(iv).toString('hex')}:${Buffer.from(new Uint8Array(encrypted)).toString('hex')}`
  } catch (error) {
    console.error('Encryption failed:', error)
    throw new Error('Failed to encrypt session data')
  }
}

export async function decrypt(session: string): Promise<any> {
  try {
    const [ivHex, encryptedHex] = session.split(':')
    const iv = Uint8Array.from(Buffer.from(ivHex, 'hex'))
    const encrypted = Uint8Array.from(Buffer.from(encryptedHex, 'hex'))
    const key = await getSessionKey()
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      encrypted
    )
    
    return JSON.parse(new TextDecoder().decode(decrypted))
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt session data')
  }
}