'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePermissions } from '@/hooks/use-permissions'
import {
  Star,
  Shield,
  Award,
  Code,
  Download,
  Users,
  Zap,
  Heart,
  GitBranch,
  Package,
  Lock,
  Crown,
  AlertTriangle,
  Info,
  CheckCircle,
  // X,
  Plus,
  BarChart3,
  Activity
} from 'lucide-react'
import { BadgeGenerator as ModernBadgeGenerator } from './badge-generator'
import { GitHubWidgetSelector } from '@/components/widgets/github-widgets'

// Types pour les badges dynamiques
export interface DynamicBadge {
  id: string
  label: string
  message: string
  color: string
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social'
  icon?: string
  logoColor?: string
  labelColor?: string
  messageColor?: string
  link?: string
}

// Types pour les callouts
export type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution'

export interface Callout {
  id: string
  type: CalloutType
  title: string
  content: string
}

// Configuration des callouts
const calloutConfig: Record<CalloutType, { 
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  borderColor: string
  title: string 
}> = {
  note: {
    icon: Info,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    title: 'Note'
  },
  tip: {
    icon: CheckCircle,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    title: 'Tip'
  },
  important: {
    icon: Star,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    title: 'Important'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    title: 'Warning'
  },
  caution: {
    icon: AlertTriangle,
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    title: 'Caution'
  }
}

// Icônes populaires pour les badges
const popularIcons = [
  { value: 'github', label: 'GitHub', icon: GitBranch },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'download', label: 'Download', icon: Download },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'code', label: 'Code', icon: Code },
  { value: 'package', label: 'Package', icon: Package },
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'heart', label: 'Heart', icon: Heart },
]

// Couleurs prédéfinies pour les badges
const badgeColors = [
  { value: 'brightgreen', label: 'Vert', color: '#4c1' },
  { value: 'green', label: 'Vert foncé', color: '#97ca00' },
  { value: 'yellowgreen', label: 'Vert jaune', color: '#a4a61d' },
  { value: 'yellow', label: 'Jaune', color: '#dfb317' },
  { value: 'orange', label: 'Orange', color: '#fe7d37' },
  { value: 'red', label: 'Rouge', color: '#e05d44' },
  { value: 'lightgrey', label: 'Gris clair', color: '#9f9f9f' },
  { value: 'blue', label: 'Bleu', color: '#007ec6' },
  { value: 'blueviolet', label: 'Bleu violet', color: '#8a2be2' },
  { value: 'ff69b4', label: 'Rose', color: '#ff69b4' },
]

interface BadgeGeneratorProps {
  onInsert: (badgeMarkdown: string) => void
}

