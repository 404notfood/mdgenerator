"use client"

import { Button } from "@/components/ui/button"
import { usePayments } from "@/hooks/use-payments"
import { useSession } from "@/lib/auth-client"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Crown, Loader2, ShoppingCart, CheckCircle, ExternalLink } from "lucide-react"
import { useState } from "react"

interface PurchaseButtonProps {
  templateId: string
  templateName: string
  price: number
  isPremium: boolean
  onPurchaseSuccess?: () => void
}

export function PurchaseButton({ 
  templateId, 
  templateName, 
  price, 
  isPremium,
  onPurchaseSuccess 
}: PurchaseButtonProps) {
  const { data: session } = useSession()
  const { createPaymentLink, simulatePaymentSuccess, isCreatingPayment, error } = usePayments()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [paymentLink, setPaymentLink] = useState<string | null>(null)
  const [purchaseId, setPurchaseId] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  if (!isPremium) {
    return (
      <Button className="w-full">
        <CheckCircle className="w-4 h-4 mr-2" />
        Utiliser gratuitement
      </Button>
    )
  }

  if (!session) {
    return (
      <Button 
        className="w-full"
        onClick={() => window.location.href = '/auth/signin'}
      >
        <Crown className="w-4 h-4 mr-2" />
        Se connecter pour acheter
      </Button>
    )
  }

  const handlePurchase = async () => {
    const result = await createPaymentLink(templateId)
    if (result) {
      setPaymentLink(result.paymentLink)
      setPurchaseId(result.purchaseId)
    }
  }

  const handleSimulatePayment = async () => {
    if (purchaseId) {
      const success = await simulatePaymentSuccess(purchaseId)
      if (success) {
        setPaymentCompleted(true)
        onPurchaseSuccess?.()
      }
    }
  }

  const resetDialog = () => {
    setDialogOpen(false)
    setPaymentLink(null)
    setPurchaseId(null)
    setPaymentCompleted(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={resetDialog}>
      <DialogTrigger asChild>
        <Button 
          className="w-full"
          onClick={() => setDialogOpen(true)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Acheter - {(price / 100).toFixed(2)}€
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Acheter le template premium
          </DialogTitle>
          <DialogDescription>
            Débloquez l&apos;accès au template &quot;{templateName}&quot;
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!paymentLink && !paymentCompleted && (
            <div className="text-center space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{templateName}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {(price / 100).toFixed(2)}€
                </p>
                <p className="text-sm text-gray-600">
                  Paiement unique • Accès à vie
                </p>
              </div>
              
              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </p>
              )}
              
              <Button
                onClick={handlePurchase}
                disabled={isCreatingPayment}
                className="w-full"
              >
                {isCreatingPayment ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Crown className="w-4 h-4 mr-2" />
                )}
                Créer le lien de paiement
              </Button>
            </div>
          )}

          {paymentLink && !paymentCompleted && (
            <div className="text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Lien de paiement créé !</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Cliquez sur le bouton ci-dessous pour effectuer le paiement via Revolut
                </p>
                
                <Button asChild className="mb-4">
                  <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Payer avec Revolut
                  </a>
                </Button>
                
                {/* Bouton de simulation pour les tests */}
                <div className="border-t pt-4 mt-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Mode développement - Simuler le paiement
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulatePayment}
                  >
                    ✅ Simuler paiement réussi
                  </Button>
                </div>
              </div>
            </div>
          )}

          {paymentCompleted && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Paiement réussi !
                </h3>
                <p className="text-green-700 mb-4">
                  Vous avez maintenant accès au template &quot;{templateName}&quot;
                </p>
                <Button onClick={resetDialog}>
                  Continuer
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}