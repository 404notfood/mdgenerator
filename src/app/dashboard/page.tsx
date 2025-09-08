"use client"

import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  FileText, 
  Crown, 
  Download, 
  Eye, 
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Github
} from "lucide-react"
import { GitHubImportDialog } from "@/components/dashboard/github-import-dialog"

// Types temporaires (seront remplacés par les vraies données)
interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface Purchase {
  id: string
  templateId: string
  templateName: string
  amount: number
  createdAt: Date
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
}

// Données de démonstration
const demoDocuments: Document[] = [
  {
    id: '1',
    title: 'Mon Projet React',
    content: '# Mon Projet React\n\nDescription...',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2', 
    title: 'API Node.js',
    content: '# API Node.js\n\nDocumentation API...',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  }
]

const demoPurchases: Purchase[] = [
  {
    id: '1',
    templateId: '2',
    templateName: 'Open Source Pro',
    amount: 990,
    createdAt: new Date('2024-01-12'),
    status: 'SUCCEEDED'
  }
]

export default function DashboardPage() {
  const { data: session, isPending } = useSession()

  // Loading state
  if (isPending) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!session) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté pour accéder à votre dashboard.
        </p>
        <Button asChild>
          <Link href="/auth/signin">Se connecter</Link>
        </Button>
      </div>
    )
  }

  const user = session.user

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user.name || user.email}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Import GitHub - Premium/Admin seulement */}
          {((user as any).role === 'ADMIN' || demoPurchases.length > 0) && (
            <GitHubImportDialog>
              <Button variant="outline">
                <Github className="w-4 h-4 mr-2" />
                Importer de GitHub
              </Button>
            </GitHubImportDialog>
          )}
          
          <Button asChild>
            <Link href="/editor">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau README
            </Link>
          </Button>
          
          {/* Bouton temporaire pour devenir admin - À supprimer après */}
          {((user as any).role !== 'ADMIN') && (
            <Button 
              variant="outline" 
              onClick={async () => {
                try {
                  const response = await fetch('/api/admin/set-role', { method: 'POST' })
                  if (response.ok) {
                    window.location.reload()
                  }
                } catch (error) {
                  console.error('Erreur:', error)
                }
              }}
            >
              <Crown className="w-4 h-4 mr-2" />
              Devenir Admin
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoDocuments.length}</div>
            <p className="text-xs text-muted-foreground">
              README créés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Templates Premium
            </CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoPurchases.length}</div>
            <p className="text-xs text-muted-foreground">
              Templates achetés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exports
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Plan
            </CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gratuit</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/pricing" className="text-blue-600 hover:underline">
                Passer au Pro
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Documents */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Documents récents</h2>
            <div className="flex gap-2">
              {/* Import GitHub - Premium/Admin seulement */}
              {((user as any).role === 'ADMIN' || demoPurchases.length > 0) && (
                <GitHubImportDialog>
                  <Button variant="ghost" size="sm">
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </Button>
                </GitHubImportDialog>
              )}
              
              <Button variant="outline" size="sm" asChild>
                <Link href="/editor">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouveau
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {demoDocuments.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold truncate">{document.title}</h3>
                    <div className="flex gap-1 ml-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {document.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    Créé le {document.createdAt.toLocaleDateString('fr-FR')}
                    <Clock className="w-3 h-3 ml-4 mr-1" />
                    Modifié le {document.updatedAt.toLocaleDateString('fr-FR')}
                  </div>
                </CardContent>
              </Card>
            ))}

            {demoDocuments.length === 0 && (
              <Card className="text-center p-8">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-semibold mb-2">Aucun document</h3>
                <p className="text-gray-600 mb-4">
                  Créez votre premier README pour commencer
                </p>
                <Button asChild>
                  <Link href="/editor">Créer un README</Link>
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* Templates Premium */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Templates Premium</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/templates">
                Parcourir
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {demoPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-semibold">{purchase.templateName}</h3>
                    </div>
                    <Badge 
                      variant={purchase.status === 'SUCCEEDED' ? 'default' : 'destructive'}
                    >
                      {purchase.status === 'SUCCEEDED' ? 'Actif' : 'Échoué'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Acheté le {purchase.createdAt.toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {(purchase.amount / 100).toFixed(2)}€
                    </span>
                    <Button size="sm">
                      Utiliser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {demoPurchases.length === 0 && (
              <Card className="text-center p-8">
                <Crown className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-semibold mb-2">Aucun template premium</h3>
                <p className="text-gray-600 mb-4">
                  Découvrez nos templates professionnels
                </p>
                <Button asChild>
                  <Link href="/templates">Parcourir les templates</Link>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}