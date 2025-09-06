import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, 
  Palette, 
  Download, 
  Github, 
  Zap, 
  Shield,
  Crown,
  Users
} from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Éditeur WYSIWYG",
    description: "Éditez votre README en temps réel avec notre éditeur visuel intuitif"
  },
  {
    icon: Palette,
    title: "Templates Premium",
    description: "Accédez à une bibliothèque de templates professionnels pour tous types de projets"
  },
  {
    icon: Download,
    title: "Export Multiple",
    description: "Exportez en Markdown (.md) ou HTML avec styles pour tous vos besoins"
  },
  {
    icon: Github,
    title: "Intégration GitHub",
    description: "Poussez directement vos README vers vos repositories GitHub"
  },
  {
    icon: Zap,
    title: "Badges Dynamiques",
    description: "Générez automatiquement des badges pour vos projets (CI/CD, version, etc.)"
  },
  {
    icon: Shield,
    title: "Callouts Premium",
    description: "Ajoutez des callouts professionnels (warning, info, tip, etc.)"
  },
  {
    icon: Crown,
    title: "Fonctionnalités Premium",
    description: "Débloquez des outils avancés avec notre abonnement"
  },
  {
    icon: Users,
    title: "Support Communauté",
    description: "Rejoignez une communauté de développeurs qui créent de beaux README"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des outils puissants pour créer des README qui se démarquent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}