'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePermissions } from '@/hooks/use-permissions'
import { Crown, Lock, Eye, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface PremiumTemplate {
  id: string
  name: string
  description: string
  category: string
  features: string[]
  content: string
  preview: string
}

const premiumTemplates: PremiumTemplate[] = [
  {
    id: 'enterprise-api',
    name: 'API Enterprise',
    description: 'Template complet pour API d&apos;entreprise avec badges dynamiques et callouts',
    category: 'API',
    features: ['Badges dynamiques', 'Callouts colorés', 'Icônes tech', 'Documentation complète'],
    content: `# 🚀 Enterprise API

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github)
![Version](https://img.shields.io/badge/Version-v2.1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-98%25-brightgreen?style=for-the-badge)

## 📋 Description

API REST moderne construite avec les meilleures pratiques d'entreprise.

> [!IMPORTANT] Authentification requise
> Cette API nécessite une authentification JWT valide pour tous les endpoints.

## 🛠️ Tech Stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" width="40" height="40"/>

## ⚡ Installation

> [!TIP] Utilisation de Docker
> Pour une installation rapide, utilisez Docker Compose inclus dans le projet.

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

## 🔧 Configuration

> [!WARNING] Variables d'environnement
> Assurez-vous de configurer toutes les variables d'environnement requises avant de démarrer.

| Variable | Description | Requis |
|----------|-------------|--------|
| \`DATABASE_URL\` | URL de connexion PostgreSQL | ✅ |
| \`REDIS_URL\` | URL de connexion Redis | ✅ |
| \`JWT_SECRET\` | Clé secrète JWT | ✅ |

## 📡 Endpoints

### Authentication
- \`POST /auth/login\` - Connexion utilisateur
- \`POST /auth/refresh\` - Renouvellement du token
- \`POST /auth/logout\` - Déconnexion

### Users
- \`GET /users\` - Liste des utilisateurs
- \`POST /users\` - Créer un utilisateur
- \`PUT /users/:id\` - Modifier un utilisateur

> [!CAUTION] Rate Limiting
> Les endpoints sont limités à 100 requêtes par minute par IP.

## 📊 Monitoring

![Uptime](https://img.shields.io/badge/Uptime-99.9%25-brightgreen)
![Response Time](https://img.shields.io/badge/Response_Time-45ms-blue)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez le guide de contribution pour plus d'informations.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.`,
    preview: 'Template complet avec badges de build, callouts de sécurité, icônes tech et documentation structurée.'
  },
  {
    id: 'fullstack-saas',
    name: 'SaaS Full-Stack',
    description: 'Template pour application SaaS avec fonctionnalités premium avancées',
    category: 'SaaS',
    features: ['Badges de métriques', 'Callouts business', 'Stack icons', 'Roadmap'],
    content: `# 💼 SaaS Platform

![Users](https://img.shields.io/badge/Users-10K+-brightgreen?style=flat&logo=users)
![Revenue](https://img.shields.io/badge/MRR-$50K+-blue?style=flat&logo=dollar-sign)
![Uptime](https://img.shields.io/badge/Uptime-99.99%25-green?style=flat&logo=server)

## 🎯 Vision

Plateforme SaaS moderne pour simplifier la gestion d'entreprise.

> [!IMPORTANT] Version Beta
> Nous sommes actuellement en phase beta. Contactez-nous pour un accès anticipé.

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- Authentification multi-facteur
- SSO avec Google, Microsoft, GitHub
- Chiffrement de bout en bout
- Conformité GDPR

> [!TIP] Sécurité renforcée
> Activez la 2FA pour une sécurité maximale de votre compte.

### 📊 Analytics & Reporting
- Tableaux de bord en temps réel
- Rapports personnalisables
- Exportation de données
- API de métriques

### 🤖 Automatisation
- Workflows personnalisés
- Intégrations tierces
- Notifications intelligentes
- Tâches programmées

## 🛠️ Architecture

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40"/>

### Frontend
- **React 18** avec Next.js 14
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations

### Backend
- **Node.js** avec Express
- **Prisma** ORM
- **PostgreSQL** base de données
- **Redis** pour le cache

### Infrastructure
- **Docker** pour la containerisation
- **AWS** pour le cloud
- **Kubernetes** pour l'orchestration
- **CloudFlare** pour le CDN

> [!WARNING] Coûts d'infrastructure
> Les coûts peuvent augmenter avec l'usage. Surveillez votre facturation AWS.

## 🚀 Roadmap

### Q1 2024
- [ ] Mobile App (iOS/Android)
- [ ] API v2 avec GraphQL
- [ ] Intégrations Slack/Teams

### Q2 2024
- [ ] IA/ML Analytics
- [ ] White-label solution
- [ ] Enterprise SSO

> [!NOTE] Suggestions bienvenues
> Proposez vos idées de fonctionnalités sur notre GitHub Discussions.

## 📈 Métriques

![Downloads](https://img.shields.io/badge/Downloads-100K+-blue)
![Stars](https://img.shields.io/badge/GitHub_Stars-2.5K+-yellow)
![Contributors](https://img.shields.io/badge/Contributors-25+-green)

## 🎉 Clients

Ils nous font confiance :
- 🏢 Fortune 500 companies
- 🚀 Scale-ups technologiques  
- 🌍 PME internationales

## 💰 Pricing

| Plan | Prix | Utilisateurs | Support |
|------|------|-------------|---------|
| Starter | Free | 5 | Community |
| Pro | $29/mois | 50 | Email |
| Enterprise | Custom | Illimité | Dédié |

## 📞 Contact

- 📧 Email: hello@saasplatform.com
- 💬 Discord: [Rejoignez notre communauté](https://discord.gg/saas)
- 🐦 Twitter: [@SaaSPlatform](https://twitter.com/saasplatform)`,
    preview: 'Template SaaS complet avec métriques business, roadmap, pricing et callouts stratégiques.'
  },
  {
    id: 'open-source-lib',
    name: 'Librairie Open Source',
    description: 'Template pour projet open source avec communauté et contributions',
    category: 'Open Source',
    features: ['Badges community', 'Callouts contribution', 'Tech stack', 'Guide complet'],
    content: `# 📚 React SuperComponents

![npm version](https://img.shields.io/npm/v/react-supercomponents?style=flat-square&color=blue)
![npm downloads](https://img.shields.io/npm/dm/react-supercomponents?style=flat-square&color=green)
![GitHub stars](https://img.shields.io/github/stars/user/react-supercomponents?style=flat-square&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/user/react-supercomponents?style=flat-square&color=orange)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

Collection de composants React modernes et accessibles pour accélérer votre développement.

> [!TIP] Installation rapide
> \`npm install react-supercomponents\` et commencez immédiatement !

## ✨ Fonctionnalités

- 🎨 **50+ composants** prêts à l'emploi
- 🌙 **Mode sombre** natif
- ♿ **Accessibilité** WCAG 2.1 AA
- 📱 **Responsive** par défaut
- 🎭 **Thèmes** personnalisables
- 📦 **Tree-shaking** optimisé
- 🔧 **TypeScript** support complet

## 🛠️ Technologies

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" alt="Sass" width="40" height="40"/>

## 🚀 Installation

\`\`\`bash
npm install react-supercomponents
# ou
yarn add react-supercomponents
# ou
pnpm add react-supercomponents
\`\`\`

## 💻 Usage

\`\`\`jsx
import { Button, Card, Modal } from 'react-supercomponents'

function App() {
  return (
    <Card>
      <h1>Hello World</h1>
      <Button variant="primary">
        Click me!
      </Button>
    </Card>
  )
}
\`\`\`

> [!IMPORTANT] Peer Dependencies
> Assurez-vous d'avoir React 16.8+ et React-DOM installés.

## 📖 Documentation

Consultez notre [documentation complète](https://docs.react-supercomponents.com) avec :
- 📋 Guide de démarrage
- 🎨 Storybook interactif  
- 💡 Exemples d'usage
- 🎯 Meilleures pratiques

## 🤝 Contribution

Nous accueillons toutes les contributions ! 

> [!NOTE] Comment contribuer
> 1. Fork le projet
> 2. Créez votre branche (\`git checkout -b feature/AmazingFeature\`)
> 3. Committez vos changements (\`git commit -m 'Add AmazingFeature'\`)
> 4. Push la branche (\`git push origin feature/AmazingFeature\`)
> 5. Ouvrez une Pull Request

### 🏗️ Développement local

\`\`\`bash
git clone https://github.com/user/react-supercomponents
cd react-supercomponents
npm install
npm run dev
\`\`\`

> [!WARNING] Tests requis
> Assurez-vous que tous les tests passent avant de soumettre une PR.

## 🐛 Bug Reports

Trouvé un bug ? [Créez une issue](https://github.com/user/react-supercomponents/issues) avec :
- Description du problème
- Étapes pour reproduire
- Environnement (OS, Browser, versions)
- Captures d'écran si applicable

## 🌟 Contributors

Un grand merci à tous nos contributeurs !

![Contributors](https://img.shields.io/github/contributors/user/react-supercomponents?style=flat-square)

## 📊 Stats

![GitHub issues](https://img.shields.io/github/issues/user/react-supercomponents?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/user/react-supercomponents?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/user/react-supercomponents?style=flat-square)

## 💖 Sponsors

Ce projet est soutenu par de généreux sponsors :

- 🥇 [Sponsor Gold](https://sponsor1.com)
- 🥈 [Sponsor Silver](https://sponsor2.com)

[Devenez sponsor](https://github.com/sponsors/user) et aidez-nous à maintenir ce projet !

## 📄 Licence

Distribué sous licence MIT. Voir \`LICENSE\` pour plus d'informations.

## 🔗 Liens utiles

- [🌐 Website](https://react-supercomponents.com)
- [📚 Documentation](https://docs.react-supercomponents.com)
- [🎨 Storybook](https://storybook.react-supercomponents.com)
- [💬 Discord](https://discord.gg/react-supercomponents)
- [🐦 Twitter](https://twitter.com/reactsuper)`,
    preview: 'Template open source professionnel avec badges GitHub, guide de contribution et documentation complète.'
  }
]

interface PremiumTemplatesProps {
  onSelectTemplate: (content: string) => void
}

export function PremiumTemplates({ onSelectTemplate }: PremiumTemplatesProps) {
  const { canAccessPremiumTemplates } = usePermissions()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyTemplate = async (template: PremiumTemplate) => {
    try {
      await navigator.clipboard.writeText(template.content)
      setCopiedId(template.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy template:', err)
    }
  }

  const handleUseTemplate = (template: PremiumTemplate) => {
    onSelectTemplate(template.content)
  }

  if (!canAccessPremiumTemplates) {
    return (
      <div className="text-center py-12">
        <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Templates Premium
        </h3>
        <p className="text-gray-600 mb-6">
          Accédez à notre collection de templates avancés avec les fonctionnalités premium.
        </p>
        <Button>
          <Crown className="w-4 h-4 mr-2" />
          Upgrade vers Premium
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Templates Premium</h2>
        </div>
        <p className="text-gray-600">
          Templates avancés avec badges dynamiques, callouts et icônes professionnelles
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {premiumTemplates.map((template) => (
          <Card key={template.id} className="relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Fonctionnalités:</p>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  <Eye className="w-3 h-3 inline mr-1" />
                  {template.preview}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyTemplate(template)}
                  className="flex-1"
                  disabled={copiedId === template.id}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-3 h-3 mr-2" />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-2" />
                      Copier
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1"
                >
                  Utiliser
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Crown className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Fonctionnalités Premium Incluses
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Badges dynamiques avec shields.io</li>
              <li>• Callouts GitHub natifs colorés</li>
              <li>• Palette d'icônes DevIcons complète</li>
              <li>• Templates mis à jour régulièrement</li>
              <li>• Support prioritaire</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}