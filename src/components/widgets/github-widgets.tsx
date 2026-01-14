'use client'

import React, { useState } from 'react'
import {
  BarChart3,
  GitBranch,
  Code2,
  Trophy,
  Flame,
  Activity,
  Copy,
  Check,
  Eye,
  Users,
  Star
} from 'lucide-react'

// Types for widgets
interface WidgetConfig {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  preview: string
  markdown: (username: string, options?: WidgetOptions) => string
  themes?: string[]
  category: 'stats' | 'activity' | 'showcase' | 'social'
}

interface WidgetOptions {
  theme?: string
  showIcons?: boolean
  includePrivate?: boolean
  layout?: 'default' | 'compact' | 'donut' | 'pie'
}

// Available themes
const THEMES = [
  'default',
  'tokyonight',
  'radical',
  'merko',
  'gruvbox',
  'dracula',
  'onedark',
  'cobalt',
  'synthwave',
  'highcontrast',
  'dark',
  'chartreuse-dark',
  'react'
]

// Widget configurations
const WIDGETS: WidgetConfig[] = [
  {
    id: 'github-stats',
    name: 'GitHub Stats',
    description: 'Affiche vos statistiques GitHub (commits, PRs, issues, stars)',
    icon: <BarChart3 className="w-5 h-5" />,
    category: 'stats',
    themes: THEMES,
    preview: 'https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight',
    markdown: (username, options = {}) => {
      const theme = options.theme || 'tokyonight'
      const showIcons = options.showIcons !== false
      return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=${showIcons}&theme=${theme}&include_all_commits=true&count_private=true)`
    }
  },
  {
    id: 'top-languages',
    name: 'Top Languages',
    description: 'Montre vos langages de programmation les plus utilisés',
    icon: <Code2 className="w-5 h-5" />,
    category: 'stats',
    themes: THEMES,
    preview: 'https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=tokyonight',
    markdown: (username, options = {}) => {
      const theme = options.theme || 'tokyonight'
      const layout = options.layout || 'compact'
      return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=${layout}&theme=${theme}&langs_count=8)`
    }
  },
  {
    id: 'streak-stats',
    name: 'GitHub Streak',
    description: 'Affiche votre série de contributions consécutives',
    icon: <Flame className="w-5 h-5" />,
    category: 'activity',
    themes: THEMES,
    preview: 'https://github-readme-streak-stats.herokuapp.com/?user=denvercoder1&theme=tokyonight',
    markdown: (username, options = {}) => {
      const theme = options.theme || 'tokyonight'
      return `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme})`
    }
  },
  {
    id: 'trophy',
    name: 'GitHub Trophies',
    description: 'Badges de trophées basés sur votre activité GitHub',
    icon: <Trophy className="w-5 h-5" />,
    category: 'showcase',
    themes: ['flat', 'onedark', 'gruvbox', 'dracula', 'monokai', 'nord', 'radical'],
    preview: 'https://github-profile-trophy.vercel.app/?username=ryo-ma&theme=onedark&row=1&column=6',
    markdown: (username, options = {}) => {
      const theme = options.theme || 'onedark'
      return `![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&row=1&column=7)`
    }
  },
  {
    id: 'contribution-graph',
    name: 'Activity Graph',
    description: 'Graphique d\'activité de vos contributions',
    icon: <Activity className="w-5 h-5" />,
    category: 'activity',
    themes: ['tokyo-night', 'react-dark', 'github-compact', 'xcode', 'coral'],
    preview: 'https://github-readme-activity-graph.vercel.app/graph?username=ashutosh00710&theme=tokyo-night',
    markdown: (username, options = {}) => {
      const theme = options.theme || 'tokyo-night'
      return `![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme})`
    }
  },
  {
    id: 'profile-views',
    name: 'Profile Views',
    description: 'Compteur de vues de votre profil',
    icon: <Eye className="w-5 h-5" />,
    category: 'social',
    preview: 'https://komarev.com/ghpvc/?username=komarev&color=14b8a6&style=for-the-badge',
    markdown: (username) => {
      return `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=14b8a6&style=for-the-badge&label=PROFILE+VIEWS)`
    }
  },
  {
    id: 'followers',
    name: 'Followers Badge',
    description: 'Badge montrant votre nombre de followers',
    icon: <Users className="w-5 h-5" />,
    category: 'social',
    preview: 'https://img.shields.io/github/followers/torvalds?style=for-the-badge&logo=github&color=14b8a6',
    markdown: (username) => {
      return `![Followers](https://img.shields.io/github/followers/${username}?style=for-the-badge&logo=github&color=14b8a6)`
    }
  },
  {
    id: 'stars',
    name: 'Stars Badge',
    description: 'Badge montrant vos stars totales',
    icon: <Star className="w-5 h-5" />,
    category: 'social',
    preview: 'https://img.shields.io/github/stars/torvalds?style=for-the-badge&logo=github&color=14b8a6',
    markdown: (username) => {
      return `![Stars](https://img.shields.io/github/stars/${username}?style=for-the-badge&logo=github&color=14b8a6&affiliations=OWNER)`
    }
  }
]

