"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Github, Download, Search, FileText, Lock, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  updated_at: string
  has_readme: boolean
  readme_sha?: string
}

interface MarkdownFile {
  name: string
  path: string
  size: number
  type: 'file' | 'dir'
}

interface GitHubImportDialogProps {
  children: React.ReactNode
}

export function GitHubImportDialog({ children }: GitHubImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [importing, setImporting] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/github/repositories")
      if (response.ok) {
        const repos = await response.json()
        setRepositories(repos)
        setFilteredRepos(repos)
      } else {
        console.error("Erreur lors de la récupération des repositories")
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMarkdownFiles = async (repo: Repository) => {
    setLoadingFiles(true)
    setSelectedRepo(repo)
    try {
      const response = await fetch(`/api/github/files?repo=${encodeURIComponent(repo.full_name)}`)
      if (response.ok) {
        const files = await response.json()
        setMarkdownFiles(files)
      } else {
        console.error("Erreur lors de la récupération des fichiers")
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoadingFiles(false)
    }
  }

  const importMarkdownFile = async (filePath: string) => {
    if (!selectedRepo) return
    
    setImporting(filePath)
    try {
      const response = await fetch("/api/github/readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo_full_name: selectedRepo.full_name,
          file_path: filePath
        })
      })

      if (response.ok) {
        const document = await response.json()
        setIsOpen(false)
        router.push(`/editor?id=${document.id}`)
      } else {
        console.error("Erreur lors de l'import")
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setImporting(null)
    }
  }

  const goBackToRepos = () => {
    setSelectedRepo(null)
    setMarkdownFiles([])
  }

  useEffect(() => {
    if (isOpen) {
      fetchRepositories()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRepos(repositories)
    } else {
      setFilteredRepos(
        repositories.filter(repo =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [searchQuery, repositories])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            {selectedRepo ? `Fichiers Markdown - ${selectedRepo.name}` : 'Importer depuis GitHub'}
          </DialogTitle>
          <DialogDescription>
            {selectedRepo 
              ? 'Choisissez un fichier Markdown à importer dans l\'éditeur'
              : 'Sélectionnez un repository puis un fichier Markdown à importer'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedRepo ? (
            <>
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un repository..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Liste des repositories */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des repositories...</p>
                  </div>
                ) : filteredRepos.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      {repositories.length === 0 
                        ? "Aucun repository trouvé" 
                        : "Aucun repository ne correspond à votre recherche"
                      }
                    </p>
                  </div>
                ) : (
                  filteredRepos.map((repo) => (
                    <Card key={repo.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-sm truncate">
                                {repo.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                {repo.private ? (
                                  <Lock className="w-3 h-3 text-gray-400" />
                                ) : (
                                  <Globe className="w-3 h-3 text-gray-400" />
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  {repo.private ? "Privé" : "Public"}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                              {repo.description || "Pas de description"}
                            </p>
                            
                            <p className="text-gray-400 text-xs">
                              Mis à jour le {new Date(repo.updated_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => fetchMarkdownFiles(repo)}
                            disabled={loadingFiles}
                            className="ml-4 flex-shrink-0"
                          >
                            Parcourir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              {/* Navigation retour */}
              <div className="flex items-center gap-2 pb-2 border-b">
                <Button variant="ghost" size="sm" onClick={goBackToRepos}>
                  ← Retour aux repositories
                </Button>
              </div>

              {/* Liste des fichiers Markdown */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {loadingFiles ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des fichiers...</p>
                  </div>
                ) : markdownFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Aucun fichier Markdown trouvé dans ce repository
                    </p>
                  </div>
                ) : (
                  markdownFiles.map((file) => (
                    <Card key={file.path} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <div>
                              <h3 className="font-medium text-sm">{file.name}</h3>
                              <p className="text-xs text-gray-500">{file.path}</p>
                              <p className="text-xs text-gray-400">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => importMarkdownFile(file.path)}
                            disabled={importing !== null}
                          >
                            {importing === file.path ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-1" />
                                Importer
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}