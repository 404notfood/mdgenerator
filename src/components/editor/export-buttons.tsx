"use client"

import { Button } from "@/components/ui/button"
import { useExport } from "@/hooks/use-export"
import { useSession } from "@/lib/auth-client"
import { Download, FileText, Globe, Loader2, Crown } from "lucide-react"
import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ExportButtonsProps {
  content: string
  htmlContent?: string
}

export function ExportButtons({ content, htmlContent }: ExportButtonsProps) {
  const { exportMarkdown, exportHtml, isExporting, error } = useExport()
  const { data: session } = useSession()
  const [filename, setFilename] = useState("")
  const [includeStyles, setIncludeStyles] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [exportType, setExportType] = useState<'markdown' | 'html'>('markdown')

  const handleExport = async (type: 'markdown' | 'html') => {
    const finalFilename = filename.trim() || undefined
    
    if (type === 'markdown') {
      const success = await exportMarkdown(content, finalFilename)
      if (success) {
        setDialogOpen(false)
        setFilename("")
      }
    } else {
      const success = await exportHtml(htmlContent || content, finalFilename, includeStyles)
      if (success) {
        setDialogOpen(false)
        setFilename("")
      }
    }
  }

  const openDialog = (type: 'markdown' | 'html') => {
    setExportType(type)
    setDialogOpen(true)
  }

  return (
    <div className="flex gap-2">
      {/* Export Markdown - Toujours disponible */}
      <Dialog open={dialogOpen && exportType === 'markdown'} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDialog('markdown')}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            Export .md
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exporter en Markdown</DialogTitle>
            <DialogDescription>
              Téléchargez votre README au format Markdown (.md)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filename">Nom du fichier (optionnel)</Label>
              <Input
                id="filename"
                placeholder="readme"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                L&apos;extension .md sera ajoutée automatiquement
              </p>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                onClick={() => handleExport('markdown')}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Télécharger
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export HTML - Fonctionnalité premium */}
      {session ? (
        <Dialog open={dialogOpen && exportType === 'html'} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDialog('html')}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Globe className="w-4 h-4 mr-2" />
              )}
              Export HTML
              <Crown className="w-3 h-3 ml-1 text-yellow-500" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exporter en HTML</DialogTitle>
              <DialogDescription>
                Téléchargez votre README au format HTML avec styles inclus
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="filename-html">Nom du fichier (optionnel)</Label>
                <Input
                  id="filename-html"
                  placeholder="readme"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  L'extension .html sera ajoutée automatiquement
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-styles"
                  checked={includeStyles}
                  onCheckedChange={(checked) => setIncludeStyles(checked as boolean)}
                />
                <Label htmlFor="include-styles">
                  Inclure les styles CSS (recommandé)
                </Label>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={() => handleExport('html')}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Télécharger
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/auth/signin'}
          disabled={isExporting}
        >
          <Globe className="w-4 h-4 mr-2" />
          Export HTML
          <Crown className="w-3 h-3 ml-1 text-yellow-500" />
        </Button>
      )}
    </div>
  )
}