// Main Widget Selector Component
export function GitHubWidgetSelector({
  onInsert,
  defaultUsername = ''
}: {
  onInsert: (markdown: string) => void
  defaultUsername?: string
}) {
  const [username, setUsername] = useState(defaultUsername)
  const [selectedWidget, setSelectedWidget] = useState<WidgetConfig | null>(null)
  const [selectedTheme, setSelectedTheme] = useState('tokyonight')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = [
    { id: 'stats', name: 'Statistiques', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'activity', name: 'Activité', icon: <Activity className="w-4 h-4" /> },
    { id: 'showcase', name: 'Showcase', icon: <Trophy className="w-4 h-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="w-4 h-4" /> }
  ]

  const handleCopy = (widget: WidgetConfig) => {
    if (!username) return
    const markdown = widget.markdown(username, { theme: selectedTheme })
    navigator.clipboard.writeText(markdown)
    setCopiedId(widget.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleInsert = (widget: WidgetConfig) => {
    if (!username) return
    const markdown = widget.markdown(username, { theme: selectedTheme })
    onInsert(markdown)
  }

  return (
    <div className="space-y-6">
      {/* Username Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          Votre username GitHub
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ex: torvalds"
          className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
        />
      </div>

      {/* Theme Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          Thème
        </label>
        <div className="flex flex-wrap gap-2">
          {THEMES.slice(0, 8).map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedTheme === theme
                  ? 'bg-[var(--color-primary)] text-[var(--color-bg-dark)]'
                  : 'bg-[var(--color-surface-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            {category.icon}
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {category.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WIDGETS.filter(w => w.category === category.id).map((widget) => (
              <div
                key={widget.id}
                className="widget-card group cursor-pointer"
                onClick={() => setSelectedWidget(widget)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="feature-icon-outline w-10 h-10 flex items-center justify-center rounded-lg">
                      {widget.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-text-primary)]">
                        {widget.name}
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {widget.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="widget-preview mb-3">
                  <img
                    src={widget.preview.replace(/username=[^&]+/, `username=${username || 'anuraghazra'}`).replace(/theme=[^&]+/, `theme=${selectedTheme}`)}
                    alt={widget.name}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleInsert(widget)
                    }}
                    disabled={!username}
                    className="flex-1 btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Insérer
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(widget)
                    }}
                    disabled={!username}
                    className="btn-secondary text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copiedId === widget.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Quick Widget Badge Component
export function QuickWidgetBadge({
  type,
  username,
  theme = 'tokyonight'
}: {
  type: string
  username: string
  theme?: string
}) {
  const widget = WIDGETS.find(w => w.id === type)
  if (!widget) return null

  const previewUrl = widget.preview
    .replace(/username=[^&]+/, `username=${username}`)
    .replace(/user=[^&]+/, `user=${username}`)
    .replace(/theme=[^&]+/, `theme=${theme}`)

  return (
    <img
      src={previewUrl}
      alt={widget.name}
      className="max-w-full h-auto"
      loading="lazy"
    />
  )
}

// Widget Preview Card for landing page
export function WidgetShowcase() {
  const showcaseWidgets = WIDGETS.slice(0, 4)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {showcaseWidgets.map((widget, index) => (
        <div
          key={widget.id}
          className={`card-bento animate-fade-in-up stagger-${index + 1}`}
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="feature-icon">
              {widget.icon}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                {widget.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {widget.description}
              </p>
            </div>
          </div>
          <div className="widget-preview">
            <img
              src={widget.preview}
              alt={widget.name}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Export all widgets config for external use
export { WIDGETS, THEMES }
export type { WidgetConfig, WidgetOptions }
