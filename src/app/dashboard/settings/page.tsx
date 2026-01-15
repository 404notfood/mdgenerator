"use client"

import { useSession } from "@/lib/auth-client"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Settings,
  Github,
  Key,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  Trash2,
  ChevronLeft,
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  Brain
} from "lucide-react"
import { motion } from "framer-motion"

const AI_PROVIDERS = [
  { id: "openai", name: "OpenAI", description: "GPT-4o-mini", placeholder: "sk-...", docsUrl: "https://platform.openai.com/api-keys" },
  { id: "anthropic", name: "Anthropic", description: "Claude 3 Haiku", placeholder: "sk-ant-...", docsUrl: "https://console.anthropic.com/settings/keys" },
  { id: "google", name: "Google AI", description: "Gemini 1.5 Flash", placeholder: "AIza...", docsUrl: "https://aistudio.google.com/app/apikey" },
  { id: "mistral", name: "Mistral AI", description: "Mistral Small", placeholder: "...", docsUrl: "https://console.mistral.ai/api-keys" }
]

export default function SettingsPage() {
  const { data: session, isPending } = useSession()

  // GitHub Token state
  const [githubToken, setGithubToken] = useState("")
  const [hasGithubToken, setHasGithubToken] = useState(false)
  const [githubLoading, setGithubLoading] = useState(true)
  const [githubSaving, setGithubSaving] = useState(false)
  const [githubDeleting, setGithubDeleting] = useState(false)
  const [showGithubToken, setShowGithubToken] = useState(false)
  const [githubMessage, setGithubMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [githubUsername, setGithubUsername] = useState<string | null>(null)

  // AI Key state
  const [aiProvider, setAiProvider] = useState("")
  const [aiApiKey, setAiApiKey] = useState("")
  const [hasAiKey, setHasAiKey] = useState(false)
  const [currentAiProvider, setCurrentAiProvider] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(true)
  const [aiSaving, setAiSaving] = useState(false)
  const [aiDeleting, setAiDeleting] = useState(false)
  const [showAiKey, setShowAiKey] = useState(false)
  const [aiMessage, setAiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    if (session?.user) {
      checkGithubToken()
      checkAiKey()
    }
  }, [session])

  // GitHub Token functions
  const checkGithubToken = async () => {
    try {
      const response = await fetch("/api/user/github-token")
      if (response.ok) {
        const data = await response.json()
        setHasGithubToken(data.hasToken)
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setGithubLoading(false)
    }
  }

  const saveGithubToken = async () => {
    if (!githubToken.trim()) {
      setGithubMessage({ type: "error", text: "Veuillez entrer un token" })
      return
    }

    setGithubSaving(true)
    setGithubMessage(null)

    try {
      const response = await fetch("/api/user/github-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: githubToken.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        setHasGithubToken(true)
        setGithubToken("")
        setGithubUsername(data.githubUsername)
        setGithubMessage({ type: "success", text: `Token sauvegardé ! Connecté en tant que ${data.githubUsername}` })
      } else {
        setGithubMessage({ type: "error", text: data.error || "Erreur lors de la sauvegarde" })
      }
    } catch (error) {
      setGithubMessage({ type: "error", text: "Erreur de connexion" })
    } finally {
      setGithubSaving(false)
    }
  }

  const deleteGithubToken = async () => {
    setGithubDeleting(true)
    setGithubMessage(null)

    try {
      const response = await fetch("/api/user/github-token", { method: "DELETE" })

      if (response.ok) {
        setHasGithubToken(false)
        setGithubUsername(null)
        setGithubMessage({ type: "success", text: "Token supprimé" })
      } else {
        setGithubMessage({ type: "error", text: "Erreur lors de la suppression" })
      }
    } catch (error) {
      setGithubMessage({ type: "error", text: "Erreur de connexion" })
    } finally {
      setGithubDeleting(false)
    }
  }

  // AI Key functions
  const checkAiKey = async () => {
    try {
      const response = await fetch("/api/user/ai-key")
      if (response.ok) {
        const data = await response.json()
        setHasAiKey(data.hasKey)
        setCurrentAiProvider(data.provider)
        if (data.provider) {
          setAiProvider(data.provider)
        }
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setAiLoading(false)
    }
  }

  const saveAiKey = async () => {
    if (!aiProvider) {
      setAiMessage({ type: "error", text: "Veuillez sélectionner un provider" })
      return
    }
    if (!aiApiKey.trim()) {
      setAiMessage({ type: "error", text: "Veuillez entrer une clé API" })
      return
    }

    setAiSaving(true)
    setAiMessage(null)

    try {
      const response = await fetch("/api/user/ai-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: aiProvider, apiKey: aiApiKey.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        setHasAiKey(true)
        setCurrentAiProvider(aiProvider)
        setAiApiKey("")
        setAiMessage({ type: "success", text: `Clé ${AI_PROVIDERS.find(p => p.id === aiProvider)?.name} sauvegardée !` })
      } else {
        setAiMessage({ type: "error", text: data.error || "Erreur lors de la sauvegarde" })
      }
    } catch (error) {
      setAiMessage({ type: "error", text: "Erreur de connexion" })
    } finally {
      setAiSaving(false)
    }
  }

  const deleteAiKey = async () => {
    setAiDeleting(true)
    setAiMessage(null)

    try {
      const response = await fetch("/api/user/ai-key", { method: "DELETE" })

      if (response.ok) {
        setHasAiKey(false)
        setCurrentAiProvider(null)
        setAiMessage({ type: "success", text: "Clé API supprimée" })
      } else {
        setAiMessage({ type: "error", text: "Erreur lors de la suppression" })
      }
    } catch (error) {
      setAiMessage({ type: "error", text: "Erreur de connexion" })
    } finally {
      setAiDeleting(false)
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)]">
        <PrismaNavbar />
        <div className="container-custom py-32 text-center">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-[var(--color-primary)]" />
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)]">
        <PrismaNavbar />
        <div className="container-custom py-32 text-center">
          <p className="text-[var(--color-text-secondary)]">Vous devez être connecté</p>
          <Link href="/auth/signin" className="btn-primary mt-4 inline-flex">
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  const selectedProvider = AI_PROVIDERS.find(p => p.id === aiProvider)

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      <div className="container-custom py-8 pt-24 max-w-2xl">
        {/* Back button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au dashboard
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center">
            <Settings className="w-7 h-7 text-[var(--color-bg-dark)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Paramètres</h1>
            <p className="text-[var(--color-text-muted)]">Configurez vos intégrations</p>
          </div>
        </motion.div>

        {/* AI Key Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-bento mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Clé API Intelligence Artificielle
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Pour générer des README avec l'IA (Premium)
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-6">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-purple-300 font-medium mb-1">Bring Your Own Key (BYOK)</p>
                <p className="text-[var(--color-text-muted)]">
                  Utilisez votre propre clé API pour la génération IA. Vos données restent privées.
                  Supporté : OpenAI, Anthropic, Google AI, Mistral.
                </p>
              </div>
            </div>
          </div>

          {/* Current status */}
          {aiLoading ? (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement...
            </div>
          ) : hasAiKey ? (
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-400" />
                  <div>
                    <p className="text-teal-300 font-medium">Clé API configurée</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Provider : {AI_PROVIDERS.find(p => p.id === currentAiProvider)?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={deleteAiKey}
                  disabled={aiDeleting}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  {aiDeleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-yellow-300">Aucune clé API configurée</p>
              </div>
            </div>
          )}

          {/* Provider selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Provider IA
              </label>
              <div className="grid grid-cols-2 gap-3">
                {AI_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setAiProvider(provider.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      aiProvider === provider.id
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                        : "border-[var(--color-border-dark)] hover:border-[var(--color-border-light)]"
                    }`}
                  >
                    <p className="font-medium text-[var(--color-text-primary)]">{provider.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{provider.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* API Key input */}
            {aiProvider && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Clé API {selectedProvider?.name}
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                  <input
                    type={showAiKey ? "text" : "password"}
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    placeholder={selectedProvider?.placeholder}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAiKey(!showAiKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    {showAiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={saveAiKey}
              disabled={aiSaving || !aiProvider || !aiApiKey.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {hasAiKey ? "Mettre à jour la clé" : "Sauvegarder la clé"}
                </>
              )}
            </button>
          </div>

          {/* Message */}
          {aiMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${
                aiMessage.type === "success"
                  ? "bg-teal-500/10 border border-teal-500/30 text-teal-300"
                  : "bg-red-500/10 border border-red-500/30 text-red-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {aiMessage.type === "success" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {aiMessage.text}
              </div>
            </motion.div>
          )}

          {/* Help links */}
          {selectedProvider && (
            <div className="mt-6 pt-6 border-t border-[var(--color-border-dark)]">
              <a
                href={selectedProvider.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <Key className="w-4 h-4" />
                Obtenir une clé API {selectedProvider.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </motion.div>

        {/* GitHub Token Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-bento"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#24292e] flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                GitHub Personal Access Token
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Pour accéder aux repositories privés
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-300 font-medium mb-1">Pourquoi un Personal Access Token ?</p>
                <p className="text-[var(--color-text-muted)]">
                  L'authentification OAuth standard ne permet pas d'accéder aux repos privés.
                  Un PAT avec le scope <code className="px-1 py-0.5 bg-[var(--color-surface-elevated)] rounded">repo</code> est nécessaire.
                </p>
              </div>
            </div>
          </div>

          {/* Current status */}
          {githubLoading ? (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement...
            </div>
          ) : hasGithubToken ? (
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-400" />
                  <div>
                    <p className="text-teal-300 font-medium">Token configuré</p>
                    {githubUsername && (
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Connecté en tant que {githubUsername}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={deleteGithubToken}
                  disabled={githubDeleting}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  {githubDeleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-yellow-300">Aucun token configuré</p>
              </div>
            </div>
          )}

          {/* Token input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Personal Access Token (classic)
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type={showGithubToken ? "text" : "password"}
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowGithubToken(!showGithubToken)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                >
                  {showGithubToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={saveGithubToken}
              disabled={githubSaving || !githubToken.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {githubSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {hasGithubToken ? "Mettre à jour le token" : "Sauvegarder le token"}
                </>
              )}
            </button>
          </div>

          {/* Message */}
          {githubMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${
                githubMessage.type === "success"
                  ? "bg-teal-500/10 border border-teal-500/30 text-teal-300"
                  : "bg-red-500/10 border border-red-500/30 text-red-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {githubMessage.type === "success" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {githubMessage.text}
              </div>
            </motion.div>
          )}

          {/* Help link */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border-dark)]">
            <a
              href="https://github.com/settings/tokens/new?description=MarkdownPro&scopes=repo,read:user"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <Github className="w-4 h-4" />
              Créer un Personal Access Token sur GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Sélectionnez le scope "repo" pour accéder aux repositories privés
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
