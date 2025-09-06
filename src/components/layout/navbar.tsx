"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth/auth-button"
import { FileText, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Éditeur", href: "/editor" },
  { name: "Templates", href: "/templates" },
  { name: "Premium", href: "/premium-demo" },
  { name: "Tarifs", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              README Generator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}