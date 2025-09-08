'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TipTapEditor } from '@/components/editor/tiptap-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExportButtons } from '@/components/editor/export-buttons'
import { ImageUpload } from '@/components/editor/image-upload'
import { PremiumFeatures } from '@/components/editor/premium-features'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSession } from '@/lib/auth-client'
import Link from 'next/link'
import { Crown, AlertTriangle } from 'lucide-react'

function EditorContent() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get('id')
  const { data: session } = useSession()
  
  const [content, setContent] = useState("<h1>Mon Super Projet</h1><p>Commencez à écrire votre README ici...</p>")
  const [loading, setLoading] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("")
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  
  // Vérifier si l'utilisateur est premium (a acheté des templates) ou admin
  const isPremium = (session?.user as any)?.role === 'ADMIN' || false // TODO: vérifier les achats
  
  // Calculer le nombre de caractères (texte seulement, sans HTML)
  const textContent = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
  const characterCount = textContent.length
  const CHARACTER_LIMIT = isPremium ? Infinity : 300
  const isOverLimit = !isPremium && characterCount > 300
  const remainingCharacters = isPremium ? Infinity : Math.max(0, 300 - characterCount)
  
  // Load document from ID or template from localStorage
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
        // Load template from localStorage if available
        const selectedTemplate = localStorage.getItem('selectedTemplate')
        if (selectedTemplate) {
          setContent(selectedTemplate)
          localStorage.removeItem('selectedTemplate') // Clean up
        }
      }
    }
    
    loadContent()
  }, [documentId])
  
  const handleInsertContent = (newContent: string) => {
    if (!isPremium) {
      const newTextLength = (content + '\n\n' + newContent).replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').length
      if (newTextLength > 300) {
        setShowPremiumModal(true)
        return
      }
    }
    setContent(prev => prev + '\n\n' + newContent)
  }
  
  const handleContentChange = (newContent: string) => {
    if (!isPremium) {
      const newTextLength = newContent.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').length
      if (newTextLength > 300) {
        // Permettre la suppression mais pas l'ajout
        if (newTextLength > characterCount) {
          return
        }
      }
    }
    setContent(newContent)
  }
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du document...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {documentTitle || "Éditeur README"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Créez des README professionnels avec notre éditeur Markdown WYSIWYG et les fonctionnalités premium.
        </p>
        {/* Compteur de caractères */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-4">
            <Badge variant={isOverLimit ? "destructive" : characterCount > 250 ? "warning" : "default"}>
              {isPremium ? (
                <div className="flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Illimité
                </div>
              ) : (
                `${characterCount}/${CHARACTER_LIMIT} caractères`
              )}
            </Badge>
            {!isPremium && remainingCharacters < 50 && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/pricing">
                  <Crown className="w-4 h-4 mr-1" />
                  Passer au Premium
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Alerte si limite dépassée */}
        {isOverLimit && (
          <Alert className="mb-6 max-w-2xl mx-auto bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 font-semibold text-center">
              <div className="text-lg mb-2">Limite de caractères dépassée !</div>
              <div className="text-sm mb-4">
                Vous avez dépassé la limite de 300 caractères pour les comptes gratuits.
                Passez au Premium pour un accès illimité.
              </div>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/pricing">
                  <Crown className="w-4 h-4 mr-2" />
                  PASSER AU PREMIUM - 5€
                </Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}

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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Éditeur Markdown</CardTitle>
            <CardDescription>
              Commencez à écrire votre README avec notre éditeur intuitif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TipTapEditor
              content={content}
              onChange={handleContentChange}
            />
          </CardContent>
        </Card>

        {/* Premium Features Sidebar */}
        <div className="space-y-6">
          <PremiumFeatures onInsert={handleInsertContent} />
        </div>
      </div>

      {/* Preview - Full Width Below */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>
              Voici comment votre README apparaîtra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] border prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-8 [&_h1]:text-gray-800 [&_h1]:border-b-2 [&_h1]:border-gray-200 [&_h1]:pb-2 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-6 [&_h2]:text-gray-700 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-1 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-5 [&_h3]:text-gray-600 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:ml-4 [&_li]:mb-1 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto [&_img]:cursor-pointer [&_hr]:border-0 [&_hr]:border-t-2 [&_hr]:border-gray-300 [&_hr]:my-8 [&_table]:border-collapse [&_table]:w-full [&_table]:my-4 [&_table]:text-sm [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100 [&_th]:font-bold [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2 [&_p]:my-3 [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:bg-gray-100 [&_blockquote]:my-4 [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:rounded [&_.highlight]:px-1 [&_.highlight]:py-0.5 [&_.highlight]:rounded">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    }>
      <EditorContent />
    </Suspense>
  )
}