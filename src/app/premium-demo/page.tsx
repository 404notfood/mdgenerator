'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Crown, 
  Shield, 
  Star, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react'

export default function PremiumDemoPage() {
  const badgeExamples = [
    {
      title: 'Build Status',
      image: 'https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github',
      code: '![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github)'
    },
    {
      title: 'Version',
      image: 'https://img.shields.io/badge/Version-v2.1.0-blue?style=flat-square',
      code: '![Version](https://img.shields.io/badge/Version-v2.1.0-blue?style=flat-square)'
    },
    {
      title: 'Downloads',
      image: 'https://img.shields.io/badge/Downloads-100K+-green?style=plastic&logo=download',
      code: '![Downloads](https://img.shields.io/badge/Downloads-100K+-green?style=plastic&logo=download)'
    },
    {
      title: 'License',
      image: 'https://img.shields.io/badge/License-MIT-yellow?style=social',
      code: '![License](https://img.shields.io/badge/License-MIT-yellow?style=social)'
    }
  ]

  const calloutExamples = [
    {
      type: 'note',
      title: 'Note',
      content: 'Ceci est une note importante pour vos utilisateurs.',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500',
      icon: Info
    },
    {
      type: 'tip',
      title: 'Tip',
      content: 'Voici un conseil utile pour améliorer l\'utilisation.',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-500',
      icon: CheckCircle
    },
    {
      type: 'important',
      title: 'Important',
      content: 'Information cruciale à ne pas manquer.',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-l-purple-500',
      icon: Star
    },
    {
      type: 'warning',
      title: 'Warning',
      content: 'Attention, cette action peut avoir des conséquences.',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-l-yellow-500',
      icon: AlertTriangle
    },
    {
      type: 'caution',
      title: 'Caution',
      content: 'Danger ! Procédez avec une extrême prudence.',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-l-red-500',
      icon: AlertTriangle
    }
  ]

  const techIcons = [
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Crown className="w-12 h-12 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900">
            Fonctionnalités Premium
          </h1>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Découvrez nos outils avancés pour créer des README professionnels qui se démarquent.
          Badges dynamiques, callouts GitHub natifs, et palette d'icônes complète.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/pricing">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade vers Premium
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/editor">
              Essayer l'éditeur
            </Link>
          </Button>
        </div>
      </div>

      {/* Badges Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Badges Dynamiques</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Créez des badges personnalisés avec shields.io. Choisissez parmi différents styles, 
            couleurs, et icônes pour afficher vos métriques projet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {badgeExamples.map((badge, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{badge.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <img src={badge.image} alt={badge.title} className="mx-auto" />
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <code className="text-sm text-green-400 font-mono">
                    {badge.code}
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Générateur de badges intégré
              </h3>
              <p className="text-blue-800 text-sm">
                Interface intuitive pour créer vos badges : choisissez le style, les couleurs, 
                l'icône et le lien. Aperçu en temps réel et insertion automatique dans l'éditeur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Callouts Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-900">Callouts GitHub</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilisez les callouts natifs de GitHub pour mettre en valeur l'information importante.
            5 types disponibles avec couleurs et icônes distinctives.
          </p>
        </div>

        <div className="space-y-4">
          {calloutExamples.map((callout, index) => {
            const Icon = callout.icon
            return (
              <div key={index} className="grid md:grid-cols-2 gap-4 items-center">
                <div className={`p-4 rounded-lg border-l-4 ${callout.bgColor} ${callout.borderColor}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${callout.color}`} />
                    <strong className={callout.color}>
                      {callout.title}
                    </strong>
                  </div>
                  <p className={`text-sm ${callout.color}`}>
                    {callout.content}
                  </p>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <code className="text-sm text-green-400 font-mono">
                    {`> [!${callout.type.toUpperCase()}] ${callout.title}\n> ${callout.content}`}
                  </code>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">
                Support natif GitHub
              </h3>
              <p className="text-yellow-800 text-sm">
                Ces callouts sont rendus nativement par GitHub avec les couleurs et icônes officielles.
                Parfait pour la documentation technique et les guides d'utilisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Palette d'Icônes</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accédez à des centaines d'icônes DevIcons pour illustrer votre stack technique.
            Organisées par catégories pour un accès rapide.
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
          {techIcons.map((icon, index) => (
            <div key={index} className="text-center">
              <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={icon.url} 
                  alt={icon.name} 
                  className="w-8 h-8 mx-auto mb-2"
                />
                <span className="text-xs text-gray-600">{icon.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {['Technologies', 'Outils', 'Bases de données', 'Cloud & DevOps'].map((category, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">{category}</h3>
                <p className="text-sm text-gray-600">
                  {index === 0 && '50+ icônes'}
                  {index === 1 && '30+ icônes'}
                  {index === 2 && '20+ icônes'}
                  {index === 3 && '25+ icônes'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                Insertion automatique
              </h3>
              <p className="text-purple-800 text-sm">
                Cliquez sur une icône pour l'insérer automatiquement dans votre README.
                Taille et alignement optimisés pour une présentation professionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
          <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-4">
            Prêt à créer des README exceptionnels ?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers de développeurs qui utilisent nos outils premium 
            pour créer une documentation professionnelle qui impressionne.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/pricing">
                Voir les tarifs
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/templates">
                Parcourir les templates
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}