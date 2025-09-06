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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Upload d'image
          </DialogTitle>
          <DialogDescription>
            Ajoutez des images à votre README (JPG, PNG, GIF, WebP - Max 5MB)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Zone de drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Glissez-déposez votre image ici
            </p>
            <p className="text-xs text-gray-500 mb-4">ou</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
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
              <div className="flex items-center justify-between text-sm">
                <span>Upload en cours...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800 font-medium">Erreur d'upload</p>
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Images uploadées */}
          {uploadedImages.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Images uploadées</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-800 truncate">
                        {image.filename}
                      </p>
                      <p className="text-xs text-green-600 font-mono truncate">
                        {image.url}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Le markdown des images a été ajouté automatiquement à votre éditeur.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}