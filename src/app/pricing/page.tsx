import { PricingSection } from "@/components/marketing/pricing-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, HelpCircle } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Votre accès aux fonctionnalités premium sera maintenu jusqu'à la fin de votre période de facturation."
  },
  {
    question: "Que se passe-t-il si je dépasse mes limites ?",
    answer: "Nous vous enverrons une notification lorsque vous approchez de vos limites. Vous pouvez toujours mettre à niveau votre plan à tout moment."
  },
  {
    question: "Offrez-vous des remises pour les équipes ?",
    answer: "Oui, nous offrons des remises dégressives pour les équipes de 5 utilisateurs ou plus. Contactez-nous pour obtenir un devis personnalisé."
  },
  {
    question: "Comment fonctionnent les paiements ?",
    answer: "Tous les paiements sont sécurisés et traités par Revolut Business. Nous acceptons toutes les cartes de crédit principales et les virements bancaires."
  },
  {
    question: "Puis-je essayer les fonctionnalités premium ?",
    answer: "Tous les nouveaux utilisateurs bénéficient d'un essai gratuit de 7 jours pour tester toutes les fonctionnalités premium."
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Commencez gratuitement et évoluez à votre rythme. 
            Tous les plans incluent un support de qualité et une garantie satisfait ou remboursé.
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
                  <th className="text-center py-4 px-6 font-semibold">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold">Entreprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-6">Templates de base</td>
                  <td className="text-center py-4 px-6">3</td>
                  <td className="text-center py-4 px-6">50+</td>
                  <td className="text-center py-4 px-6">50+ + Personnalisés</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Export Markdown</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Export HTML stylé</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Intégration GitHub</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Badges dynamiques</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">Illimités</td>
                  <td className="text-center py-4 px-6">Illimités</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6">Upload d&apos;images</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">100MB</td>
                  <td className="text-center py-4 px-6">1GB</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Support</td>
                  <td className="text-center py-4 px-6">Communauté</td>
                  <td className="text-center py-4 px-6">Prioritaire</td>
                  <td className="text-center py-4 px-6">Dédié</td>
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