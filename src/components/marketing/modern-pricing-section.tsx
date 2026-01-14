'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Crown, Rocket } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    icon: <Sparkles className="w-6 h-6" />,
    price: '0',
    description: 'Parfait pour commencer',
    features: [
      '5 documents',
      'Templates gratuits',
      'Export Markdown',
      'Éditeur de base',
      'Support communautaire'
    ],
    cta: 'Commencer gratuitement',
    popular: false,
    gradient: 'from-gray-500 to-gray-700'
  },
  {
    name: 'Premium',
    icon: <Crown className="w-6 h-6" />,
    price: '9',
    description: 'Pour les professionnels',
    features: [
      'Documents illimités',
      '100+ templates premium',
      'Génération IA',
      'Export multi-formats',
      'Intégration GitHub',
      'Versioning',
      'Support prioritaire',
      'Collaboration en équipe'
    ],
    cta: 'Passer à Premium',
    popular: true,
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    icon: <Rocket className="w-6 h-6" />,
    price: 'Sur mesure',
    description: 'Pour les grandes équipes',
    features: [
      'Tout Premium inclus',
      'Support dédié 24/7',
      'SLA garantis',
      'Déploiement on-premise',
      'SSO / SAML',
      'Audit logs',
      'Formation équipe',
      'API dédiée'
    ],
    cta: 'Nous contacter',
    popular: false,
    gradient: 'from-pink-500 to-rose-600'
  }
]

export function ModernPricingSection() {
  return (
    <section className="section bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
            <Crown className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Tarifs</span>
          </div>
          
          <h2 className="heading-2 text-gray-900 mb-6">
            Des prix <span className="text-gradient">simples</span> et{' '}
            <span className="text-gradient">transparents</span>
          </h2>
          
          <p className="text-xl text-gray-600">
            Choisissez le plan qui correspond à vos besoins. 
            Changez ou annulez à tout moment.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            💳 Paiement sécurisé • 🔄 Sans engagement • 💯 Satisfait ou remboursé 30 jours
          </p>
          <p className="text-sm text-gray-500">
            Des questions sur les tarifs ?{' '}
            <a href="/contact" className="text-indigo-600 hover:underline font-semibold">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  name,
  icon,
  price,
  description,
  features,
  cta,
  popular,
  gradient
}: {
  name: string
  icon: React.ReactNode
  price: string
  description: string
  features: string[]
  cta: string
  popular: boolean
  gradient: string
}) {
  return (
    <div className={`relative ${popular ? 'md:scale-110 z-10' : ''}`}>
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`bg-gradient-to-r ${gradient} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            ⭐ Le plus populaire
          </div>
        </div>
      )}

      <div className={`relative bg-white rounded-3xl p-8 border-2 ${popular ? 'border-indigo-600' : 'border-gray-200'} hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
        {/* Header */}
        <div className="mb-6">
          <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white mb-4`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Price */}
        <div className="mb-8">
          {price === 'Sur mesure' ? (
            <div className="text-4xl font-bold text-gray-900">{price}</div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-gray-900">{price}€</span>
              <span className="text-gray-600 ml-2">/mois</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`w-6 h-6 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5`}>
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={popular ? '/auth/signup' : '/contact'}>
          <Button 
            className={
              popular 
                ? 'btn-primary w-full text-lg py-6' 
                : 'btn-secondary w-full text-lg py-6'
            }
          >
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  )
}
