"use client"

import { useState } from "react"
import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Github,
  Twitter,
  Linkedin,
  CheckCircle,
  Loader2
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500))

    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-teal w-[500px] h-[500px] -top-40 -right-40 opacity-20" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-0 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Parlons de votre{" "}
              <span className="text-gradient">projet</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)]">
              Une question, une suggestion ou un partenariat ? Nous sommes là pour vous.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
                Informations de contact
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      Email
                    </h3>
                    <p className="text-[var(--color-text-muted)]">
                      contact@markdownpro.dev
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      Support
                    </h3>
                    <p className="text-[var(--color-text-muted)]">
                      support@markdownpro.dev
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Lun-Ven, 9h-18h CET
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      Adresse
                    </h3>
                    <p className="text-[var(--color-text-muted)]">
                      Paris, France
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      100% remote
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-bento">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-[var(--color-text-muted)] mb-6">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="btn-secondary"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        placeholder="vous@exemple.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Sujet
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="enterprise">Offre Team/Enterprise</option>
                      <option value="feedback">Feedback / Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
