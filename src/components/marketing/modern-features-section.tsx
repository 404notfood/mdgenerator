'use client'

import React from 'react'
import { 
  Sparkles, 
  Code2, 
  Zap, 
  FileText, 
  Palette, 
  Shield,
  Layers,
  Users,
  GitBranch
} from 'lucide-react'

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Génération IA',
    description: 'Créez des README professionnels en quelques secondes avec notre IA intelligente.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Éditeur WYSIWYG',
    description: 'Interface intuitive avec prévisualisation en temps réel et coloration syntaxique.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: '100+ Templates',
    description: 'Bibliothèque complète de templates pour tous types de projets.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Export multi-formats',
    description: 'Exportez en HTML, Markdown, PDF ou directement vers GitHub.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Personnalisation',
    description: 'Badges, emojis, tableaux, diagrammes... tout est personnalisable.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Intégration GitHub',
    description: 'Importez vos repos GitHub et générez automatiquement la documentation.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Collaboration',
    description: 'Travaillez en équipe avec partage et gestion des permissions.',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Versioning',
    description: 'Historique complet avec restauration et comparaison de versions.',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Sécurisé',
    description: 'Vos données sont chiffrées et sauvegardées automatiquement.',
    gradient: 'from-red-500 to-pink-500'
  },
]

export function ModernFeaturesSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Fonctionnalités</span>
          </div>
          
          <h2 className="heading-2 text-gray-900 mb-6">
            Tout ce dont vous avez besoin
            <br />
            <span className="text-gradient">pour créer des docs parfaites</span>
          </h2>
          
          <p className="text-xl text-gray-600">
            Une suite complète d'outils pour générer, éditer et partager 
            votre documentation professionnelle
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Et bien plus encore... Découvrez toutes nos fonctionnalités
          </p>
          <button className="btn-secondary">
            Voir toutes les fonctionnalités
          </button>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient,
  index 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  index: number
}) {
  return (
    <div 
      className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
      
      {/* Icon */}
      <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gradient transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>

      {/* Hover arrow */}
      <div className="mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-sm font-semibold mr-2">En savoir plus</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}
