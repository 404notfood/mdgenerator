"use client"

import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { 
  Crown, 
  Check, 
  Shield, 
  Star, 
  AlertCircle,
  CreditCard
} from "lucide-react"
import Link from "next/link"

const premiumFeatures = [
  "Limite de caractères étendue (100 000 au lieu de 10 000)",
  "Accès à tous les templates premium",
  "Export HTML stylé",
  "Intégration GitHub avancée",
  "Badges dynamiques illimités",
  "Callouts GitHub natifs",
  "Palette d'icônes complète",
  "Support prioritaire"
]

export default function BuyPremiumPage() {
  const { data: session, isPending } = useSession()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async () => {
    if (!session) {
      // Rediriger vers la connexion
      window.location.href = '/auth/signin?redirect=/buy-premium'
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/premium/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const { paymentUrl } = await response.json()
        // Rediriger vers Revolut pour le paiement
        window.location.href = paymentUrl
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors de la création du paiement')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isPending) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Chargement...</p>
      </div>
    )
  }

  // Check if user already has premium
  const hasPremium = session && (session.user as any).role === 'PREMIUM'

  if (hasPremium) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <Card className="text-center p-8">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vous avez déjà Premium !
          </h1>
          <p className="text-gray-600 mb-6">
            Votre compte dispose déjà de toutes les fonctionnalités premium.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard">
                Aller au Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/editor">
                Utiliser l'Éditeur
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Crown className="w-12 h-12 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900">
            Upgrade vers Premium
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Débloquez toutes les fonctionnalités avancées avec un achat unique de 5€. 
          Pas d'abonnement, accès à vie !
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Features List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ce que vous obtenez :
          </h2>
          <div className="space-y-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Garantie 30 jours
                </h3>
                <p className="text-sm text-blue-800">
                  Satisfait ou remboursé pendant 30 jours après votre achat.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">
                  Achat unique
                </h3>
                <p className="text-sm text-yellow-800">
                  Payez une fois, gardez l'accès à vie. Aucun frais récurrent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                <Crown className="w-3 h-3 mr-1" />
                PREMIUM
              </Badge>
              <CardTitle className="text-3xl">
                5€
                <span className="text-lg font-normal text-gray-500">/unique</span>
              </CardTitle>
              <p className="text-gray-600">Achat unique • Accès à vie</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {!session ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Vous devez être connecté pour effectuer un achat.
                    </p>
                  </div>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full"
                  >
                    <Link href="/auth/signin?redirect=/buy-premium">
                      Se connecter pour acheter
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Acheter Premium - 5€
                    </>
                  )}
                </Button>
              )}

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  Paiement sécurisé via Revolut Business
                </p>
                <p className="text-xs text-gray-500">
                  • Cartes acceptées • Pas de frais cachés •
                </p>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/premium-demo">
                    Voir les fonctionnalités premium
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}