'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Github, ExternalLink, User, LogOut, Crown, LayoutDashboard } from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'

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
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const user = session?.user
  const isPremium = user && ((user as any).role === 'PREMIUM' || (user as any).role === 'ADMIN')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut({ fetchOptions: { onSuccess: () => window.location.href = '/' } })
  }

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
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--color-surface-dark)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-[var(--color-bg-dark)] font-bold text-sm">
                      {user.name?.[0] || user.email?.[0] || 'U'}
                    </div>
                    <span className="text-[var(--color-text-primary)] font-medium max-w-[120px] truncate">
                      {user.name || 'Utilisateur'}
                    </span>
                    {isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                    <ChevronDown className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl p-2 shadow-xl border border-[var(--color-border-dark)]">
                      <div className="px-3 py-2 border-b border-[var(--color-border-dark)] mb-2">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{user.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/editor"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Éditeur
                      </Link>
                      {!isPremium && (
                        <Link
                          href="/pricing"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Crown className="w-4 h-4" />
                          Passer Premium
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth/signin" className="btn-ghost">
                    Se connecter
                  </Link>
                  <Link href="/auth/signup" className="btn-primary">
                    Commencer
                  </Link>
                </>
              )}
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
                {user ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-[var(--color-bg-dark)] font-bold">
                        {user.name?.[0] || user.email?.[0] || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--color-text-primary)] truncate">{user.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{user.email}</p>
                      </div>
                      {isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/editor"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-dark)] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Éditeur
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
