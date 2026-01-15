"use client"

import { Button } from "@/components/ui/button"
import { useUpload } from "@/hooks/use-upload"
import { useSession } from "@/lib/auth-client"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Upload, Image as ImageIcon, Loader2, CheckCircle, X, Crown } from "lucide-react"
import { useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"

interface ImageUploadProps {
  onImageUploaded?: (url: string, alt?: string) => void
}

export function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const { data: session } = useSession()
  const { uploadFile, isUploading, uploadProgress, error, clearError } = useUpload()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, filename: string}>>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    clearError()
    const result = await uploadFile(file)
    
    if (result) {
      const newImage = {
        url: result.url,
        filename: result.filename
      }
      setUploadedImages(prev => [...prev, newImage])
      
      // Générer le markdown automatiquement
      const altText = file.name.split('.')[0].replace(/[_-]/g, ' ')
      const markdownImage = `![${altText}](${result.url})`
      
      onImageUploaded?.(markdownImage, altText)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleUpload(files[0])
    }
  }

  const resetDialog = () => {
    setDialogOpen(false)
    setUploadedImages([])
    clearError()
  }

  if (!session) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => window.location.href = '/auth/signin'}
      >
        <ImageIcon className="w-4 h-4 mr-2" />
        Upload Image
        <Crown className="w-3 h-3 ml-1 text-yellow-500" />
      </Button>
    )
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={resetDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ImageIcon className="w-4 h-4 mr-2" />
          Upload Image
          <Crown className="w-3 h-3 ml-1 text-yellow-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <ImageIcon className="w-5 h-5 text-[var(--color-primary)]" />
            Upload d'image
          </DialogTitle>
          <DialogDescription className="text-[var(--color-text-muted)]">
            Ajoutez des images à votre README (JPG, PNG, GIF, WebP - Max 5MB)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Zone de drop */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragOver
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/50 bg-[var(--color-surface-dark)]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">
              Glissez-déposez votre image ici
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">ou</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="btn-primary"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Choisir un fichier
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {/* Barre de progrès */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Upload en cours...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-medium">Erreur d'upload</p>
                  <p className="text-xs text-red-400/80">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Images uploadées */}
          {uploadedImages.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Images uploadées</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-400 truncate">
                        {image.filename}
                      </p>
                      <p className="text-xs text-green-400/70 font-mono truncate">
                        {image.url}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Le markdown des images a été ajouté automatiquement à votre éditeur.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}