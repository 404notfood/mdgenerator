import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (en production, utiliser Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Configuration rate limiting par endpoint
const rateLimits = {
  '/api/upload': { requests: 10, windowMs: 15 * 60 * 1000 }, // 10 uploads per 15 min
  '/api/payments': { requests: 5, windowMs: 10 * 60 * 1000 }, // 5 payments per 10 min
  '/api/auth': { requests: 20, windowMs: 15 * 60 * 1000 }, // 20 auth requests per 15 min
  '/api/export': { requests: 50, windowMs: 10 * 60 * 1000 }, // 50 exports per 10 min
  '/api/templates': { requests: 100, windowMs: 60 * 1000 }, // 100 template requests per min
  default: { requests: 100, windowMs: 60 * 1000 } // Default limit
}

function getRateLimit(pathname: string) {
  for (const [path, limit] of Object.entries(rateLimits)) {
    if (pathname.startsWith(path)) {
      return limit
    }
  }
  return rateLimits.default
}

function checkRateLimit(ip: string, pathname: string): boolean {
  const now = Date.now()
  const limit = getRateLimit(pathname)
  const key = `${ip}:${pathname}`
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    // Reset window
    rateLimitStore.set(key, { count: 1, resetTime: now + limit.windowMs })
    return true
  }
  
  if (record.count >= limit.requests) {
    return false
  }
  
  record.count++
  return true
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get client IP
  const ip = request.ip || 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    'unknown'
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // CSP for better security
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    "connect-src 'self' https:",
    "frame-ancestors 'none'"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // HSTS (HTTP Strict Transport Security)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (!checkRateLimit(ip, request.nextUrl.pathname)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': getRateLimit(request.nextUrl.pathname).requests.toString(),
          'X-RateLimit-Remaining': '0'
        }
      })
    }
    
    // Add rate limit headers to successful responses
    const limit = getRateLimit(request.nextUrl.pathname)
    response.headers.set('X-RateLimit-Limit', limit.requests.toString())
    response.headers.set('X-RateLimit-Window', (limit.windowMs / 1000).toString())
  }
  
  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? process.env.AUTH_URL || '' : '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers })
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|uploads).*)',
  ],
}