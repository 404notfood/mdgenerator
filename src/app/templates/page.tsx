import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Download, Crown } from "lucide-react"

// Types temporaires (seront remplacés par les types Prisma)
type TemplateCategory = "STARTUP" | "OPEN_SOURCE" | "API" | "MOBILE" | "WEB" | "DATA_SCIENCE" | "GENERAL"

interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  price: number
  thumbnail?: string
  isPremium: boolean
}

// Templates de démonstration (seront récupérés depuis la base de données)
const demoTemplates: Template[] = [
  {
    id: "1",
    name: "Startup MVP",
    description: "Template complet pour présenter votre MVP startup",
    category: "STARTUP",
    price: 0,
    isPremium: false
  },
  {
    id: "2",
    name: "Open Source Pro",
    description: "Template professionnel pour projets open source",
    category: "OPEN_SOURCE", 
    price: 990,
    isPremium: true
  },
  {
    id: "3",
    name: "API Documentation",
    description: "Documentation complète pour vos APIs REST/GraphQL",
    category: "API",
    price: 590,
    isPremium: true
  },
  {
    id: "4",
    name: "Mobile App",
    description: "Template pour applications mobiles iOS/Android",
    category: "MOBILE",
    price: 790,
    isPremium: true
  },
  {
    id: "5",
    name: "Web Application",
    description: "Template moderne pour applications web",
    category: "WEB",
    price: 0,
    isPremium: false
  },
  {
    id: "6",
    name: "Data Science",
    description: "Template pour projets de science des données",
    category: "DATA_SCIENCE",
    price: 1290,
    isPremium: true
  }
]

const categoryLabels: Record<TemplateCategory, string> = {
  STARTUP: "Startup",
  OPEN_SOURCE: "Open Source",
  API: "API",
  MOBILE: "Mobile",
  WEB: "Web",
  DATA_SCIENCE: "Data Science",
  GENERAL: "Général"
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Galerie de Templates
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choisissez parmi notre collection de templates professionnels pour créer 
          des README qui impressionnent. Commencez avec nos templates gratuits ou 
          débloquez l'accès aux templates premium.
        </p>
      </div>

      {/* Filtres (à implémenter plus tard) */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Button variant="outline" size="sm">Tous</Button>
        <Button variant="outline" size="sm">Gratuit</Button>
        <Button variant="outline" size="sm">Premium</Button>
        <Button variant="outline" size="sm">Startup</Button>
        <Button variant="outline" size="sm">Open Source</Button>
        <Button variant="outline" size="sm">API</Button>
        <Button variant="outline" size="sm">Mobile</Button>
        <Button variant="outline" size="sm">Web</Button>
        <Button variant="outline" size="sm">Data Science</Button>
      </div>

      {/* Grille de templates */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">
                  {categoryLabels[template.category]}
                </Badge>
                {template.isPremium && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <p className="text-sm text-gray-600">{template.description}</p>
            </CardHeader>
            
            <CardContent>
              {/* Thumbnail placeholder */}
              <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Aperçu du template</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {template.price === 0 ? "Gratuit" : `${(template.price / 100).toFixed(2)}€`}
                </span>
                {template.isPremium && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Aperçu
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={template.isPremium}
                >
                  <Download className="w-4 h-4 mr-1" />
                  {template.price === 0 ? "Utiliser" : "Acheter"}
                </Button>
              </div>
              
              {template.isPremium && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Nécessite un abonnement Premium
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Besoin de plus de templates ?
        </h2>
        <p className="text-gray-600 mb-6">
          Débloquez l'accès à tous nos templates premium et fonctionnalités avancées
        </p>
        <Button asChild size="lg">
          <Link href="/pricing">
            Voir les abonnements
          </Link>
        </Button>
      </div>
    </div>
  )
}