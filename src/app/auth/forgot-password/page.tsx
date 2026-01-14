"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Sparkles
} from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simuler l'envoi d'email (à implémenter avec Better Auth)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Implémenter avec Better Auth
      // await authClient.forgetPassword({ email })

      setSuccess(true)
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error("Erreur:", error)
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

          {/* Back link */}
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>

          {!success ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                  Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Envoyer le lien
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Email envoyé !
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Si un compte existe avec l'adresse <span className="text-[var(--color-primary)]">{email}</span>,
                vous recevrez un lien de réinitialisation dans quelques minutes.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Vous n'avez pas reçu l'email ?
                </p>
                <button
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                  className="btn-secondary"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {/* Help text */}
          <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
            Vous vous souvenez de votre mot de passe ?{" "}
            <Link href="/auth/signin" className="text-[var(--color-primary)] hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-bg-darker)]">
        {/* Orbs */}
        <div className="orb orb-teal w-[500px] h-[500px] -top-20 -right-20 opacity-40" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-20 left-20 opacity-30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center mb-8 animate-float">
            <Shield className="w-12 h-12 text-[var(--color-bg-dark)]" />
          </div>

          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-4">
            Sécurité{" "}
            <span className="text-gradient">renforcée</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-center max-w-md mb-12">
            Votre sécurité est notre priorité. Le lien de réinitialisation expire après 1 heure.
          </p>

          {/* Tips */}
          <div className="space-y-4 w-full max-w-sm">
            <TipItem
              icon={<Mail className="w-4 h-4" />}
              text="Vérifiez vos spams si vous ne trouvez pas l'email"
            />
            <TipItem
              icon={<Shield className="w-4 h-4" />}
              text="Choisissez un mot de passe fort et unique"
            />
            <TipItem
              icon={<Sparkles className="w-4 h-4" />}
              text="Activez l'authentification à deux facteurs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function TipItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-dark)]/50 border border-[var(--color-border-dark)]">
      <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm text-[var(--color-text-secondary)]">{text}</span>
    </div>
  )
}
