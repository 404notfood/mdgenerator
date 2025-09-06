"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Download, Crown, Loader2 } from "lucide-react"
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
  const [premiumFilter, setPremiumFilter] = useState<boolean | undefined>()
  
  const { templates, loading, error } = useTemplates({
    category: selectedCategory,
    premium: premiumFilter
  })
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

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Button 
          variant={!selectedCategory && premiumFilter === undefined ? "default" : "outline"} 
          size="sm"
          onClick={() => { setSelectedCategory(undefined); setPremiumFilter(undefined) }}
        >
          Tous
        </Button>
        <Button 
          variant={premiumFilter === false ? "default" : "outline"} 
          size="sm"
          onClick={() => setPremiumFilter(false)}
        >
          Gratuit
        </Button>
        <Button 
          variant={premiumFilter === true ? "default" : "outline"} 
          size="sm"
          onClick={() => setPremiumFilter(true)}
        >
          Premium
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
                <div className="flex-1">
                  <PurchaseButton
                    templateId={template.id}
                    templateName={template.name}
                    price={template.price}
                    isPremium={template.isPremium}
                    onPurchaseSuccess={() => {
                      // Optionnel: rafraîchir la liste des templates
                      window.location.reload()
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
          
          {templates.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Crown className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun template trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos filtres ou parcourez tous nos templates.
              </p>
              <Button onClick={() => { setSelectedCategory(undefined); setPremiumFilter(undefined) }}>
                Voir tous les templates
              </Button>
            </div>
          )}
        </div>
      )}

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