# ⚡ Quick Start - Nouvelle architecture POO

## 🎯 En 5 minutes

### 1️⃣ Utiliser un service

```typescript
import { ServiceFactory } from '@/core/factories/ServiceFactory';

// Récupérer un service
const templateService = ServiceFactory.getTemplateService();

// Créer un template
const template = await templateService.createTemplate({
  name: "Mon Template",
  description: "Une description",
  category: "STARTUP",
  price: 499,
  content: "# Contenu",
  isPremium: true,
});
```

### 2️⃣ Créer une route API

```typescript
// app/api/v2/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

export async function POST(request: NextRequest) {
  try {
    // Auth
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);
    
    // Data
    const data = await request.json();
    
    // Service
    const service = ServiceFactory.getTemplateService();
    const result = await service.createTemplate(data);
    
    // Response
    return NextResponse.json({
      success: true,
      data: result,
    }, { status: 201 });
    
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}
```

### 3️⃣ Construire du Markdown

```typescript
import { MarkdownBuilder } from '@/core/builders/MarkdownBuilder';

const readme = new MarkdownBuilder()
  .h1("Mon Projet")
  .paragraph("Description du projet")
  .h2("Installation")
  .codeBlock("npm install", "bash")
  .build();
```

### 4️⃣ Générer avec l'IA

```typescript
import { AIService } from '@/modules/ai/services/ai.service';

const aiService = new AIService();
const readme = await aiService.generateReadme({
  projectName: "Mon Projet",
  description: "Un projet génial",
  technologies: ["Next.js", "TypeScript"],
  features: ["Feature 1", "Feature 2"],
});
```

### 5️⃣ Afficher des notifications

```typescript
import { ToastService } from '@/lib/notifications/toast.config';

// Succès
ToastService.success("Opération réussie !");

// Erreur
ToastService.error("Une erreur est survenue");

// Avec action
ToastService.show({
  type: ToastType.INFO,
  message: "Voulez-vous continuer ?",
  action: {
    label: "Oui",
    onClick: () => doSomething(),
  },
});
```

## 📊 Architecture visuelle

```
┌─────────────────────────────────────────────────────┐
│              CLIENT (Browser/App)                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓ HTTP Request
┌─────────────────────────────────────────────────────┐
│         API ROUTES (Controllers)                     │
│  app/api/v2/templates/route.ts                      │
│  app/api/v2/documents/route.ts                      │
│  app/api/v2/ai/generate/route.ts                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓ Appelle
┌─────────────────────────────────────────────────────┐
│         SERVICE FACTORY (Singleton)                  │
│  ServiceFactory.getTemplateService()                │
│  ServiceFactory.getUserService()                    │
│  ServiceFactory.getDocumentService()                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓ Retourne
┌─────────────────────────────────────────────────────┐
│         SERVICES (Logique métier)                    │
│  TemplateService                                     │
│  UserService                                         │
│  DocumentService                                     │
│  AIService                                           │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓ Utilise
┌─────────────────────────────────────────────────────┐
│         REPOSITORIES (Accès données)                 │
│  TemplateRepository                                  │
│  UserRepository                                      │
│  DocumentRepository                                  │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓ Prisma ORM
┌─────────────────────────────────────────────────────┐
│              DATABASE (MySQL)                        │
└─────────────────────────────────────────────────────┘
```

## 🗂️ Structure des fichiers

```
src/
├── core/                    ← Classes de base et utilitaires
│   ├── base/               ← BaseRepository, BaseService
│   ├── builders/           ← MarkdownBuilder
│   ├── errors/             ← ErrorHandler
│   ├── factories/          ← ServiceFactory
│   └── types/              ← Types communs
│
├── modules/                 ← Modules métier (POO)
│   ├── templates/
│   │   ├── dto/            ← DTOs et validation Zod
│   │   ├── repositories/   ← Accès BDD
│   │   └── services/       ← Logique métier
│   ├── users/
│   ├── documents/
│   └── ai/
│
├── lib/                     ← Bibliothèques
│   ├── auth/               ← AuthService
│   └── notifications/      ← ToastService
│
└── app/
    └── api/
        └── v2/             ← 🆕 Nouvelles routes API
            ├── templates/
            ├── documents/
            └── ai/
```

## 🎨 Patterns utilisés