export function BadgeGenerator({ onInsert }: BadgeGeneratorProps) {
  const { canAccessPremiumTemplates } = usePermissions()
  const [badge, setBadge] = useState<DynamicBadge>({
    id: '1',
    label: 'Build',
    message: 'Passing',
    color: 'brightgreen',
    style: 'flat',
    icon: 'github'
  })

  if (!canAccessPremiumTemplates) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Fonctionnalité premium - Upgrade requis</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const generateBadgeUrl = (badge: DynamicBadge): string => {
    const url = `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}`
    
    const params = new URLSearchParams()
    if (badge.style !== 'flat') params.set('style', badge.style)
    if (badge.icon) params.set('logo', badge.icon)
    if (badge.logoColor) params.set('logoColor', badge.logoColor)
    if (badge.labelColor) params.set('labelColor', badge.labelColor)
    if (badge.messageColor) params.set('color', badge.messageColor)
    
    const paramString = params.toString()
    return paramString ? `${url}?${paramString}` : url
  }

  const generateBadgeMarkdown = (badge: DynamicBadge): string => {
    const imageUrl = generateBadgeUrl(badge)
    return badge.link 
      ? `[![${badge.label}](${imageUrl})](${badge.link})`
      : `![${badge.label}](${imageUrl})`
  }

  const handleInsertBadge = () => {
    const markdown = generateBadgeMarkdown(badge)
    onInsert(markdown)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Générateur de badges dynamiques
        </CardTitle>
        <CardDescription>
          Créez des badges personnalisés pour votre README
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="badge-label">Label</Label>
            <Input
              id="badge-label"
              value={badge.label}
              onChange={(e) => setBadge({ ...badge, label: e.target.value })}
              placeholder="Build"
            />
          </div>
          <div>
            <Label htmlFor="badge-message">Message</Label>
            <Input
              id="badge-message"
              value={badge.message}
              onChange={(e) => setBadge({ ...badge, message: e.target.value })}
              placeholder="Passing"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="badge-color">Couleur</Label>
            <select
              id="badge-color"
              className="w-full p-2 border rounded-md"
              value={badge.color}
              onChange={(e) => setBadge({ ...badge, color: e.target.value })}
            >
              {badgeColors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="badge-style">Style</Label>
            <select
              id="badge-style"
              className="w-full p-2 border rounded-md"
              value={badge.style}
              onChange={(e) => setBadge({ ...badge, style: e.target.value as DynamicBadge['style'] })}
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
              <option value="for-the-badge">For the Badge</option>
              <option value="social">Social</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="badge-icon">Icône</Label>
            <select
              id="badge-icon"
              className="w-full p-2 border rounded-md"
              value={badge.icon}
              onChange={(e) => setBadge({ ...badge, icon: e.target.value })}
            >
              <option value="">Aucune icône</option>
              {popularIcons.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="badge-link">Lien (optionnel)</Label>
            <Input
              id="badge-link"
              value={badge.link || ''}
              onChange={(e) => setBadge({ ...badge, link: e.target.value })}
              placeholder="https://github.com/user/repo"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Aperçu</Label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <img 
              src={generateBadgeUrl(badge)} 
              alt={badge.label}
              className="h-6"
            />
          </div>
        </div>

        <Button onClick={handleInsertBadge} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Insérer le badge
        </Button>
      </CardContent>
    </Card>
  )
}

interface CalloutGeneratorProps {
  onInsert: (calloutMarkdown: string) => void
}

export function CalloutGenerator({ onInsert }: CalloutGeneratorProps) {
  const { canAccessPremiumTemplates } = usePermissions()
  const [callout, setCallout] = useState<Callout>({
    id: '1',
    type: 'note',
    title: '',
    content: 'Votre message ici...'
  })

  if (!canAccessPremiumTemplates) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Fonctionnalité premium - Upgrade requis</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const generateCalloutMarkdown = (callout: Callout): string => {
    const title = callout.title || calloutConfig[callout.type].title
    return `> [!${callout.type.toUpperCase()}] ${title}\n> ${callout.content.replace(/\n/g, '\n> ')}`
  }

  const handleInsertCallout = () => {
    const markdown = generateCalloutMarkdown(callout)
    onInsert(markdown)
  }

  const config = calloutConfig[callout.type]
  const Icon = config.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Générateur de callouts
        </CardTitle>
        <CardDescription>
          Ajoutez des callouts colorés pour mettre en valeur l&apos;information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="callout-type">Type de callout</Label>
          <select
            id="callout-type"
            className="w-full p-2 border rounded-md"
            value={callout.type}
            onChange={(e) => setCallout({ ...callout, type: e.target.value as CalloutType })}
          >
            {Object.entries(calloutConfig).map(([type, config]) => (
              <option key={type} value={type}>
                {config.title} - {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="callout-title">Titre personnalisé (optionnel)</Label>
          <Input
            id="callout-title"
            value={callout.title}
            onChange={(e) => setCallout({ ...callout, title: e.target.value })}
            placeholder={config.title}
          />
        </div>

        <div>
          <Label htmlFor="callout-content">Contenu</Label>
          <textarea
            id="callout-content"
            className="w-full p-2 border rounded-md min-h-[80px]"
            value={callout.content}
            onChange={(e) => setCallout({ ...callout, content: e.target.value })}
            placeholder="Votre message ici..."
          />
        </div>

        <div className="space-y-2">
          <Label>Aperçu</Label>
          <div className={`p-4 rounded-lg border-l-4 ${config.bgColor} ${config.borderColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${config.color}`} />
              <strong className={config.color}>
                {callout.title || config.title}
              </strong>
            </div>
            <p className={`text-sm ${config.color}`}>
              {callout.content}
            </p>
          </div>
        </div>

        <Button onClick={handleInsertCallout} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Insérer le callout
        </Button>
      </CardContent>
    </Card>
  )
}

interface IconPaletteProps {
  onInsert: (iconMarkdown: string) => void
}

export function IconPalette({ onInsert }: IconPaletteProps) {
  const { canAccessPremiumTemplates } = usePermissions()
  const [selectedCategory, setSelectedCategory] = useState('tech')

  if (!canAccessPremiumTemplates) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Fonctionnalité premium - Upgrade requis</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const iconCategories = {
    tech: {
      label: 'Technologies',
      icons: [
        { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Go', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
        { name: 'Rust', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
        { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      ]
    },
    tools: {
      label: 'Outils',
      icons: [
        { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'GitLab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
        { name: 'VS Code', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Photoshop', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
        { name: 'Slack', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
        { name: 'Trello', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg' },
      ]
    },
    databases: {
      label: 'Bases de données',
      icons: [
        { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'SQLite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
      ]
    },
    cloud: {
      label: 'Cloud & DevOps',
      icons: [
        { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'Google Cloud', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
        { name: 'Azure', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
        { name: 'DigitalOcean', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg' },
        { name: 'Heroku', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg' },
        { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      ]
    }
  }

  const handleIconClick = (icon: { name: string; url: string }) => {
    const markdown = `<img src="${icon.url}" alt="${icon.name}" width="40" height="40"/>`
    onInsert(markdown)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Palette d'icônes
        </CardTitle>
        <CardDescription>
          Ajoutez des icônes professionnelles à votre README
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="icon-category">Catégorie</Label>
          <select
            id="icon-category"
            className="w-full p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.entries(iconCategories).map(([key, category]) => (
              <option key={key} value={key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4 max-h-60 overflow-y-auto">
          {iconCategories[selectedCategory as keyof typeof iconCategories].icons.map((icon, index) => (
            <button
              key={index}
              onClick={() => handleIconClick(icon)}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center gap-2"
              title={`Insérer ${icon.name}`}
            >
              <img 
                src={icon.url} 
                alt={icon.name} 
                className="w-8 h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
              <span className="text-xs text-center leading-tight">{icon.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface PremiumFeaturesProps {
  onInsert: (content: string) => void
}

export function PremiumFeatures({ onInsert }: PremiumFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'widgets' | 'badges' | 'callouts' | 'icons'>('widgets')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        <Button
          variant={activeTab === 'widgets' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('widgets')}
          className="flex-1"
        >
          <Activity className="w-4 h-4 mr-2" />
          Widgets
        </Button>
        <Button
          variant={activeTab === 'badges' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('badges')}
          className="flex-1"
        >
          <Shield className="w-4 h-4 mr-2" />
          Badges
        </Button>
        <Button
          variant={activeTab === 'callouts' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('callouts')}
          className="flex-1"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Callouts
        </Button>
        <Button
          variant={activeTab === 'icons' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('icons')}
          className="flex-1"
        >
          <Star className="w-4 h-4 mr-2" />
          Icônes
        </Button>
      </div>

      {activeTab === 'widgets' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-500" />
              Widgets GitHub
            </CardTitle>
            <CardDescription>
              Ajoutez des statistiques et graphiques GitHub à votre README
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GitHubWidgetSelector onInsert={onInsert} />
          </CardContent>
        </Card>
      )}
      {activeTab === 'badges' && <ModernBadgeGenerator onInsert={onInsert} />}
      {activeTab === 'callouts' && <CalloutGenerator onInsert={onInsert} />}
      {activeTab === 'icons' && <IconPalette onInsert={onInsert} />}
    </div>
  )
}