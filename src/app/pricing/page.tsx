import { PricingSection } from "@/components/marketing/pricing-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, HelpCircle } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "Puis-je utiliser la version gratuite indéfiniment ?",
    answer: "Oui ! La version gratuite inclut toutes les fonctionnalités de base pour créer des README professionnels. Aucune limite de temps."
  },
  {
    question: "Que comprend l'achat unique Premium ?",
    answer: "L'achat Premium à 5€ vous donne accès à vie à tous les templates premium, exports HTML/PDF, badges dynamiques, et callouts GitHub."
  },
  {
    question: "Y a-t-il des frais récurrents ?",
    answer: "Non ! L'achat Premium est unique. Une fois payé, vous gardez l'accès à toutes les fonctionnalités à vie."
  },
  {
    question: "Comment fonctionnent les paiements ?",
    answer: "Les paiements sont sécurisés et traités par Revolut Business. Nous acceptons toutes les cartes de crédit principales."
  },
  {
    question: "Puis-je tester les fonctionnalités premium avant d'acheter ?",
    answer: "Oui ! Visitez notre page de démonstration pour voir toutes les fonctionnalités premium en action."
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tarification simple
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Commencez gratuitement et débloquez toutes les fonctionnalités premium avec un achat unique de 5€. 
            Pas d'abonnement, pas de frais récurrents !
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="-mt-8">
        <PricingSection />
      </div>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comparaison détaillée des fonctionnalités
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-semibold">Fonctionnalités</th>
                  <th className="text-center py-4 px-6 font-semibold">Gratuit</th>
                  <th className="text-center py-4 px-6 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-6">Limite de caractères dans l'éditeur</td>
                  <td className="text-center py-4 px-6">10 000</td>
                  <td className="text-center py-4 px-6">100 000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Templates premium</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">Tous les templates</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Export Markdown</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Export HTML stylé</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Intégration GitHub</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Badges avancés et callouts</td>
                  <td className="text-center py-4 px-6">Limités</td>
                  <td className="text-center py-4 px-6">Illimités</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Support prioritaire</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de développeurs qui créent déjà des README exceptionnels
          </p>
          <Button asChild size="lg">
            <Link href="/editor">
              Essayer gratuitement
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}