import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Temporary redirect middleware for registry-locked domain
 * 
 * While utils4you.in is registry-locked by NIXI, this middleware
 * redirects all production traffic to the temporary Vercel URL.
 * 
 * Uses HTTP 302 (temporary redirect) for SEO safety.
 * Preserves original path and query parameters.
 */

// Temporary production URL
const TEMP_URL = 'https://mydailytools-pi.vercel.app';

// Locked production domain
const LOCKED_DOMAIN = 'utils4you.in';

export function middleware(request: NextRequest) {
    const { hostname, pathname, search } = request.nextUrl;

    // Only redirect in production when request comes from the locked domain
    if (process.env.NODE_ENV === 'production' && hostname.includes(LOCKED_DOMAIN)) {
        // Build the redirect URL with preserved path and query params
        const redirectUrl = `${TEMP_URL}${pathname}${search}`;

        // Return HTTP 302 (temporary redirect)
        return NextResponse.redirect(redirectUrl, 302);
    }

    // Allow request to continue normally in development or from other domains
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*',
};
