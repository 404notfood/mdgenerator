import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Prêt à créer votre premier README ?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Rejoignez des milliers de développeurs qui utilisent déjà notre plateforme 
          pour créer des README exceptionnels.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/editor">
              Commencer maintenant
            </Link>
          </Button>
          
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
          >
            <Link href="/templates">
              Voir les templates
            </Link>
          </Button>
        </div>
        
        <p className="text-blue-200 text-sm mt-6">
          Aucune carte de crédit requise • Commencez gratuitement
        </p>
      </div>
    </section>
  )
}