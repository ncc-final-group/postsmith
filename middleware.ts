import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const agent = userAgent(request);

  return NextResponse.next({ headers: { x1: 'PostSmith' } });
}

export const config = { matcher: ['/home/:path*', '/:path*'] };
