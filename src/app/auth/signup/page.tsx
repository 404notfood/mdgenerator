"use client"

import { useState } from "react"
import { signUp, signIn } from "@/lib/auth-client"
import Link from "next/link"
import {
  Github,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Zap,
  Shield
} from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
      })
    } catch (error) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.")
      console.error("Erreur d'inscription:", error)
    } finally {
      setLoading(false)
    }
  }

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { level: 0, text: "", color: "" }
    if (pwd.length < 6) return { level: 1, text: "Trop court", color: "bg-red-500" }
    if (pwd.length < 8) return { level: 2, text: "Faible", color: "bg-orange-500" }
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { level: 3, text: "Moyen", color: "bg-yellow-500" }
    return { level: 4, text: "Fort", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-bg-darker)]">
        {/* Orbs */}
        <div className="orb orb-teal w-[500px] h-[500px] -top-20 -left-20 opacity-40" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-20 right-20 opacity-30" />
        <div className="orb orb-cyan w-[300px] h-[300px] top-1/2 left-1/3 opacity-20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="badge-floating mb-8">
            <Zap className="w-4 h-4" />
            <span>Inscription gratuite</span>
          </div>

          <h2 className="text-4xl font-bold text-[var(--color-text-primary)] text-center mb-4">
            Rejoignez la{" "}
            <span className="text-gradient">communauté</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-center max-w-md mb-12">
            Plus de 10,000 développeurs utilisent MarkdownPro pour créer des README
            professionnels en quelques minutes.
          </p>

          {/* Benefits */}
          <div className="space-y-4 w-full max-w-sm">
            <BenefitItem
              icon={<Check className="w-4 h-4" />}
              title="Gratuit pour toujours"
              description="5 documents, templates gratuits inclus"
            />
            <BenefitItem
              icon={<Sparkles className="w-4 h-4" />}
              title="Widgets GitHub"
              description="Stats, streak, langages en un clic"
            />
            <BenefitItem
              icon={<Shield className="w-4 h-4" />}
              title="Données sécurisées"
              description="Chiffrement et protection RGPD"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              Créer un compte
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Commencez gratuitement, sans carte bancaire
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
            S'inscrire avec GitHub
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border-dark)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-bg-dark)] text-[var(--color-text-muted)]">
                ou avec email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  required
                  minLength={6}
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

              {/* Password Strength */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength.level >= level
                            ? passwordStrength.color
                            : "bg-[var(--color-border-dark)]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Force : {passwordStrength.text}
                  </p>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Terms */}
            <p className="text-xs text-[var(--color-text-muted)]">
              En créant un compte, vous acceptez nos{" "}
              <Link href="/terms" className="text-[var(--color-primary)] hover:underline">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                Politique de confidentialité
              </Link>
            </p>

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
                  Création du compte...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Créer mon compte
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center text-[var(--color-text-secondary)]">
            Déjà un compte ?{" "}
            <Link href="/auth/signin" className="text-[var(--color-primary)] hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function BenefitItem({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-dark)]/50 border border-[var(--color-border-dark)]">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
        <span className="text-[var(--color-bg-dark)]">{icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>
    </div>
  )
}
