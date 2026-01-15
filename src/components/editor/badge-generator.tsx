"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Crown, Copy, Plus, Star, Settings, Code2, Database, Wrench, CheckCircle, ChevronDown } from "lucide-react"

interface PresetBadge {
  id: string
  name: string
  label: string
  message: string
  color: string
  logo?: string
  logoColor?: string
  style: string
  category: string
}

const PRESET_BADGES: PresetBadge[] = [
  // Languages
  { id: "php", name: "PHP", label: "PHP", message: ">=8.1", color: "777BB4", logo: "php", style: "flat-square", category: "Languages" },
  { id: "javascript", name: "JavaScript", label: "JavaScript", message: "ES6+", color: "F7DF1E", logo: "javascript", logoColor: "black", style: "flat-square", category: "Languages" },
  { id: "typescript", name: "TypeScript", label: "TypeScript", message: "5.0+", color: "3178C6", logo: "typescript", logoColor: "white", style: "flat-square", category: "Languages" },
  { id: "python", name: "Python", label: "Python", message: "3.9+", color: "3776AB", logo: "python", logoColor: "white", style: "flat-square", category: "Languages" },
  { id: "java", name: "Java", label: "Java", message: "17+", color: "ED8B00", logo: "openjdk", logoColor: "white", style: "flat-square", category: "Languages" },
  { id: "csharp", name: "C#", label: "C%23", message: ".NET 8", color: "239120", logo: "csharp", logoColor: "white", style: "flat-square", category: "Languages" },
  { id: "go", name: "Go", label: "Go", message: "1.21+", color: "00ADD8", logo: "go", logoColor: "white", style: "flat-square", category: "Languages" },
  { id: "rust", name: "Rust", label: "Rust", message: "1.70+", color: "000000", logo: "rust", logoColor: "white", style: "flat-square", category: "Languages" },

  // Frameworks
  { id: "laravel", name: "Laravel", label: "Laravel", message: "10.0", color: "FF2D20", logo: "laravel", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "react", name: "React", label: "React", message: "18.0", color: "61DAFB", logo: "react", logoColor: "black", style: "flat-square", category: "Frameworks" },
  { id: "vue", name: "Vue.js", label: "Vue.js", message: "3.0", color: "4FC08D", logo: "vuedotjs", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "angular", name: "Angular", label: "Angular", message: "17.0", color: "DD0031", logo: "angular", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "nextjs", name: "Next.js", label: "Next.js", message: "14.0", color: "000000", logo: "nextdotjs", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "nuxt", name: "Nuxt.js", label: "Nuxt.js", message: "3.0", color: "00DC82", logo: "nuxtdotjs", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "django", name: "Django", label: "Django", message: "4.2", color: "092E20", logo: "django", logoColor: "white", style: "flat-square", category: "Frameworks" },
  { id: "flask", name: "Flask", label: "Flask", message: "2.3", color: "000000", logo: "flask", logoColor: "white", style: "flat-square", category: "Frameworks" },

  // Databases
  { id: "mysql", name: "MySQL", label: "MySQL", message: "8.0", color: "4479A1", logo: "mysql", logoColor: "white", style: "flat-square", category: "Databases" },
  { id: "postgresql", name: "PostgreSQL", label: "PostgreSQL", message: "15", color: "336791", logo: "postgresql", logoColor: "white", style: "flat-square", category: "Databases" },
  { id: "mongodb", name: "MongoDB", label: "MongoDB", message: "7.0", color: "47A248", logo: "mongodb", logoColor: "white", style: "flat-square", category: "Databases" },
  { id: "redis", name: "Redis", label: "Redis", message: "7.0", color: "DC382D", logo: "redis", logoColor: "white", style: "flat-square", category: "Databases" },
  { id: "sqlite", name: "SQLite", label: "SQLite", message: "3.40", color: "003B57", logo: "sqlite", logoColor: "white", style: "flat-square", category: "Databases" },

  // Tools
  { id: "docker", name: "Docker", label: "Docker", message: "Ready", color: "2496ED", logo: "docker", logoColor: "white", style: "flat-square", category: "Tools" },
  { id: "kubernetes", name: "Kubernetes", label: "Kubernetes", message: "1.28", color: "326CE5", logo: "kubernetes", logoColor: "white", style: "flat-square", category: "Tools" },
  { id: "git", name: "Git", label: "Git", message: "2.40+", color: "F05032", logo: "git", logoColor: "white", style: "flat-square", category: "Tools" },
  { id: "npm", name: "npm", label: "npm", message: "9.0+", color: "CB3837", logo: "npm", logoColor: "white", style: "flat-square", category: "Tools" },
  { id: "yarn", name: "Yarn", label: "Yarn", message: "3.0+", color: "2C8EBB", logo: "yarn", logoColor: "white", style: "flat-square", category: "Tools" },

  // Status
  { id: "license-mit", name: "MIT License", label: "License", message: "MIT", color: "green", style: "flat-square", category: "Status" },
  { id: "license-apache", name: "Apache License", label: "License", message: "Apache-2.0", color: "green", style: "flat-square", category: "Status" },
  { id: "build-passing", name: "Build Passing", label: "Build", message: "Passing", color: "brightgreen", style: "flat-square", category: "Status" },
  { id: "tests-passing", name: "Tests Passing", label: "Tests", message: "Passing", color: "brightgreen", style: "flat-square", category: "Status" },
  { id: "coverage", name: "Coverage", label: "Coverage", message: "95%", color: "brightgreen", style: "flat-square", category: "Status" },
  { id: "prs-welcome", name: "PRs Welcome", label: "PRs", message: "Welcome", color: "brightgreen", style: "flat-square", category: "Status" },
]

