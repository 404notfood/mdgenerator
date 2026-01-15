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
import { Input } from "@/components/ui/input"
import { Github, Download, Search, FileText, Lock, Globe, ArrowLeft, Loader2, FolderGit2 } from "lucide-react"
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
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchRepositories = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/github/repositories")
      if (response.ok) {
        const repos = await response.json()
        setRepositories(repos)
        setFilteredRepos(repos)
      } else {
        const data = await response.json()
        setError(data.error || "Erreur lors de la récupération des repositories")
      }
    } catch (error) {
      setError("Impossible de se connecter à GitHub")
    } finally {
      setLoading(false)
    }
  }

  const fetchMarkdownFiles = async (repo: Repository) => {
    setLoadingFiles(true)
    setSelectedRepo(repo)
    setError(null)
    try {
      const response = await fetch(`/api/github/files?repo=${encodeURIComponent(repo.full_name)}`)
      if (response.ok) {
        const files = await response.json()
        setMarkdownFiles(files)
      } else {
        setError("Erreur lors de la récupération des fichiers")
      }
    } catch (error) {
      setError("Impossible de charger les fichiers")
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
        setError("Erreur lors de l'import")
      }
    } catch (error) {
      setError("Impossible d'importer le fichier")
    } finally {
      setImporting(null)
    }
  }

  const goBackToRepos = () => {
    setSelectedRepo(null)
    setMarkdownFiles([])
    setError(null)
  }

  useEffect(() => {
    if (isOpen) {
      fetchRepositories()
    } else {
      setSelectedRepo(null)
      setMarkdownFiles([])
      setSearchQuery("")
      setError(null)
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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[var(--color-text-primary)]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block">
                {selectedRepo ? selectedRepo.name : 'Importer depuis GitHub'}
              </span>
              {selectedRepo && (
                <span className="text-xs font-normal text-[var(--color-text-muted)]">
                  Sélectionnez un fichier Markdown
                </span>
              )}
            </div>
          </DialogTitle>
          {!selectedRepo && (
            <DialogDescription className="text-[var(--color-text-muted)]">
              Choisissez un repository puis un fichier Markdown à importer
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!selectedRepo ? (
            <>
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <Input
                  placeholder="Rechercher un repository..."
                  className="pl-10 bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Repository list */}
              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 mx-auto text-[var(--color-primary)] animate-spin mb-3" />
                    <p className="text-[var(--color-text-muted)]">Chargement des repositories...</p>
                  </div>
                ) : filteredRepos.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderGit2 className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
                    <p className="text-[var(--color-text-secondary)]">
                      {repositories.length === 0
                        ? "Aucun repository trouvé"
                        : "Aucun repository ne correspond"
                      }
                    </p>
                    {repositories.length === 0 && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        Connectez-vous avec GitHub pour voir vos repos
                      </p>
                    )}
                  </div>
                ) : (
                  filteredRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/50 transition-all cursor-pointer group"
                      onClick={() => fetchMarkdownFiles(repo)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                              {repo.name}
                            </h3>
                            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                              repo.private
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                                : 'bg-green-500/10 text-green-400 border border-green-500/30'
                            }`}>
                              {repo.private ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                              {repo.private ? "Privé" : "Public"}
                            </span>
                          </div>

                          <p className="text-sm text-[var(--color-text-muted)] mb-2 line-clamp-1">
                            {repo.description || "Pas de description"}
                          </p>

                          <p className="text-xs text-[var(--color-text-muted)]">
                            Mis à jour le {new Date(repo.updated_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                onClick={goBackToRepos}
                className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux repositories
              </button>

              {/* Markdown files list */}
              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                {loadingFiles ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 mx-auto text-[var(--color-primary)] animate-spin mb-3" />
                    <p className="text-[var(--color-text-muted)]">Chargement des fichiers...</p>
                  </div>
                ) : markdownFiles.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
                    <p className="text-[var(--color-text-secondary)]">
                      Aucun fichier Markdown trouvé
                    </p>
                  </div>
                ) : (
                  markdownFiles.map((file) => (
                    <div
                      key={file.path}
                      className="p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[var(--color-text-primary)]">{file.name}</h3>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {file.path} • {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => importMarkdownFile(file.path)}
                          disabled={importing !== null}
                          className="btn-primary"
                        >
                          {importing === file.path ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Importer
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-[var(--color-border-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
