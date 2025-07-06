import { get } from 'http'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getCurrentUser } from './lib/session'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        await getCurrentUser()
        return NextResponse.next()
    } catch (err) {
        console.error(err)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!login|signup|_next/static|_next/image|favicon.ico).*)',
  ],
}