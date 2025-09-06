"use client"

import { useSession, signIn, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <Button disabled>Chargement...</Button>
  }

  if (session.data) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Connecté comme {session.data.user.email}
        </span>
        <Button
          variant="outline"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/"
                }
              }
            })
          }}
        >
          Déconnexion
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard"
          })
        }}
      >
        Connexion GitHub
      </Button>
      <Button
        onClick={() => {
          // Rediriger vers une page de connexion email/mot de passe
          window.location.href = "/auth/signin"
        }}
      >
        Connexion
      </Button>
    </div>
  )
}