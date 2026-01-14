'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function ModernCTASection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Rejoignez plus de 10,000 développeurs
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Prêt à créer des{' '}
            <span className="relative">
              <span className="relative z-10">README parfaits</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-400/30 -rotate-1"></span>
            </span>
            {' '}?
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Commencez gratuitement dès aujourd'hui. Aucune carte bancaire requise. 
            Passez à Premium quand vous êtes prêt.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/auth/signup">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-6 px-10 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg group">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/templates">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-6 px-10 rounded-lg transition-all duration-300 text-lg">
                Voir les templates
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80">
            <TrustIndicator icon="✓" text="Gratuit à vie" />
            <TrustIndicator icon="⚡" text="Configuration en 30 secondes" />
            <TrustIndicator icon="🔒" text="Vos données sécurisées" />
            <TrustIndicator icon="💳" text="Sans carte bancaire" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 8.3C120 16.7 240 33.3 360 41.7C480 50 600 50 720 45C840 40 960 30 1080 26.7C1200 23.3 1320 26.7 1380 28.3L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

function TrustIndicator({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  )
}
