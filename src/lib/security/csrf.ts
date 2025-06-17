// Helper to generate a secure random token
async function generateRandomToken(): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for Node.js environments
  if (typeof process !== 'undefined' && typeof window === 'undefined') {
    const { randomBytes } = await import('crypto');
    return randomBytes(32).toString('hex');
  }
  throw new Error('No secure random number generator available');
}

// Generates a new unique token and returns it
export async function createNewCsrfToken(): Promise<string> {
  return generateRandomToken();
}

// Validates the client-sent token against the HTTP-only cookie token
// This is used by API routes or server actions.
export function validateCsrfToken(clientToken: string | null | undefined, httpOnlyCookieToken: string | null | undefined): boolean {
  if (!clientToken || !httpOnlyCookieToken) {
    console.warn("CSRF Validation: Missing client or cookie token.", { clientToken, httpOnlyCookieToken });
    return false;
  }
  const isValid = clientToken === httpOnlyCookieToken;
  if (!isValid) {
    console.warn("CSRF Validation: Token mismatch.", { clientToken, httpOnlyCookieToken });
  }
  return isValid;
}

// Helper to get cookies from a NextRequest object's headers
// This is for use in middleware or route handlers
export function getCookieFromRequest(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const cookie = cookies.find(c => c.startsWith(`${name}=`));
  return cookie ? cookie.substring(name.length + 1) : undefined;
}
