'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Fonctionnalités', href: '/features' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
    { name: 'Éditeur', href: '/editor' },
    { name: 'Changelog', href: '/changelog' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Guides', href: '/guides' },
    { name: 'Blog', href: '/blog' },
    { name: 'API', href: '/api' },
    { name: 'Support', href: '/support' },
  ],
  company: [
    { name: 'À propos', href: '/about' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partenaires', href: '/partners' },
  ],
  legal: [
    { name: 'Confidentialité', href: '/privacy' },
    { name: 'CGU', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Sécurité', href: '/security' },
  ],
}

const socialLinks = [
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@markdownpro.com' },
]

export function ModernFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Markdown Pro
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              L'éditeur Markdown le plus puissant pour créer des README professionnels 
              avec génération IA et templates premium.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <FooterColumn title="Produit" links={footerLinks.product} />
          <FooterColumn title="Ressources" links={footerLinks.resources} />
          <FooterColumn title="Entreprise" links={footerLinks.company} />
          <FooterColumn title="Légal" links={footerLinks.legal} />
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2026 Markdown Pro - <a href="https://404notfood.fr" target="_blank"  className="text-gray-500 hover:text-white transition-colors">404 Not Food</a>. Tous droits réservés.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-500">Fait avec pour les développeurs</span>
              <span className="text-gray-600">•</span>
              <a href="/status" className="text-gray-500 hover:text-white transition-colors">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Tous les systèmes opérationnels
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-200 block"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
