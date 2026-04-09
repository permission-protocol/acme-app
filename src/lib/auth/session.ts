// E2E Test: Auth session management
export const SESSION_CONFIG = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax' as const,
};

export function validateSession(token: string): boolean {
  // Session validation logic
  return token.length > 0 && !token.includes('invalid');
}
