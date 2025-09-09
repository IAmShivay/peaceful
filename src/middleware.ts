import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple middleware - authentication will be handled in components
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
