"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Loader2, ShoppingCart } from "lucide-react"
import { useTemplates, TemplateCategory } from "@/hooks/use-templates"
import { PurchaseButton } from "@/components/templates/purchase-button"
import { useState } from "react"

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
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | undefined>()
  
  const { templates, loading, error } = useTemplates({
    category: selectedCategory
  })

  const handleSelectTemplate = (content: string) => {
    // Store in localStorage for editor
    localStorage.setItem('selectedTemplate', content)
    window.location.href = '/editor'
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Templates README
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Templates professionnels pour vos projets. Achat unique de 5€ à 15€ selon la complexité.
        </p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Button 
          variant={selectedCategory === undefined ? "default" : "outline"} 
          size="sm"
          onClick={() => setSelectedCategory(undefined)}
        >
          Tous les templates
        </Button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Button 
            key={key}
            variant={selectedCategory === key ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(key as TemplateCategory)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Grille de templates */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Chargement des templates...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">
                    {categoryLabels[template.category]}
                  </Badge>
                  <span className="text-2xl font-bold text-green-600">
                    {(template.price / 100).toFixed(2)}€
                  </span>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardHeader>
              
              <CardContent>
                {/* Thumbnail placeholder */}
                <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Aperçu du template</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Prévisualiser
                  </Button>
                  <PurchaseButton 
                    templateId={template.id}
                    templateName={template.name}
                    price={template.price}
                    isPremium={template.isPremium}
                    onPurchaseSuccess={() => handleSelectTemplate("")}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {templates.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Aucun template trouvé pour cette catégorie</p>
          <Button onClick={() => setSelectedCategory(undefined)}>
            Voir tous les templates
          </Button>
        </div>
      )}
    </div>
  )
}