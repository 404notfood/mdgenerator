'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Github, ExternalLink } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'GitHub', href: 'https://github.com', external: true }
]

export function PrismaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`navbar-prisma ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[var(--color-bg-dark)] font-bold text-lg">M</span>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-[var(--color-text-primary)]">
                Markdown<span className="text-gradient">Pro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="nav-link flex items-center gap-1"
                >
                  {item.label}
                  {item.external && <ExternalLink className="w-3 h-3" />}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/signin" className="btn-ghost">
                Se connecter
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                Commencer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-dark)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--color-text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--color-text-primary)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 md:hidden">
          <div className="container-custom py-4">
            <div className="glass rounded-2xl p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.external && <ExternalLink className="w-4 h-4" />}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--color-border-dark)] space-y-2">
                <Link
                  href="/auth/signin"
                  className="block px-4 py-3 text-center rounded-xl border border-[var(--color-border-dark)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth/signup"
                  className="block btn-primary w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Commencer
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
