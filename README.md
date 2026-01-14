# 🎨 Markdown Generator Pro

> Plateforme moderne de génération et d'édition de fichiers Markdown avec templates premium, intégration IA et fonctionnalités avancées.

![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Active-success)

## ✨ Fonctionnalités

### 🎯 Fonctionnalités principales
- **Éditeur Markdown riche** avec TipTap (tables, images, emojis, coloration syntaxique)
- **Templates premium** catégorisés (Startup, Open Source, API, Mobile, Web, Data Science)
- **Génération IA** de README et suggestions intelligentes
- **Export multi-formats** (HTML, Markdown)
- **Intégration GitHub** pour importer vos repositories
- **Système de paiement** avec Revolut
- **Mode freemium** avec gestion des rôles (USER, PREMIUM, ADMIN)
- **Panel d'administration** complet

### 🛠️ Architecture technique
- **Architecture POO** complète avec design patterns (Repository, Factory, Builder, Singleton)
- **Validation robuste** avec Zod
- **Gestion d'erreurs centralisée** avec types personnalisés
- **Services métier** découplés
- **DTOs** pour la sécurité des données
- **Système de notifications** moderne

## 🏗️ Stack technique

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **TipTap Editor** (éditeur WYSIWYG)
- **Radix UI** (composants accessibles)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **MySQL** (base de données)
- **Better Auth** (authentification)
- **Zod** (validation)

### Services externes
- **Revolut** (paiements)
- **GitHub OAuth**

## 📦 Installation

### Prérequis
- Node.js 18+
- MySQL 8+
- npm ou yarn

### Étapes d'installation

1. **Clonez le repository**
```bash
git clone https://github.com/votre-username/markdown-generator.git
cd markdown-generator
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Configurez les variables d'environnement**

Créez un fichier `.env` à la racine :

```env
# Base de données
DATABASE_URL="mysql://user:password@localhost:3306/markdown_db"

# Authentification
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your_secret_key_here"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Revolut (optionnel)
REVOLUT_API_KEY="your_revolut_api_key"
REVOLUT_WEBHOOK_SECRET="your_webhook_secret"
```

4. **Initialisez la base de données**
```bash
npm run db:push
npm run db:seed
```

5. **Lancez le serveur de développement**
```bash
npm run dev
```

6. **Ouvrez votre navigateur**
```
http://localhost:3000
```

## 🚀 Utilisation

### Pour les utilisateurs

1. **Créez un compte** via email/mot de passe ou GitHub
2. **Accédez à l'éditeur** depuis le dashboard
3. **Choisissez un template** (gratuit ou premium)
4. **Éditez votre document** avec l'éditeur visuel
5. **Exportez** en HTML ou Markdown

### Pour les développeurs

#### Utilisation des services

```typescript
import { ServiceFactory } from '@/core/factories/ServiceFactory';

// Récupérer une instance de service
const templateService = ServiceFactory.getTemplateService();

// Créer un template
const template = await templateService.createTemplate({
  name: "Mon Template",
  description: "Description du template",
  category: TemplateCategory.STARTUP,
  price: 499, // Prix en centimes
  content: "# Contenu Markdown",
  isPremium: true,
});

// Lister les templates avec pagination
const templates = await templateService.listTemplates(
  { page: 1, limit: 10 },
  { category: TemplateCategory.STARTUP }
);
```

#### Génération de contenu avec l'IA

```typescript
import { AIService } from '@/modules/ai/services/ai.service';

const aiService = new AIService();

// Générer un README
const readme = await aiService.generateReadme({
  projectName: "Mon Projet",
  description: "Un projet génial",
  technologies: ["Next.js", "TypeScript", "Prisma"],
  features: ["Feature 1", "Feature 2"],
  includeBadges: true,
});

// Obtenir des suggestions
const suggestions = await aiService.generateSuggestions(content);
```

#### Builder Markdown

```typescript
import { MarkdownBuilder } from '@/core/builders/MarkdownBuilder';

const markdown = new MarkdownBuilder()
  .h1("Mon Titre")
  .paragraph("Une description")
  .h2("Installation")
  .codeBlock("npm install", "bash")
  .bulletList(["Feature 1", "Feature 2"])
  .build();
