"use client"

import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Save } from "lucide-react"
import Link from "next/link"

interface AppSettings {
  freeUserCharacterLimit: number
  premiumUserCharacterLimit: number
  maxTemplatesPerFreeUser: number
  allowImageUpload: boolean
  maintenanceMode: boolean
}

export default function AdminSettingsPage() {
  const { data: session, isPending } = useSession()
  const [settings, setSettings] = useState<AppSettings>({
    freeUserCharacterLimit: 10000,
    premiumUserCharacterLimit: 100000,
    maxTemplatesPerFreeUser: 3,
    allowImageUpload: false,
    maintenanceMode: false
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Check if user is admin
  const isAdmin = session && (session.user as any).role === 'ADMIN'

  useEffect(() => {
    if (!isAdmin) return
    
    loadSettings()
  }, [isAdmin])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isPending) {
    return <div className="container mx-auto py-12 px-4 text-center">Chargement...</div>
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p className="text-gray-600 mb-6">Vous devez être administrateur pour accéder à cette page.</p>
        <Button asChild>
          <Link href="/dashboard">Retour au dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Configuration
            <Badge variant="destructive" className="ml-2">ADMIN</Badge>
          </h1>
          <p className="text-gray-600">Paramètres globaux de l'application</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">← Retour</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {/* Limites de caractères */}
        <Card>
          <CardHeader>
            <CardTitle>Limites de l'éditeur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="freeLimit">
                Limite de caractères (utilisateurs gratuits)
              </Label>
              <Input
                id="freeLimit"
                type="number"
                value={settings.freeUserCharacterLimit}
                onChange={(e) => 
                  setSettings(prev => ({ 
                    ...prev, 
                    freeUserCharacterLimit: Number(e.target.value) 
                  }))
                }
                min="1000"
                max="50000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Nombre maximum de caractères autorisés dans l'éditeur pour les utilisateurs gratuits
              </p>
            </div>

            <div>
              <Label htmlFor="premiumLimit">
                Limite de caractères (utilisateurs premium)
              </Label>
              <Input
                id="premiumLimit"
                type="number"
                value={settings.premiumUserCharacterLimit}
                onChange={(e) => 
                  setSettings(prev => ({ 
                    ...prev, 
                    premiumUserCharacterLimit: Number(e.target.value) 
                  }))
                }
                min="10000"
                max="1000000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Nombre maximum de caractères pour les utilisateurs premium
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limites templates */}
        <Card>
          <CardHeader>
            <CardTitle>Limites templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxTemplates">
                Nombre maximum de templates (utilisateurs gratuits)
              </Label>
              <Input
                id="maxTemplates"
                type="number"
                value={settings.maxTemplatesPerFreeUser}
                onChange={(e) => 
                  setSettings(prev => ({ 
                    ...prev, 
                    maxTemplatesPerFreeUser: Number(e.target.value) 
                  }))
                }
                min="1"
                max="10"
              />
              <p className="text-sm text-gray-500 mt-1">
                Nombre de templates gratuits accessibles
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Options globales */}
        <Card>
          <CardHeader>
            <CardTitle>Options globales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="imageUpload">
                  Autoriser l'upload d'images
                </Label>
                <p className="text-sm text-gray-500">
                  Permet aux utilisateurs d'uploader des images dans leurs README
                </p>
              </div>
              <Switch
                id="imageUpload"
                checked={settings.allowImageUpload}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, allowImageUpload: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance">
                  Mode maintenance
                </Label>
                <p className="text-sm text-gray-500">
                  Désactive l'accès à l'application pour tous les utilisateurs sauf les admins
                </p>
              </div>
              <Switch
                id="maintenance"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end gap-4">
          {saved && (
            <Badge variant="default" className="self-center">
              ✓ Sauvegardé
            </Badge>
          )}
          <Button 
            onClick={saveSettings} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
          </Button>
        </div>
      </div>
    </div>
  )
}