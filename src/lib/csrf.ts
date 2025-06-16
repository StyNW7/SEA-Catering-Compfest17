/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomBytes } from 'crypto';
import { serialize, parse } from 'cookie';

export async function createCsrfToken(): Promise<string> {
  return randomBytes(32).toString('hex');
}

export async function verifyCsrfToken(token: string, cookieToken: string): Promise<boolean> {
  return token === cookieToken;
}