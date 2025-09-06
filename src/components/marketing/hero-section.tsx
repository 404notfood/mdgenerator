import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth/auth-button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Créez des README
          <span className="text-blue-600"> professionnels</span>
          <br />
          en quelques minutes
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Notre éditeur Markdown WYSIWYG avec des templates premium vous aide à créer 
          des README qui impressionnent. Commencez gratuitement ou explorez notre 
          bibliothèque de templates professionnels.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/editor">
              Commencer gratuitement
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
            <Link href="/templates">
              Voir les templates
            </Link>
          </Button>
        </div>

        <div className="flex justify-center">
          <AuthButton />
        </div>

        {/* Demo preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl border overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Éditeur</h3>
                  <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                    <div className="text-blue-600"># Mon Projet</div>
                    <div className="text-gray-600">Description du projet...</div>
                    <div className="text-green-600">## Installation</div>
                    <div className="text-gray-600">```bash</div>
                    <div className="text-gray-600">npm install</div>
                    <div className="text-gray-600">```</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Aperçu</h3>
                  <div className="bg-white p-4 rounded border">
                    <h1 className="text-2xl font-bold mb-2">Mon Projet</h1>
                    <p className="text-gray-600 mb-4">Description du projet...</p>
                    <h2 className="text-xl font-bold mb-2">Installation</h2>
                    <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm">
                      npm install
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}