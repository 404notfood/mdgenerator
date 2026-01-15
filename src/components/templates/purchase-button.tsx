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
import { Crown, Loader2, ShoppingCart, CheckCircle, ExternalLink, Sparkles } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PurchaseButtonProps {
  templateId: string
  templateName: string
  templateContent?: string
  price: number
  isPremium: boolean
  onPurchaseSuccess?: () => void
}

export function PurchaseButton({
  templateId,
  templateName,
  templateContent,
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
  const router = useRouter()

  const handleUseTemplate = () => {
    if (templateContent) {
      localStorage.setItem('selectedTemplate', templateContent)
    }
    router.push('/editor')
  }

  if (!isPremium) {
    return (
      <Button
        className="flex-1 btn-primary text-sm py-2"
        onClick={handleUseTemplate}
      >
        <Sparkles className="w-4 h-4 mr-1" />
        Utiliser
      </Button>
    )
  }

  if (!session) {
    return (
      <Button
        className="flex-1 btn-primary text-sm py-2"
        onClick={() => window.location.href = '/auth/signin'}
      >
        <Crown className="w-4 h-4 mr-1" />
        Connexion
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
    setPaymentLink(null)
    setPurchaseId(null)
    setPaymentCompleted(false)
  }

  const handleClose = () => {
    setDialogOpen(false)
    resetDialog()
  }

  const handleContinue = () => {
    handleClose()
    if (templateContent) {
      localStorage.setItem('selectedTemplate', templateContent)
    }
    router.push('/editor')
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 btn-primary text-sm py-2"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          {(price / 100).toFixed(0)}€
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <Crown className="w-5 h-5 text-yellow-500" />
            Acheter le template premium
          </DialogTitle>
          <DialogDescription className="text-[var(--color-text-muted)]">
            Débloquez l&apos;accès au template &quot;{templateName}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!paymentLink && !paymentCompleted && (
            <div className="text-center space-y-4">
              <div className="p-6 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)]">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">{templateName}</h3>
                <p className="text-3xl font-bold text-gradient mb-1">
                  {(price / 100).toFixed(2)}€
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Paiement unique • Accès à vie
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                  {error}
                </p>
              )}

              <Button
                onClick={handlePurchase}
                disabled={isCreatingPayment}
                className="w-full btn-primary"
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
              <div className="p-6 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30">
                <CheckCircle className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Lien de paiement créé !</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Cliquez sur le bouton ci-dessous pour effectuer le paiement via Revolut
                </p>

                <Button asChild className="btn-primary mb-4">
                  <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Payer avec Revolut
                  </a>
                </Button>

                {/* Bouton de simulation pour les tests */}
                <div className="border-t border-[var(--color-border-dark)] pt-4 mt-4">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    Mode développement - Simuler le paiement
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulatePayment}
                    className="border-[var(--color-border-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                  >
                    ✅ Simuler paiement réussi
                  </Button>
                </div>
              </div>
            </div>
          )}

          {paymentCompleted && (
            <div className="text-center space-y-4">
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Paiement réussi !
                </h3>
                <p className="text-[var(--color-text-muted)] mb-4">
                  Vous avez maintenant accès au template &quot;{templateName}&quot;
                </p>
                <Button onClick={handleContinue} className="btn-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Utiliser le template
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
