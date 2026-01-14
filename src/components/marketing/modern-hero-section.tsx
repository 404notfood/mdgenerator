'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react'

export function ModernHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-lg px-4 py-2 rounded-full border border-indigo-100 shadow-lg mb-8 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              Nouvelle architecture POO disponible
            </span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </div>

          {/* Main heading */}
          <h1 className="heading-hero text-gray-900 mb-6">
            Créez des{' '}
            <span className="text-gradient">README</span>
            <br />
            <span className="text-gradient">parfaits</span> en quelques clics
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            L'éditeur Markdown le plus puissant avec génération IA, templates premium et export professionnel. 
            Conçu pour les développeurs qui veulent aller vite.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link href="/auth/signup">
              <Button className="btn-primary text-lg px-10 py-6 group">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/editor">
              <Button className="btn-secondary text-lg px-10 py-6 group">
                <Code2 className="mr-2 w-5 h-5" />
                Essayer l'éditeur
              </Button>
            </Link>
          </div>

          {/* Features pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <FeaturePill icon={<Zap className="w-4 h-4" />} text="Génération IA instantanée" />
            <FeaturePill icon={<Code2 className="w-4 h-4" />} text="100+ Templates premium" />
            <FeaturePill icon={<Sparkles className="w-4 h-4" />} text="Export multi-formats" />
          </div>

          {/* Demo screenshot */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-2 border border-gray-200">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Code2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Éditeur en action
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Interface moderne avec prévisualisation en temps réel, 
                    suggestions IA et export professionnel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  )
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-indigo-600">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  )
}
