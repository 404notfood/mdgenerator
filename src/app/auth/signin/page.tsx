"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import Link from "next/link"
import {
  Github,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/dashboard"
      })
    } catch (error) {
      setError("Erreur de connexion. Vérifiez vos identifiants.")
      console.error("Erreur de connexion:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-[var(--color-bg-dark)] font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              Markdown<span className="text-gradient">Pro</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Content de vous revoir
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Connectez-vous pour accéder à votre dashboard
            </p>
          </div>

          {/* GitHub Button */}
          <button
            onClick={() => signIn.social({
              provider: "github",
              callbackURL: "/dashboard"
            })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-primary)] transition-all mb-6"
          >
            <Github className="w-5 h-5" />
            Continuer avec GitHub
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border-dark)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-bg-dark)] text-[var(--color-text-muted)]">
                ou continuer avec email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Mot de passe
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline">
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-[var(--color-text-secondary)]">
            Pas encore de compte ?{" "}
            <Link href="/auth/signup" className="text-[var(--color-primary)] hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-bg-darker)]">
        {/* Orbs */}
        <div className="orb orb-teal w-[500px] h-[500px] -top-20 -right-20 opacity-40" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-20 left-20 opacity-30" />
        <div className="orb orb-cyan w-[300px] h-[300px] top-1/3 left-1/2 opacity-20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="badge-floating mb-8">
            <Sparkles className="w-4 h-4" />
            <span>+10,000 utilisateurs</span>
          </div>

          <h2 className="text-4xl font-bold text-[var(--color-text-primary)] text-center mb-4">
            Créez des README{" "}
            <span className="text-gradient">parfaits</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-center max-w-md mb-12">
            Accédez à vos documents, templates premium et widgets GitHub
            depuis votre dashboard personnalisé.
          </p>

          {/* Feature list */}
          <div className="space-y-4 w-full max-w-sm">
            <FeatureItem text="Widgets GitHub intégrés" />
            <FeatureItem text="Templates premium" />
            <FeatureItem text="Export multi-formats" />
            <FeatureItem text="Génération IA" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-dark)]/50 border border-[var(--color-border-dark)]">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-[var(--color-bg-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-[var(--color-text-secondary)]">{text}</span>
    </div>
  )
}
