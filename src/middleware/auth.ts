import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Validate token expiry
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