const BADGE_STYLES = [
  { value: "plastic", label: "Plastic" },
  { value: "flat", label: "Flat" },
  { value: "flat-square", label: "Flat Square" },
  { value: "for-the-badge", label: "For The Badge" },
  { value: "social", label: "Social" }
]

interface BadgeGeneratorProps {
  onInsert: (badgeMarkdown: string) => void
}

// Helper function to get category icons
function getCategoryIcon(category: string) {
  switch (category) {
    case 'Languages':
      return Code2
    case 'Frameworks':
      return Star
    case 'Databases':
      return Database
    case 'Tools':
      return Wrench
    case 'Status':
      return CheckCircle
    default:
      return Code2
  }
}

export function BadgeGenerator({ onInsert }: BadgeGeneratorProps) {
  const [customLabel, setCustomLabel] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [customColor, setCustomColor] = useState("blue")
  const [customStyle, setCustomStyle] = useState("flat-square")
  const [customLogo, setCustomLogo] = useState("")
  const [previewBadge, setPreviewBadge] = useState("")

  // Dialog state for customizing preset badges
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPresetBadge, setSelectedPresetBadge] = useState<PresetBadge | null>(null)
  const [customVersion, setCustomVersion] = useState("")
  const [customBadgeStyle, setCustomBadgeStyle] = useState("flat-square")

  const generateBadgeUrl = (badge: PresetBadge | any) => {
    const params = new URLSearchParams()
    params.set('style', badge.style)
    if (badge.logo) params.set('logo', badge.logo)
    if (badge.logoColor) params.set('logoColor', badge.logoColor)
    
    return `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?${params.toString()}`
  }

  const generateBadgeMarkdown = (badge: PresetBadge | any, link?: string) => {
    const badgeUrl = generateBadgeUrl(badge)
    const altText = `${badge.name || badge.label}`
    
    if (link) {
      return `[![${altText}](${badgeUrl})](${link})`
    }
    return `![${altText}](${badgeUrl})`
  }

  const handleOpenBadgeDialog = (badge: PresetBadge) => {
    setSelectedPresetBadge(badge)
    setCustomVersion(badge.message)
    setCustomBadgeStyle(badge.style)
    setDialogOpen(true)
  }

  const handleInsertCustomizedBadge = () => {
    if (!selectedPresetBadge) return

    const customizedBadge = {
      ...selectedPresetBadge,
      message: customVersion || selectedPresetBadge.message,
      style: customBadgeStyle
    }

    const markdown = generateBadgeMarkdown(customizedBadge)
    onInsert(markdown)
    setDialogOpen(false)
    setSelectedPresetBadge(null)
  }

  const handlePresetBadgeInsert = (badge: PresetBadge) => {
    const markdown = generateBadgeMarkdown(badge)
    onInsert(markdown)
  }

  const handleCustomBadgeInsert = () => {
    if (!customLabel || !customMessage) return
    
    const customBadge = {
      label: customLabel,
      message: customMessage,
      color: customColor,
      style: customStyle,
      logo: customLogo || undefined,
      name: customLabel
    }
    
    const markdown = generateBadgeMarkdown(customBadge)
    onInsert(markdown)
    
    // Reset form
    setCustomLabel("")
    setCustomMessage("")
    setCustomColor("blue")
    setCustomLogo("")
  }

  const updatePreview = () => {
    if (customLabel && customMessage) {
      const customBadge = {
        label: customLabel,
        message: customMessage,
        color: customColor,
        style: customStyle,
        logo: customLogo || undefined,
      }
      setPreviewBadge(generateBadgeUrl(customBadge))
    } else {
      setPreviewBadge("")
    }
  }

  // Update preview when values change
  React.useEffect(() => {
    updatePreview()
  }, [customLabel, customMessage, customColor, customStyle, customLogo])

  const categories = [...new Set(PRESET_BADGES.map(badge => badge.category))]

  return (
    <Card className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
          <Crown className="w-4 h-4 text-yellow-500" />
          Générateur de Badges
          <Badge variant="secondary" className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)]">Premium</Badge>
        </CardTitle>
        <CardDescription className="text-[var(--color-text-muted)]">
          Ajoutez des badges professionnels à votre README
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--color-bg-darker)] p-1">
            <TabsTrigger value="presets" className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white text-[var(--color-text-secondary)]">Badges prédéfinis</TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white text-[var(--color-text-secondary)]">Badge personnalisé</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="mt-4">
            <Accordion type="single" collapsible defaultValue="Languages" className="space-y-2">
              {categories.map(category => {
                const categoryBadges = PRESET_BADGES.filter(badge => badge.category === category)
                const CategoryIcon = getCategoryIcon(category)

                return (
                  <AccordionItem
                    key={category}
                    value={category}
                    className="border border-[var(--color-border-dark)] rounded-xl bg-[var(--color-bg-darker)] overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[var(--color-surface-elevated)] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                          <CategoryIcon className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <span className="font-semibold text-[var(--color-text-primary)]">{category}</span>
                        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-dark)] px-2 py-0.5 rounded-full">
                          {categoryBadges.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {categoryBadges.map(badge => (
                          <div key={badge.id} className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] hover:border-[var(--color-primary)]/30 transition-all group">
                            <div className="flex items-center gap-3">
                              <img
                                src={generateBadgeUrl(badge)}
                                alt={badge.name}
                                className="h-5"
                              />
                              <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{badge.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleOpenBadgeDialog(badge)}
                                className="h-8 w-8 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                                title="Personnaliser"
                              >
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handlePresetBadgeInsert(badge)}
                                className="h-8 w-8 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                                title="Insérer directement"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="label" className="text-[var(--color-text-secondary)]">Label</Label>
                <Input
                  id="label"
                  placeholder="ex: PHP"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-[var(--color-text-secondary)]">Message</Label>
                <Input
                  id="message"
                  placeholder="ex: >=8.1"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color" className="text-[var(--color-text-secondary)]">Couleur</Label>
                <Input
                  id="color"
                  placeholder="ex: blue, #FF5733"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <Label htmlFor="style" className="text-[var(--color-text-secondary)]">Style</Label>
                <Select value={customStyle} onValueChange={setCustomStyle}>
                  <SelectTrigger className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
                    {BADGE_STYLES.map(style => (
                      <SelectItem key={style.value} value={style.value} className="text-[var(--color-text-primary)] focus:bg-[var(--color-primary)]/20">
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="logo" className="text-[var(--color-text-secondary)]">Logo (optionnel)</Label>
              <Input
                id="logo"
                placeholder="ex: php, react, docker"
                value={customLogo}
                onChange={(e) => setCustomLogo(e.target.value)}
                className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Voir les logos disponibles sur{" "}
                <a href="https://simpleicons.org/" target="_blank" className="text-[var(--color-primary)] hover:underline">
                  SimpleIcons
                </a>
              </p>
            </div>

            {/* Aperçu */}
            {previewBadge && (
              <div>
                <Label className="text-[var(--color-text-secondary)]">Aperçu</Label>
                <div className="p-3 bg-[var(--color-bg-darker)] rounded-lg border border-[var(--color-border-dark)]">
                  <img src={previewBadge} alt="Aperçu du badge" className="h-5" />
                </div>
              </div>
            )}

            <Button
              onClick={handleCustomBadgeInsert}
              disabled={!customLabel || !customMessage}
              className="w-full btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter le badge
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Dialog pour personnaliser un badge */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[var(--color-text-primary)]">
              <div className="p-2 rounded-lg bg-[var(--color-primary)]/20">
                <Settings className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              Personnaliser le badge
            </DialogTitle>
            <DialogDescription className="text-[var(--color-text-muted)]">
              Modifiez la version ou le style du badge avant de l&apos;insérer
            </DialogDescription>
          </DialogHeader>

          {selectedPresetBadge && (
            <div className="space-y-5 py-4">
              {/* Aperçu actuel */}
              <div className="p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-center">
                <p className="text-xs text-[var(--color-text-muted)] mb-3">Aperçu</p>
                <img
                  src={generateBadgeUrl({
                    ...selectedPresetBadge,
                    message: customVersion || selectedPresetBadge.message,
                    style: customBadgeStyle
                  })}
                  alt={selectedPresetBadge.name}
                  className="h-7 mx-auto"
                />
              </div>

              {/* Version/Message */}
              <div className="space-y-2">
                <Label className="text-[var(--color-text-secondary)]">
                  Version / Message
                </Label>
                <Input
                  value={customVersion}
                  onChange={(e) => setCustomVersion(e.target.value)}
                  placeholder={selectedPresetBadge.message}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Ex: &gt;=8.1, 18.0, 3.9+, Latest
                </p>
              </div>

              {/* Style */}
              <div className="space-y-2">
                <Label className="text-[var(--color-text-secondary)]">Style du badge</Label>
                <Select value={customBadgeStyle} onValueChange={setCustomBadgeStyle}>
                  <SelectTrigger className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
                    {BADGE_STYLES.map(style => (
                      <SelectItem key={style.value} value={style.value} className="text-[var(--color-text-primary)] focus:bg-[var(--color-primary)]/20">
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-[var(--color-border-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
            >
              Annuler
            </Button>
            <Button
              onClick={handleInsertCustomizedBadge}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Insérer le badge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

// Composant pour ajouter plusieurs badges d'un coup
export function BadgeRowGenerator({ onInsert }: BadgeGeneratorProps) {
  const [selectedBadges, setSelectedBadges] = useState<PresetBadge[]>([])

  const handleBadgeToggle = (badge: PresetBadge) => {
    setSelectedBadges(prev => {
      const exists = prev.find(b => b.id === badge.id)
      if (exists) {
        return prev.filter(b => b.id !== badge.id)
      } else {
        return [...prev, badge]
      }
    })
  }

  const handleInsertRow = () => {
    if (selectedBadges.length === 0) return
    
    const badgeMarkdown = selectedBadges
      .map(badge => generateBadgeMarkdown(badge))
      .join('\n')
    
    onInsert(badgeMarkdown)
    setSelectedBadges([])
  }

  const generateBadgeMarkdown = (badge: PresetBadge) => {
    const params = new URLSearchParams()
    params.set('style', badge.style)
    if (badge.logo) params.set('logo', badge.logo)
    if (badge.logoColor) params.set('logoColor', badge.logoColor)
    
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?${params.toString()}`
    return `![${badge.name}](${badgeUrl})`
  }

  return (
    <Card className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
          <Star className="w-4 h-4 text-yellow-500" />
          Ligne de badges
          <Badge variant="secondary" className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)]">Premium</Badge>
        </CardTitle>
        <CardDescription className="text-[var(--color-text-muted)]">
          Sélectionnez plusieurs badges pour les insérer en ligne
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-60 overflow-y-auto space-y-2">
          {PRESET_BADGES.map(badge => (
            <div key={badge.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`badge-${badge.id}`}
                checked={selectedBadges.some(b => b.id === badge.id)}
                onChange={() => handleBadgeToggle(badge)}
                className="rounded accent-[var(--color-primary)]"
              />
              <label htmlFor={`badge-${badge.id}`} className="flex items-center gap-2 cursor-pointer">
                <img
                  src={`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?style=${badge.style}${badge.logo ? `&logo=${badge.logo}` : ''}${badge.logoColor ? `&logoColor=${badge.logoColor}` : ''}`}
                  alt={badge.name}
                  className="h-4"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">{badge.name}</span>
              </label>
            </div>
          ))}
        </div>

        {selectedBadges.length > 0 && (
          <div className="p-3 bg-[var(--color-bg-darker)] rounded-lg border border-[var(--color-border-dark)]">
            <p className="text-sm font-medium mb-2 text-[var(--color-text-primary)]">{selectedBadges.length} badge(s) sélectionné(s)</p>
            <div className="flex flex-wrap gap-1">
              {selectedBadges.map(badge => (
                <img
                  key={badge.id}
                  src={`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?style=${badge.style}${badge.logo ? `&logo=${badge.logo}` : ''}${badge.logoColor ? `&logoColor=${badge.logoColor}` : ''}`}
                  alt={badge.name}
                  className="h-4"
                />
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleInsertRow}
          disabled={selectedBadges.length === 0}
          className="w-full btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Insérer {selectedBadges.length} badge(s)
        </Button>
      </CardContent>
    </Card>
  )
}