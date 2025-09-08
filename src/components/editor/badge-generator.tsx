"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Copy, Plus, Star } from "lucide-react"

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

export function BadgeGenerator({ onInsert }: BadgeGeneratorProps) {
  const [customLabel, setCustomLabel] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [customColor, setCustomColor] = useState("blue")
  const [customStyle, setCustomStyle] = useState("flat-square")
  const [customLogo, setCustomLogo] = useState("")
  const [previewBadge, setPreviewBadge] = useState("")

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-500" />
          Générateur de Badges
          <Badge variant="secondary" className="text-xs">Premium</Badge>
        </CardTitle>
        <CardDescription>
          Ajoutez des badges professionnels à votre README
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Badges prédéfinis</TabsTrigger>
            <TabsTrigger value="custom">Badge personnalisé</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            {categories.map(category => (
              <div key={category}>
                <h4 className="font-semibold mb-2">{category}</h4>
                <div className="grid grid-cols-1 gap-2">
                  {PRESET_BADGES
                    .filter(badge => badge.category === category)
                    .map(badge => (
                      <div key={badge.id} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex items-center gap-3">
                          <img 
                            src={generateBadgeUrl(badge)} 
                            alt={badge.name}
                            className="h-5"
                          />
                          <span className="text-sm font-medium">{badge.name}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePresetBadgeInsert(badge)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="ex: PHP"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  placeholder="ex: >=8.1"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">Couleur</Label>
                <Input
                  id="color"
                  placeholder="ex: blue, #FF5733"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="style">Style</Label>
                <Select value={customStyle} onValueChange={setCustomStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BADGE_STYLES.map(style => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="logo">Logo (optionnel)</Label>
              <Input
                id="logo"
                placeholder="ex: php, react, docker"
                value={customLogo}
                onChange={(e) => setCustomLogo(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Voir les logos disponibles sur{" "}
                <a href="https://simpleicons.org/" target="_blank" className="text-blue-600 hover:underline">
                  SimpleIcons
                </a>
              </p>
            </div>

            {/* Aperçu */}
            {previewBadge && (
              <div>
                <Label>Aperçu</Label>
                <div className="p-3 bg-gray-50 rounded border">
                  <img src={previewBadge} alt="Aperçu du badge" className="h-5" />
                </div>
              </div>
            )}

            <Button 
              onClick={handleCustomBadgeInsert}
              disabled={!customLabel || !customMessage}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter le badge
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          Ligne de badges
          <Badge variant="secondary" className="text-xs">Premium</Badge>
        </CardTitle>
        <CardDescription>
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
                className="rounded"
              />
              <label htmlFor={`badge-${badge.id}`} className="flex items-center gap-2 cursor-pointer">
                <img 
                  src={`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?style=${badge.style}${badge.logo ? `&logo=${badge.logo}` : ''}${badge.logoColor ? `&logoColor=${badge.logoColor}` : ''}`}
                  alt={badge.name}
                  className="h-4"
                />
                <span className="text-sm">{badge.name}</span>
              </label>
            </div>
          ))}
        </div>
        
        {selectedBadges.length > 0 && (
          <div className="p-3 bg-gray-50 rounded border">
            <p className="text-sm font-medium mb-2">{selectedBadges.length} badge(s) sélectionné(s)</p>
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
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Insérer {selectedBadges.length} badge(s)
        </Button>
      </CardContent>
    </Card>
  )
}