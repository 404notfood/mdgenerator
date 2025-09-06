"use client"

import { useState } from "react"

interface PaymentLinkResponse {
  paymentLink: string
  purchaseId: string
  amount: number
  templateName: string
}

export function usePayments() {
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPaymentLink = async (templateId: string): Promise<PaymentLinkResponse | null> => {
    try {
      setIsCreatingPayment(true)
      setError(null)

      const response = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création du lien de paiement')
      }

      const data = await response.json()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      return null
    } finally {
      setIsCreatingPayment(false)
    }
  }

  const simulatePaymentSuccess = async (purchaseId: string) => {
    try {
      // Simuler un webhook de succès
      const response = await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: `mock-${purchaseId}`,
          status: 'completed'
        })
      })

      return response.ok
    } catch (err) {
      console.error('Erreur lors de la simulation du paiement:', err)
      return false
    }
  }

  return {
    createPaymentLink,
    simulatePaymentSuccess,
    isCreatingPayment,
    error,
    clearError: () => setError(null)
  }
}