### Repository Pattern
```typescript
class TemplateRepository extends BaseRepository<Template> {
  protected readonly model = prisma.template;
  
  async findByCategory(category: string) {
    return await this.model.findMany({ where: { category } });
  }
}
```

### Factory Pattern (Singleton)
```typescript
class ServiceFactory {
  private static templateServiceInstance: TemplateService | null = null;
  
  static getTemplateService(): TemplateService {
    if (!this.templateServiceInstance) {
      this.templateServiceInstance = new TemplateService();
    }
    return this.templateServiceInstance;
  }
}
```

### Builder Pattern
```typescript
const md = new MarkdownBuilder()
  .h1("Titre")
  .paragraph("Texte")
  .build();
```

### DTO Pattern
```typescript
const CreateTemplateSchema = z.object({
  name: z.string().min(3).max(100),
  // ...
});

// Validation automatique
const validated = this.validate(CreateTemplateSchema, data);
```

## 🔐 Authentification

```typescript
const authService = new AuthService();

// Récupérer l'utilisateur
const user = await authService.getCurrentUser(headers);

// Vérifier le rôle
await authService.requireRole(headers, UserRole.ADMIN);

// Vérifier si premium
const isPremium = await authService.isPremium(headers);

// Vérifier la propriété d'une ressource
const canAccess = await authService.canAccessResource(headers, resourceOwnerId);
```

## ❌ Gestion d'erreurs

```typescript
// Dans votre code
throw new NotFoundError('Template');
throw new UnauthorizedError('Token invalide');
throw new ForbiddenError('Accès refusé');
throw new BadRequestError('Données invalides');

// Dans la route API
try {
  // ...
} catch (error) {
  return ErrorHandler.toResponse(error);
  // → Convertit automatiquement en réponse HTTP avec le bon code
}
```

## 📡 Réponses API standardisées

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Succès avec pagination
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Erreur
```json
{
  "success": false,
  "error": {
    "message": "Template non trouvé(e)",
    "code": "NOT_FOUND"
  }
}
```

## 🧪 Exemples d'utilisation

### Créer un template

```bash
curl -X POST http://localhost:3000/api/v2/templates \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Startup Template",
    "description": "Template pour startups",
    "category": "STARTUP",
    "price": 999,
    "content": "# Mon Template",
    "isPremium": true
  }'
```

### Lister les templates

```bash
curl http://localhost:3000/api/v2/templates?page=1&limit=10&category=STARTUP
```

### Générer un README

```bash
curl -X POST http://localhost:3000/api/v2/ai/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "Mon Projet",
    "description": "Un projet génial",
    "technologies": ["Next.js", "TypeScript"],
    "features": ["Feature 1", "Feature 2"],
    "includeBadges": true
  }'
```

## 📚 Documentation complète

- **README.md** : Documentation générale
- **docs/ARCHITECTURE.md** : Guide d'architecture détaillé
- **docs/API_EXAMPLE.md** : Exemples d'API complets
- **docs/MIGRATION_GUIDE.md** : Guide de migration
- **REFACTORING_SUMMARY.md** : Résumé de la refonte

## 🚀 Commandes utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Linter
npm run lint

# Base de données
npm run db:push
npm run db:generate
npm run db:seed

# Tests (à venir)
npm run test
npm run test:watch
```

## 💡 Bonnes pratiques

### ✅ À faire

```typescript
// Utiliser les factories
const service = ServiceFactory.getTemplateService();

// Valider avec Zod
const validated = this.validate(CreateTemplateSchema, data);

// Gérer les erreurs proprement
throw new NotFoundError('Resource');

// Logger les opérations importantes
this.log('Opération effectuée', { id: 123 });
```

### ❌ À éviter

```typescript
// Ne pas créer de nouvelles instances
const service = new TemplateService(); // ❌

// Ne pas accéder directement à Prisma
const data = await prisma.template.create(...); // ❌

// Ne pas utiliser alert()
alert('Erreur'); // ❌ Utiliser ToastService

// Ne pas ignorer les erreurs
try { ... } catch { } // ❌
```

## 🎯 Prochaines étapes

1. **Explorer** les fichiers créés
2. **Tester** les routes API v2
3. **Migrer** l'ancien code progressivement
4. **Ajouter** des tests
5. **Profiter** de l'architecture modulaire !

---

**Questions ?** Consultez la documentation complète ou ouvrez une issue ! 🚀
