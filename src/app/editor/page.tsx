'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TipTapEditor } from '@/components/editor/tiptap-editor'
import { PrismaNavbar } from '@/components/layout/prisma-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExportButtons } from '@/components/editor/export-buttons'
import { ImageUpload } from '@/components/editor/image-upload'
import { PremiumFeatures } from '@/components/editor/premium-features'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSession } from '@/lib/auth-client'
import Link from 'next/link'
import {
  Crown,
  AlertTriangle,
  Sparkles,
  Code2,
  Eye,
  FileText,
  Activity,
  Zap,
  Download
} from 'lucide-react'

function EditorContent() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get('id')
  const { data: session } = useSession()

  const [content, setContent] = useState("<h1>Mon Super Projet</h1><p>Commencez à écrire votre README ici...</p>")
  const [loading, setLoading] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("")
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const isPremium = (session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'PREMIUM' || false

  const convertMarkdownToPreview = (content: string) => {
    return content.replace(
      /!\[([^\]]*)\]\((https:\/\/img\.shields\.io[^)]+)\)/g,
      '<img src="$2" alt="$1" style="display: inline-block; margin: 2px;" />'
    )
  }

  const textContent = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
  const characterCount = textContent.length
  const CHARACTER_LIMIT = isPremium ? Infinity : 500
  const isOverLimit = !isPremium && characterCount > 500
  const remainingCharacters = isPremium ? Infinity : Math.max(0, 500 - characterCount)

  React.useEffect(() => {
    const loadContent = async () => {
      if (documentId) {
        setLoading(true)
        try {
          const response = await fetch(`/api/documents/${documentId}`)
          if (response.ok) {
            const document = await response.json()
            setContent(document.content)
            setDocumentTitle(document.title)
          }
        } catch (error) {
          console.error('Erreur lors du chargement du document:', error)
        } finally {
          setLoading(false)
        }
      } else {
        const selectedTemplate = localStorage.getItem('selectedTemplate')
        if (selectedTemplate) {
          setContent(selectedTemplate)
          localStorage.removeItem('selectedTemplate')
        }
      }
    }

    loadContent()
  }, [documentId])

  const handleInsertContent = (newContent: string) => {
    if (!isPremium) {
      const newTextLength = (content + '\n\n' + newContent).replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').length
      if (newTextLength > 500) {
        setShowPremiumModal(true)
        return
      }
    }
    setContent(prev => prev + '\n\n' + newContent)
  }

  const handleContentChange = (newContent: string) => {
    if (!isPremium) {
      const newTextLength = newContent.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').length
      if (newTextLength > 500) {
        if (newTextLength > characterCount) {
          setShowPremiumModal(true)
          return
        }
      }
    }
    setContent(newContent)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)]">
        <PrismaNavbar />
        <div className="container-custom py-32 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center animate-pulse">
            <Code2 className="w-8 h-8 text-[var(--color-bg-dark)]" />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">Chargement du document...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      <div className="container-custom py-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 shadow-lg glow-teal">
              <Code2 className="w-6 h-6 text-[var(--color-bg-dark)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
              {documentTitle || "Éditeur README"}
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-6">
            Créez des README professionnels avec notre éditeur Markdown WYSIWYG et les widgets GitHub.
          </p>

          {/* Character Counter */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className={`badge-floating ${isOverLimit ? 'border-red-500/50 bg-red-500/10 text-red-400' : ''}`}>
              {isPremium ? (
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>Caractères illimités</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{characterCount}/{CHARACTER_LIMIT} caractères</span>
                </div>
              )}
            </div>
            {!isPremium && remainingCharacters < 100 && (
              <Link href="/pricing" className="btn-primary text-sm py-2 px-4">
                <Crown className="w-4 h-4 mr-2" />
                Passer au Premium
              </Link>
            )}
          </div>

          {/* Over Limit Alert */}
          {isOverLimit && (
            <div className="mb-8 max-w-2xl mx-auto p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-red-400 mb-1">Limite de caractères dépassée !</p>
                  <p className="text-sm text-red-400/80 mb-3">
                    Vous avez dépassé la limite de 500 caractères. Passez au Premium pour un accès illimité.
                  </p>
                  <Link href="/pricing" className="btn-primary text-sm py-2 px-4 inline-flex">
                    <Crown className="w-4 h-4 mr-2" />
                    PASSER AU PREMIUM - 5
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <ExportButtons
              content={content}
              htmlContent={content}
            />
            <ImageUpload
              onImageUploaded={(markdownImage) => {
                handleInsertContent(markdownImage)
              }}
            />
          </div>
        </div>

        {/* Main Editor Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editor Card */}
          <div className="lg:col-span-2 card-bento">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Éditeur Markdown</h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Commencez à écrire votre README avec notre éditeur intuitif
                </p>
              </div>
            </div>
            <TipTapEditor
              content={content}
              onChange={handleContentChange}
            />
          </div>

          {/* Sidebar - Premium Features */}
          <div className="space-y-6">
            {isPremium ? (
              <PremiumFeatures onInsert={handleInsertContent} />
            ) : (
              <div className="card-bento border-yellow-500/30 bg-gradient-to-br from-[var(--color-surface-dark)] to-yellow-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-[var(--color-bg-dark)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      Fonctionnalités Premium
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Débloquez widgets, badges et plus
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <PremiumFeatureItem icon={<Activity className="w-4 h-4" />} text="Widgets GitHub (stats, langues, streak)" />
                  <PremiumFeatureItem icon={<Sparkles className="w-4 h-4" />} text="Badges professionnels" />
                  <PremiumFeatureItem icon={<Zap className="w-4 h-4" />} text="Callouts GitHub avancés" />
                  <PremiumFeatureItem icon={<Download className="w-4 h-4" />} text="Export GitHub direct" />
                  <PremiumFeatureItem icon={<Crown className="w-4 h-4" />} text="Caractères illimités" />
                </div>

                <Link href="/pricing" className="block w-full btn-primary text-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400">
                  <Crown className="w-4 h-4 mr-2" />
                  Passer au Premium - 5
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-10">
          <div className="card-bento">
            <div className="flex items-center gap-3 mb-6">
              <div className="feature-icon bg-gradient-to-br from-purple-500 to-pink-500">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Aperçu</h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Voici comment votre README apparaîtra sur GitHub
                </p>
              </div>
            </div>
            <div className="bg-[var(--color-bg-darker)] p-8 rounded-xl border border-[var(--color-border-dark)] min-h-[300px] prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: convertMarkdownToPreview(content) }} />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="sm:max-w-md bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-[var(--color-text-primary)]">
              <Crown className="w-6 h-6 text-yellow-500" />
              Limite atteinte !
            </DialogTitle>
            <DialogDescription className="text-base pt-2 text-[var(--color-text-secondary)]">
              Vous avez atteint la limite de 500 caractères pour les comptes gratuits.
              Passez au Premium pour un accès illimité.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 sm:flex-col">
            <Link href="/pricing" className="w-full btn-primary text-center bg-gradient-to-r from-yellow-500 to-amber-500">
              <Crown className="w-4 h-4 mr-2" />
              PASSER AU PREMIUM - 5
            </Link>
            <button
              className="w-full btn-secondary"
              onClick={() => setShowPremiumModal(false)}
            >
              Continuer en gratuit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PremiumFeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
      <span className="text-yellow-500">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center animate-pulse">
            <Code2 className="w-8 h-8 text-[var(--color-bg-dark)]" />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">Chargement...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  )
}