```

## 📁 Structure du projet

```
markdown/
├── src/
│   ├── app/                      # Pages Next.js (App Router)
│   │   ├── (app)/               # Routes applicatives
│   │   ├── (marketing)/         # Pages marketing
│   │   ├── admin/               # Panel admin
│   │   └── api/                 # API Routes
│   ├── components/              # Composants React
│   │   ├── auth/
│   │   ├── editor/
│   │   ├── templates/
│   │   └── ui/
│   ├── core/                    # 🆕 Architecture POO
│   │   ├── base/                # Classes de base
│   │   ├── builders/            # Builders (pattern Builder)
│   │   ├── errors/              # Gestion d'erreurs
│   │   ├── factories/           # Factories (pattern Factory)
│   │   └── types/               # Types communs
│   ├── modules/                 # 🆕 Modules métier
│   │   ├── ai/                  # Service IA
│   │   ├── documents/           # Gestion documents
│   │   ├── templates/           # Gestion templates
│   │   └── users/               # Gestion utilisateurs
│   ├── lib/                     # Utilitaires
│   │   ├── auth/                # 🆕 AuthService (POO)
│   │   └── notifications/       # 🆕 Système de toasts
│   └── hooks/                   # Hooks React
├── prisma/
│   ├── schema.prisma            # Schéma de base de données
│   └── migrations/
├── public/                      # Assets statiques
└── scripts/                     # Scripts utilitaires
```

## 🏛️ Architecture POO

### Couches de l'application

```
┌─────────────────────────────────────┐
│         Controllers (API)           │  ← Routes API Next.js
├─────────────────────────────────────┤
│           Services                  │  ← Logique métier
│  (TemplateService, UserService...)  │
├─────────────────────────────────────┤
│         Repositories                │  ← Accès aux données
│  (TemplateRepository, UserRepo...)  │
├─────────────────────────────────────┤
│           Prisma ORM                │  ← ORM
├─────────────────────────────────────┤
│           MySQL                     │  ← Base de données
└─────────────────────────────────────┘
```

### Design Patterns utilisés

1. **Repository Pattern** : Abstraction de l'accès aux données
2. **Factory Pattern** : Création centralisée des services (Singleton)
3. **Builder Pattern** : Construction fluide de documents Markdown
4. **DTO Pattern** : Validation et sécurité des données

### Exemple de flux

```typescript
// 1. Route API (Controller)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const service = ServiceFactory.getTemplateService();
    const template = await service.createTemplate(data);
    
    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}

// 2. Service (Logique métier)
class TemplateService extends BaseService {
  async createTemplate(data: CreateTemplateDto) {
    const validated = this.validate(CreateTemplateSchema, data);
    return await this.repository.create(validated);
  }
}

// 3. Repository (Accès données)
class TemplateRepository extends BaseRepository<Template> {
  async create(data: Partial<Template>) {
    return await this.model.create({ data });
  }
}
```

## 🔒 Authentification et autorisations

```typescript
import { AuthService } from '@/lib/auth/AuthService';

const authService = new AuthService();

// Dans une route API
const user = await authService.getCurrentUser(request.headers);

// Vérifier un rôle
await authService.requireRole(request.headers, UserRole.ADMIN);

// Vérifier si premium
const isPremium = await authService.isPremium(request.headers);
```

## 🧪 Tests (à venir)

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Coverage
npm run test:coverage
```

## 🔧 Scripts disponibles

```bash
npm run dev           # Serveur de développement
npm run build         # Build de production
npm run start         # Serveur de production
npm run lint          # Linter ESLint
npm run db:push       # Synchronise le schéma Prisma
npm run db:generate   # Génère le client Prisma
npm run db:seed       # Peuple la base de données
```

## 🌍 Déploiement

### Vercel (recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez !

```bash
vercel --prod
```

### Docker (alternative)

```bash
docker build -t markdown-generator .
docker run -p 3000:3000 markdown-generator
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Forkez le projet**
2. **Créez une branche** (`git checkout -b feature/AmazingFeature`)
3. **Committez** (`git commit -m 'Add AmazingFeature'`)
4. **Poussez** (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

### Guidelines

- Suivez l'architecture POO existante
- Ajoutez des tests pour vos fonctionnalités
- Documentez votre code
- Respectez les conventions de nommage TypeScript

## 📖 Documentation supplémentaire

- [Guide d'architecture](./docs/ARCHITECTURE.md) (à venir)
- [API Documentation](./docs/API.md) (à venir)
- [Guide de contribution](./CONTRIBUTING.md) (à venir)

## 🐛 Signaler un bug

Ouvrez une issue sur GitHub avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs réel
- Captures d'écran si applicable

## 📝 Roadmap

- [ ] Tests unitaires et d'intégration
- [ ] Documentation API complète
- [ ] Intégration OpenAI/Claude pour l'IA
- [ ] Mode collaboratif temps réel
- [ ] Versioning des documents
- [ ] CLI pour générer des README
- [ ] API publique pour intégrations tierces
- [ ] Thèmes personnalisables pour exports
- [ ] Support multilingue

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👥 Auteurs

- Votre nom - Développeur principal

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [TipTap](https://tiptap.dev/)
- [Prisma](https://www.prisma.io/)
- [Better Auth](https://www.better-auth.com/)

---

Fait avec ❤️ pour la communauté des développeurs
