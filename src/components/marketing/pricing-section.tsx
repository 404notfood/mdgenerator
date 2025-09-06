import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "pour toujours",
    description: "Parfait pour débuter",
    features: [
      "Éditeur WYSIWYG complet",
      "Export Markdown (.md)",
      "3 templates de base",
      "Support communauté",
    ],
    notIncluded: [
      "Templates premium",
      "Export HTML stylé",
      "Intégration GitHub",
      "Badges dynamiques",
      "Callouts premium"
    ],
    cta: "Commencer",
    href: "/editor",
    popular: false
  },
  {
    name: "Pro",
    price: "9€",
    period: "par mois",
    description: "Pour les développeurs sérieux",
    features: [
      "Tout du plan Gratuit",
      "50+ templates premium",
      "Export HTML avec styles",
      "Intégration GitHub directe",
      "Badges dynamiques illimités",
      "Callouts premium",
      "Upload d'images",
      "Support prioritaire"
    ],
    notIncluded: [],
    cta: "Essayer Pro",
    href: "/pricing/pro",
    popular: true
  },
  {
    name: "Entreprise",
    price: "29€",
    period: "par mois",
    description: "Pour les équipes",
    features: [
      "Tout du plan Pro",
      "Templates personnalisés",
      "Branding personnalisé",
      "API d'intégration",
      "Analytics avancées",
      "Support dédié",
      "Formation équipe",
      "SLA garanti"
    ],
    notIncluded: [],
    cta: "Contacter",
    href: "/contact",
    popular: false
  }
]

export function PricingSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Changez à tout moment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'ring-2 ring-blue-600 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Plus populaire
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <li key={`not-${featureIndex}`} className="flex items-start opacity-50">
                      <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Toutes les fonctionnalités incluent une garantie satisfait ou remboursé de 30 jours
          </p>
          <p className="text-sm text-gray-500">
            Paiements sécurisés via Revolut Business • Pas de frais cachés • Annulation à tout moment
          </p>
        </div>
      </div>
    </section>
  )
}