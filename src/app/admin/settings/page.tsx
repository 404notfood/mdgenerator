"use client"

import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import {
  Save,
  Settings,
  ArrowLeft,
  Loader2,
  X,
  FileText,
  Crown,
  Image,
  AlertTriangle,
  Check,
  Sliders
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
  const [initialLoading, setInitialLoading] = useState(true)

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
        if (data.settings) {
          setSettings(data.settings)
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error)
    } finally {
      setInitialLoading(false)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

  if (isPending || initialLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Accès refusé</h1>
          <p className="text-[var(--color-text-muted)] mb-6">Vous devez être administrateur pour accéder à cette page.</p>
          <Button asChild className="btn-primary">
            <Link href="/dashboard">Retour au dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                    Configuration
                  </h1>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Paramètres globaux de l'application
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/30"
                >
                  <Check className="w-4 h-4" />
                  Sauvegardé
                </motion.div>
              )}
              <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/30">
                ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Limites Éditeur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <h2 className="font-semibold text-[var(--color-text-primary)]">Limites de l'éditeur</h2>
                <p className="text-sm text-[var(--color-text-muted)]">Configuration des caractères autorisés</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Utilisateurs gratuits
                </label>
                <Input
                  type="number"
                  value={settings.freeUserCharacterLimit}
                  onChange={(e) => setSettings(prev => ({ ...prev, freeUserCharacterLimit: Number(e.target.value) }))}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                  min="1000"
                  max="50000"
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Limite actuelle: {settings.freeUserCharacterLimit.toLocaleString()} caractères
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[var(--color-primary)]" />
                  Utilisateurs Premium
                </label>
                <Input
                  type="number"
                  value={settings.premiumUserCharacterLimit}
                  onChange={(e) => setSettings(prev => ({ ...prev, premiumUserCharacterLimit: Number(e.target.value) }))}
                  className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                  min="10000"
                  max="1000000"
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Limite actuelle: {settings.premiumUserCharacterLimit.toLocaleString()} caractères
                </p>
              </div>
            </div>
          </motion.div>

          {/* Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="font-semibold text-[var(--color-text-primary)]">Limites des templates</h2>
                <p className="text-sm text-[var(--color-text-muted)]">Accès aux templates gratuits</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                Templates gratuits accessibles
              </label>
              <Input
                type="number"
                value={settings.maxTemplatesPerFreeUser}
                onChange={(e) => setSettings(prev => ({ ...prev, maxTemplatesPerFreeUser: Number(e.target.value) }))}
                className="bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)] max-w-[200px]"
                min="1"
                max="10"
              />
              <p className="text-xs text-[var(--color-text-muted)]">
                Nombre de templates gratuits que les utilisateurs free peuvent utiliser
              </p>
            </div>
          </motion.div>

          {/* Options globales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h2 className="font-semibold text-[var(--color-text-primary)]">Options globales</h2>
                <p className="text-sm text-[var(--color-text-muted)]">Fonctionnalités de l'application</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Image Upload */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Image className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">Upload d'images</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Permet aux utilisateurs d'uploader des images
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.allowImageUpload}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowImageUpload: checked }))}
                  className="data-[state=checked]:bg-[var(--color-primary)]"
                />
              </div>

              {/* Maintenance Mode */}
              <div className={`flex items-center justify-between p-4 rounded-xl border ${
                settings.maintenanceMode
                  ? 'bg-red-500/5 border-red-500/30'
                  : 'bg-[var(--color-bg-darker)] border-[var(--color-border-dark)]'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    settings.maintenanceMode ? 'bg-red-500/10' : 'bg-yellow-500/10'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      settings.maintenanceMode ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">Mode maintenance</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Désactive l'accès pour tous sauf les admins
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <Button
              onClick={saveSettings}
              disabled={loading}
              className="btn-primary px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les paramètres
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
