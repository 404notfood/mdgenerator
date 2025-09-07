import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SecurityNoticeProps {
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
}

export function SecurityNotice({ 
  type, 
  title, 
  message, 
  dismissible = false, 
  onDismiss 
}: SecurityNoticeProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const icons = {
    info: Shield,
    warning: AlertTriangle,
    error: Lock
  }

  const colors = {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    error: 'border-red-200 bg-red-50 text-red-800'
  }

  const Icon = icons[type]

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <Alert className={colors[type]}>
      <Icon className="h-4 w-4" />
      <AlertDescription>
        <div className="flex justify-between items-start">
          <div>
            <strong className="font-semibold">{title}</strong>
            <p className="mt-1 text-sm">{message}</p>
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-current hover:bg-current/10 -mt-1"
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

// Composant pour afficher l'état de sécurité de la session
export function SessionSecurityStatus() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Session sécurisée
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-green-600 hover:bg-green-100"
        >
          {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {showDetails && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Connexion HTTPS chiffrée</li>
            <li>✓ Token d&apos;authentification sécurisé</li>
            <li>✓ Protection CSRF active</li>
            <li>✓ Headers de sécurité configurés</li>
            <li>✓ Rate limiting activé</li>
          </ul>
        </div>
      )}
    </div>
  )
}

// Messages de sécurité prédéfinis
export const SecurityNotices = {
  UploadSecurity: () => (
    <SecurityNotice
      type="info"
      title="Upload sécurisé"
      message="Vos fichiers sont scannés et stockés de manière sécurisée. Seuls les formats d'images autorisés sont acceptés."
      dismissible
    />
  ),

  PaymentSecurity: () => (
    <SecurityNotice
      type="info"
      title="Paiement sécurisé"
      message="Vos paiements sont traités par Revolut Business avec chiffrement bancaire. Nous ne stockons aucune information de carte."
      dismissible
    />
  ),

  DataProtection: () => (
    <SecurityNotice
      type="info"
      title="Protection des données"
      message="Vos données sont chiffrées et protégées conformément au RGPD. Vous contrôlez entièrement vos informations."
      dismissible
    />
  ),

  RateLimitWarning: () => (
    <SecurityNotice
      type="warning"
      title="Limite de taux atteinte"
      message="Vous avez atteint la limite de requêtes. Veuillez patienter quelques minutes avant de réessayer."
    />
  ),

  SecurityBreach: () => (
    <SecurityNotice
      type="error"
      title="Activité suspecte détectée"
      message="Pour votre sécurité, veuillez vous reconnecter. Si le problème persiste, contactez le support."
    />
  )
}