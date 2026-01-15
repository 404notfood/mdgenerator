'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Code2,
  Zap,
  Check,
  Crown,
  Rocket,
  Github,
  Twitter,
  Linkedin,
  FileText,
  Palette,
  Download,
  BarChart3,
  Trophy,
  Flame,
  Activity,
  Terminal,
  Wand2,
  Layers,
  Shield,
  Globe,
  Clock,
  Star,
  Users,
  Copy,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { PrismaNavbar } from '@/components/layout/prisma-navbar'
import { WidgetShowcase } from '@/components/widgets/github-widgets'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      <main>
        {/* Hero Section - Prisma Style */}
        <section className="relative min-h-screen flex items-center justify-center dark-veil dark-veil-intense overflow-hidden">
          {/* Animated orbs */}
          <div className="orb orb-teal w-[600px] h-[600px] -top-40 -right-40 animate-float" />
          <div className="orb orb-purple w-[400px] h-[400px] bottom-20 -left-20" style={{ animationDelay: '2s' }} />
          <div className="orb orb-cyan w-[300px] h-[300px] top-1/3 right-1/4" style={{ animationDelay: '4s' }} />

          <div className="container-custom relative z-10 pt-32 pb-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Floating Badge */}
              <div className="badge-floating inline-flex animate-fade-in-up" style={{ opacity: 0 }}>
                <Sparkles className="w-4 h-4" />
                <span>v2.0 - Design Prisma + Widgets GitHub</span>
              </div>

              {/* Main Title */}
              <h1 className="hero-title animate-fade-in-up stagger-1" style={{ opacity: 0 }}>
                Créez des{' '}
                <span className="text-gradient">README</span>
                <br />
                qui{' '}
                <span className="text-gradient-purple">impressionnent</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
                L'éditeur Markdown nouvelle génération avec widgets GitHub intégrés,
                génération IA et templates premium. Conçu pour les développeurs modernes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
                <Link href="/auth/signup" className="btn-primary group">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  className="btn-code group"
                  onClick={() => navigator.clipboard.writeText('npx create-readme')}
                >
                  <span className="prefix">$</span>
                  <span>npx create-readme</span>
                  <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)] animate-fade-in-up stagger-4" style={{ opacity: 0 }}>
                <TrustBadge icon={<Zap className="w-4 h-4" />} text="Setup en 30s" />
                <TrustBadge icon={<Shield className="w-4 h-4" />} text="Open Source" />
                <TrustBadge icon={<Users className="w-4 h-4" />} text="10k+ utilisateurs" />
                <TrustBadge icon={<Star className="w-4 h-4" />} text="4.9/5 rating" />
              </div>

              {/* Demo Preview */}
              <div className="mt-20 relative animate-fade-in-up stagger-5" style={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <div className="relative glass rounded-3xl p-1.5">
                  <div className="bg-[var(--color-surface-dark)] rounded-2xl overflow-hidden">
                    {/* Browser Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-bg-darker)] border-b border-[var(--color-border-dark)]">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1 rounded-md bg-[var(--color-surface-dark)] text-xs text-[var(--color-text-muted)]">
                          markdownpro.dev/editor
                        </div>
                      </div>
                    </div>
                    {/* Editor Preview */}
                    <div className="p-8 min-h-[350px] flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center animate-pulse-glow">
                          <Code2 className="w-10 h-10 text-[var(--color-bg-dark)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                          Éditeur WYSIWYG
                        </h3>
                        <p className="text-[var(--color-text-muted)] max-w-md">
                          Interface intuitive avec prévisualisation temps réel,
                          widgets GitHub drag & drop et export multi-formats
                        </p>
                        <Link href="/editor" className="btn-secondary inline-flex">
                          Essayer maintenant
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-[var(--color-border-dark)] flex items-start justify-center p-2">
              <div className="w-1 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="section-padding relative overflow-hidden">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="badge-floating inline-flex mb-4">
                <Layers className="w-4 h-4" />
                <span>Fonctionnalités</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                Tout ce qu'il faut pour des{' '}
                <span className="text-gradient">README parfaits</span>
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Une suite complète d'outils pour créer, personnaliser et partager
                votre documentation
              </p>
            </div>

            <div className="bento-grid">
              {/* Large Card - AI Generation */}
              <div className="card-bento card-bento-highlight bento-large">
                <div className="flex items-start justify-between mb-6">
                  <div className="feature-icon">
                    <Wand2 className="w-6 h-6" />
                  </div>
                  <span className="badge-floating text-xs py-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  Génération IA Intelligente
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Décrivez votre projet et laissez l'IA générer un README professionnel
                  avec badges, structure et documentation technique.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Structure auto', 'Badges', 'Documentation', 'Sections'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regular Cards */}
              <BentoCard
                icon={<Code2 className="w-5 h-5" />}
                title="Éditeur WYSIWYG"
                description="Interface intuitive avec TipTap, coloration syntaxique et prévisualisation temps réel."
              />

              <BentoCard
                icon={<BarChart3 className="w-5 h-5" />}
                title="Widgets GitHub"
                description="Stats, langages, streak, trophées et plus de 8 widgets intégrables en un clic."
              />

              <BentoCard
                icon={<Palette className="w-5 h-5" />}
                title="Templates Pro"
                description="Templates professionnels pour tous types de projets : API, startup, open source."
              />

              <BentoCard
                icon={<Download className="w-5 h-5" />}
                title="Export Multi-formats"
                description="Exportez en Markdown, HTML, PDF ou directement vers GitHub."
              />

              <BentoCard
                icon={<Globe className="w-5 h-5" />}
                title="Import GitHub"
                description="Importez directement vos repos et générez un README adapté automatiquement."
              />
            </div>
          </div>
        </section>

        {/* GitHub Widgets Section */}
        <section className="section-padding relative overflow-hidden bg-[var(--color-bg-darker)]">
          <div className="orb orb-teal w-[400px] h-[400px] top-0 right-0 opacity-30" />

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="badge-floating inline-flex mb-4">
                  <Activity className="w-4 h-4" />
                  <span>Nouveau</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
                  Widgets GitHub{' '}
                  <span className="text-gradient">intégrés</span>
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                  Ajoutez en un clic des statistiques, contributions, langages et
                  trophées à votre README. 8+ widgets personnalisables avec 12 thèmes.
                </p>

                <div className="space-y-4 mb-8">
                  <WidgetFeature
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="GitHub Stats"
                    description="Commits, PRs, issues et stars"
                  />
                  <WidgetFeature
                    icon={<Flame className="w-5 h-5" />}
                    title="Streak Stats"
                    description="Série de contributions consécutives"
                  />
                  <WidgetFeature
                    icon={<Trophy className="w-5 h-5" />}
                    title="Trophées"
                    description="Badges d'achievements GitHub"
                  />
                  <WidgetFeature
                    icon={<Activity className="w-5 h-5" />}
                    title="Activity Graph"
                    description="Graphique de contributions"
                  />
                </div>

                <Link href="/editor" className="btn-primary inline-flex">
                  Essayer les widgets
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <WidgetShowcase />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding relative overflow-hidden">
          <div className="container-custom mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="badge-floating inline-flex mb-4">
                <Users className="w-4 h-4" />
                <span>Témoignages</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                Adopté par des{' '}
                <span className="text-gradient">milliers</span>{' '}
                de développeurs
              </h2>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="testimonial-mask testimonial-mask-left" />
            <div className="testimonial-mask testimonial-mask-right" />

            <div className="testimonial-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section-padding relative overflow-hidden bg-[var(--color-bg-darker)]">
          <div className="orb orb-purple w-[500px] h-[500px] -bottom-40 -left-40 opacity-30" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="badge-floating inline-flex mb-4">
                <Crown className="w-4 h-4" />
                <span>Tarifs</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                Des prix{' '}
                <span className="text-gradient">simples</span>{' '}
                et transparents
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Commencez gratuitement, passez à Premium quand vous êtes prêt
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                name="Free"
                price="0"
                description="Pour découvrir"
                features={[
                  '5 documents',
                  'Templates gratuits',
                  'Export Markdown',
                  '3 widgets GitHub',
                  'Support communauté'
                ]}
                cta="Commencer"
                href="/auth/signup"
              />

              <PricingCard
                name="Premium"
                price="9"
                description="Pour les pros"
                features={[
                  'Documents illimités',
                  'Templates premium inclus',
                  'Génération IA illimitée',
                  'Tous les widgets GitHub',
                  'Export multi-formats',
                  'Support prioritaire'
                ]}
                cta="Passer à Premium"
                href="/pricing"
                popular
              />

              <PricingCard
                name="Team"
                price="Sur mesure"
                description="Pour les équipes"
                features={[
                  'Tout Premium inclus',
                  'Collaboration équipe',
                  'SSO / SAML',
                  'API dédiée',
                  'Support 24/7'
                ]}
                cta="Nous contacter"
                href="/contact"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10" />
          <div className="orb orb-teal w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-20" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
                Prêt à créer des{' '}
                <span className="text-gradient">README parfaits</span> ?
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
                Rejoignez plus de 10,000 développeurs. Gratuit pour toujours,
                aucune carte bancaire requise.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 group">
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/templates" className="btn-secondary text-lg px-8 py-4">
                  Voir les templates
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-[var(--color-text-muted)]">
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  Gratuit à vie
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  Sans carte bancaire
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                  Setup en 30 secondes
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-prisma py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-[var(--color-bg-dark)] font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold text-[var(--color-text-primary)]">
                  MarkdownPro
                </span>
              </Link>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-xs">
                L'éditeur Markdown nouvelle génération pour créer des README professionnels
                avec widgets GitHub et génération IA.
              </p>
              <div className="flex gap-3">
                <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
                <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
                <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
              </div>
            </div>

            <FooterColumn
              title="Produit"
              links={[
                { name: 'Fonctionnalités', href: '/features' },
                { name: 'Templates', href: '/templates' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Changelog', href: '/changelog' }
              ]}
            />

            <FooterColumn
              title="Ressources"
              links={[
                { name: 'Documentation', href: '/docs' },
                { name: 'API', href: '/api' },
                { name: 'Blog', href: '/blog' },
                { name: 'Support', href: '/support' }
              ]}
            />

            <FooterColumn
              title="Légal"
              links={[
                { name: 'Confidentialité', href: '/privacy' },
                { name: 'CGU', href: '/terms' },
                { name: 'Cookies', href: '/cookies' }
              ]}
            />
          </div>

          <div className="pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              2026 MarkdownPro. Tous droits réservés. Fait avec le coeur pour les développeurs.
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Tous les systèmes opérationnels
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ==========================================
// Sub-components
// ==========================================

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[var(--color-primary)]">{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function BentoCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card-bento">
      <div className="feature-icon mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  )
}

function WidgetFeature({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="feature-icon-outline w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>
    </div>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  popular
}: {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  href: string
  popular?: boolean
}) {
  return (
    <div className={`pricing-card ${popular ? 'pricing-popular' : ''}`}>
      {popular && <div className="pricing-badge">Le plus populaire</div>}

      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
        {name}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">{description}</p>

      <div className="mb-8">
        {price === 'Sur mesure' ? (
          <span className="text-3xl font-bold text-[var(--color-text-primary)]">{price}</span>
        ) : (
          <>
            <span className="text-4xl font-bold text-[var(--color-text-primary)]">{price}</span>
            <span className="text-[var(--color-text-muted)] ml-1">/mois</span>
          </>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`block text-center w-full py-3 rounded-xl font-semibold transition-all ${
          popular
            ? 'btn-primary'
            : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-dark)]'
        }`}
      >
        {cta}
      </Link>
    </div>
  )
}

function TestimonialCard({
  name,
  role,
  company,
  avatar,
  content
}: {
  name: string
  role: string
  company: string
  avatar: string
  content: string
}) {
  return (
    <div className="testimonial-card">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={name}
          className="testimonial-avatar"
        />
        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">{name}</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {role} @ {company}
          </p>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">{content}</p>
    </div>
  )
}

function FooterColumn({
  title,
  links
}: {
  title: string
  links: { name: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="footer-link">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] transition-all"
    >
      {icon}
    </a>
  )
}

// Testimonials data
const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Staff Engineer',
    company: 'Vercel',
    avatar: 'https://i.pravatar.cc/100?img=1',
    content: 'MarkdownPro a transformé ma façon de documenter mes projets. Les widgets GitHub sont incroyables !'
  },
  {
    name: 'Alex Rodriguez',
    role: 'Tech Lead',
    company: 'Stripe',
    avatar: 'https://i.pravatar.cc/100?img=2',
    content: 'La génération IA est bluffante. Je gagne des heures sur chaque nouveau projet open source.'
  },
  {
    name: 'Marie Dubois',
    role: 'Indie Hacker',
    company: 'ProductHunt',
    avatar: 'https://i.pravatar.cc/100?img=3',
    content: 'Enfin un outil qui comprend les besoins des développeurs. Le design Prisma est magnifique.'
  },
  {
    name: 'Thomas Weber',
    role: 'Senior Dev',
    company: 'GitHub',
    avatar: 'https://i.pravatar.cc/100?img=4',
    content: 'Les templates sont de qualité professionnelle. Je recommande à toute mon équipe.'
  },
  {
    name: 'Yuki Tanaka',
    role: 'Founder',
    company: 'DevTools.io',
    avatar: 'https://i.pravatar.cc/100?img=5',
    content: 'L\'export direct vers GitHub et les badges automatiques sont des game changers.'
  },
  {
    name: 'Emma Wilson',
    role: 'OSS Maintainer',
    company: 'React',
    avatar: 'https://i.pravatar.cc/100?img=6',
    content: 'Simple, rapide, efficace. Exactement ce qu\'il me fallait pour mes projets OSS.'
  }
]
