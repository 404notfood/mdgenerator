import { NextRequest } from 'next/server'
import crypto from 'crypto'

// CSRF Protection
const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production'

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, secret: string = CSRF_SECRET): boolean {
  if (!token || token.length !== 64) {
    return false
  }
  
  try {
    // Simple validation - en production, utiliser un système plus robuste
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(token.slice(0, 32))
    const expected = hmac.digest('hex')
    return crypto.timingSafeEqual(Buffer.from(token.slice(32)), Buffer.from(expected))
  } catch {
    return false
  }
}

// Input validation
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS vectors
    .trim()
    .slice(0, 1000) // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

export function validatePassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128
}

// File upload security
export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

export function validateFileSize(size: number, maxSize: number): boolean {
  return size > 0 && size <= maxSize
}

// Request validation
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  
  if (!origin && !referer) {
    return false
  }
  
  const allowedOrigins = [
    process.env.AUTH_URL,
    process.env.NEXT_PUBLIC_AUTH_URL,
    'http://localhost:3000',
    'https://localhost:3000'
  ].filter(Boolean)
  
  return allowedOrigins.some(allowed => 
    origin?.startsWith(allowed) || referer?.startsWith(allowed)
  )
}

// Content filtering
export function containsSuspiciousContent(content: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i,
    /eval\(/i,
    /document\.cookie/i,
    /localStorage/i,
    /sessionStorage/i
  ]
  
  return suspiciousPatterns.some(pattern => pattern.test(content))
}

// Database query safety
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Generate secure filename
export function generateSecureFilename(originalFilename: string): string {
  const extension = originalFilename.split('.').pop()?.toLowerCase()
  const timestamp = Date.now()
  const randomBytes = crypto.randomBytes(8).toString('hex')
  
  return `${timestamp}-${randomBytes}.${extension}`
}

// Verify webhook signatures (for Revolut and other services)
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(payload)
    const expectedSignature = 'sha256=' + hmac.digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

// Rate limiting helper
export function createRateLimitKey(ip: string, userId?: string, action?: string): string {
  const base = userId || ip
  return action ? `${base}:${action}` : base
}

// Session security
export function generateSecureSessionId(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function isSecureContext(request: NextRequest): boolean {
  return request.nextUrl.protocol === 'https:' || 
         request.nextUrl.hostname === 'localhost' ||
         request.nextUrl.hostname === '127.0.0.1'
}