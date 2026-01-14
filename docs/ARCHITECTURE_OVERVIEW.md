# 🏛️ Vue d'ensemble de l'architecture POO

## 🎨 Design complet du système

```
                    ╔════════════════════════════════════╗
                    ║         UTILISATEUR                ║
                    ║   (Browser / Application)          ║
                    ╚═══════════════╤════════════════════╝
                                    │
                                    │ HTTP Requests
                                    ↓
        ┌───────────────────────────────────────────────────┐
        │  🌐 API ROUTES (Next.js App Router)              │
        │  ════════════════════════════════════            │
        │  • /api/v2/templates                             │
        │  • /api/v2/documents                             │
        │  • /api/v2/ai/generate                           │
        │  • /api/v2/users                                 │
        │                                                   │
        │  Rôle : Controllers - Gestion HTTP               │
        └──────────────────┬────────────────────────────────┘
                           │
                           │ Utilise
                           ↓
        ┌───────────────────────────────────────────────────┐
        │  🏭 SERVICE FACTORY (Singleton Pattern)          │
        │  ═══════════════════════════════════             │
        │                                                   │
        │  getTemplateService()  ──→  TemplateService      │
        │  getUserService()      ──→  UserService          │
        │  getDocumentService()  ──→  DocumentService      │
        │                                                   │
        │  Rôle : Création unique des services             │
        └──────────────────┬────────────────────────────────┘
                           │
                           │ Retourne
                           ↓
        ┌───────────────────────────────────────────────────┐
        │  ⚙️  SERVICES (Business Logic)                   │
        │  ══════════════════════════════                  │
        │                                                   │
        │  📄 TemplateService                              │
        │     • createTemplate()                           │
        │     • updateTemplate()                           │
        │     • listTemplates()                            │
        │     • deleteTemplate()                           │
        │                                                   │
        │  👤 UserService                                  │
        │     • createUser()                               │
        │     • getUserById()                              │
        │     • changeUserRole()                           │
        │                                                   │
        │  📝 DocumentService                              │
        │     • createDocument()                           │
        │     • updateDocument()                           │
        │     • getUserDocuments()                         │
        │     • searchDocuments()                          │
        │                                                   │
        │  🤖 AIService                                    │
        │     • generateReadme()                           │
        │     • generateSuggestions()                      │
        │     • analyzeReadmeQuality()                     │
        │                                                   │
        │  Rôle : Logique métier + Validation Zod          │
        └──────────────────┬────────────────────────────────┘
                           │
                           │ Appelle
                           ↓
        ┌───────────────────────────────────────────────────┐
        │  🗄️  REPOSITORIES (Data Access)                  │
        │  ═════════════════════════════════               │
        │                                                   │
        │  TemplateRepository extends BaseRepository       │
        │  UserRepository extends BaseRepository           │
        │  DocumentRepository extends BaseRepository       │
        │                                                   │
        │  Méthodes communes (héritées) :                  │
        │    • findById()                                  │
        │    • findAll()                                   │
        │    • create()                                    │
        │    • update()                                    │
        │    • delete()                                    │
        │    • count()                                     │
        │                                                   │
        │  Rôle : Abstraction de l'accès aux données       │
        └──────────────────┬────────────────────────────────┘
                           │
                           │ Prisma ORM
                           ↓
        ┌───────────────────────────────────────────────────┐
        │  🗃️  DATABASE (MySQL)                            │
        │  ═══════════════════════                         │
        │                                                   │
        │  Tables :                                         │
        │    • user                                         │
        │    • templates                                    │
        │    • documents                                    │
        │    • purchases                                    │
        │    • sessions                                     │
        │                                                   │
        └───────────────────────────────────────────────────┘
```

## 🔄 Flux de données complet

### Exemple : Créer un template

```
1. CLIENT
   │ POST /api/v2/templates
   │ Headers: Authorization: Bearer TOKEN
   │ Body: { name, description, category, ... }
   ↓

2. API ROUTE (Controller)
   │ app/api/v2/templates/route.ts
   │
   │ ┌─────────────────────────────────┐
   │ │ • Authentification via          │
   │ │   AuthService                   │
   │ │ • Vérification du rôle ADMIN    │
   │ │ • Parse du body JSON            │
   │ └─────────────────────────────────┘
   ↓

3. SERVICE FACTORY
   │ ServiceFactory.getTemplateService()
   │ → Retourne instance unique du service
   ↓

4. TEMPLATE SERVICE
   │ templateService.createTemplate(data)
   │
   │ ┌─────────────────────────────────┐
   │ │ • Validation Zod automatique    │
   │ │ • Logique métier :              │
   │ │   - Génération HTML preview     │
   │ │   - Vérifications métier        │
   │ │ • Log de l'opération            │
   │ └─────────────────────────────────┘
   ↓

5. TEMPLATE REPOSITORY
   │ repository.create(validatedData)
   │
   │ ┌─────────────────────────────────┐
   │ │ • Appel Prisma                  │
   │ │ • Gestion erreurs BDD           │
   │ └─────────────────────────────────┘
   ↓

6. DATABASE
   │ INSERT INTO templates ...
   │ → Retourne le template créé
   ↓

7. RETOUR
   │ Template → Repository → Service → Controller
   │
   │ Response:
   │ {
   │   success: true,
   │   data: { id, name, ... }
   │ }
   ↓

8. CLIENT
   Reçoit la réponse JSON
   Affiche ToastService.success("Créé !")
```

## 📦 Modules et responsabilités

### 🎯 Core (Infrastructure)

```
src/core/
├── base/
│   ├── BaseRepository.ts      → Classe abstraite pour tous les repos
│   └── BaseService.ts         → Classe abstraite pour tous les services
│
├── builders/
│   └── MarkdownBuilder.ts     → Construction fluide de Markdown
│
├── errors/
│   └── ErrorHandler.ts        → Gestion centralisée des erreurs
│                                 (NotFoundError, UnauthorizedError, etc.)
│
├── factories/
│   └── ServiceFactory.ts      → Factory Singleton pour services
│
└── types/
    └── common.types.ts        → Types partagés (ApiResponse, Pagination)
```

### 🧩 Modules métier

```
src/modules/
├── templates/
│   ├── dto/                   → Data Transfer Objects + Zod schemas
│   ├── repositories/          → Accès BDD pour templates
│   └── services/              → Logique métier templates
│
├── users/
│   ├── dto/
│   ├── repositories/
│   └── services/
│
├── documents/
│   ├── dto/
│   ├── repositories/
│   └── services/
│
└── ai/
    └── services/              → Service IA (génération, suggestions)
```

### 🔧 Bibliothèques

```
src/lib/
├── auth/
│   └── AuthService.ts         → Service d'authentification POO
│                                 (getCurrentUser, requireRole, isPremium)
│
└── notifications/
    └── toast.config.ts        → Système de notifications modernes
                                  (ToastService.success, .error, etc.)
```

## 🎭 Design Patterns expliqués

### 1️⃣ Repository Pattern

**Problème** : Couplage fort avec la base de données  
**Solution** : Abstraction de l'accès aux données

```typescript
// ❌ Avant : Couplage direct
const template = await prisma.template.findUnique({ where: { id } });

// ✅ Après : Via repository
const template = await templateRepository.findById(id);
```

**Avantages** :
- Changement de BDD facile
- Tests facilités (mocking)
- Requêtes centralisées

### 2️⃣ Factory Pattern (Singleton)

**Problème** : Création multiple d'instances  
**Solution** : Une seule instance par service

```typescript
// ❌ Avant : Nouvelles instances à chaque fois
const service1 = new TemplateService();
const service2 = new TemplateService(); // Instance différente

// ✅ Après : Singleton via Factory
const service1 = ServiceFactory.getTemplateService();
const service2 = ServiceFactory.getTemplateService(); // Même instance
```

**Avantages** :
- Économie mémoire
- État partagé si nécessaire
- Point d'accès centralisé

### 3️⃣ Builder Pattern

**Problème** : Construction d'objets complexes difficile  
**Solution** : API fluide étape par étape

```typescript
// ❌ Avant : Concaténation manuelle
let md = "# Titre\n\n";
md += "## Section\n\n";
md += "```bash\nnpm install\n```\n\n";

// ✅ Après : Builder fluide
const md = new MarkdownBuilder()
  .h1("Titre")
  .h2("Section")
  .codeBlock("npm install", "bash")
  .build();
```

**Avantages** :
- Code lisible
- Validation à chaque étape
- Réutilisable

### 4️⃣ DTO Pattern

**Problème** : Données non validées  
**Solution** : Validation automatique avec Zod

```typescript
// ❌ Avant : Validation manuelle
if (!data.name || data.name.length < 3) {
  throw new Error("Invalid name");
}

// ✅ Après : DTO avec Zod
const CreateTemplateSchema = z.object({
  name: z.string().min(3).max(100),
  // ...
});

const validated = CreateTemplateSchema.parse(data); // ← Automatique
```

**Avantages** :
- Validation robuste
- Types TypeScript automatiques
- Erreurs détaillées

## 🛡️ Sécurité et autorisations

### AuthService - Gestion centralisée

```typescript
class AuthService {
  // Récupère l'utilisateur courant
  async getCurrentUser(headers: Headers): Promise<User>
  
  // Vérifie un rôle spécifique
  async requireRole(headers: Headers, role: UserRole): Promise<void>
  
  // Vérifie si utilisateur premium
  async isPremium(headers: Headers): Promise<boolean>
  
  // Vérifie si utilisateur admin
  async isAdmin(headers: Headers): Promise<boolean>
  
  // Vérifie la propriété d'une ressource
  async canAccessResource(headers, ownerId): Promise<boolean>
}
```

### Utilisation dans les routes

```typescript
// Exemple 1 : Vérifier le rôle admin
await authService.requireRole(request.headers, UserRole.ADMIN);

// Exemple 2 : Vérifier si premium
const isPremium = await authService.isPremium(request.headers);
if (!isPremium) {
  throw new ForbiddenError('Fonctionnalité réservée aux premium');
}

// Exemple 3 : Vérifier la propriété
const canAccess = await authService.canAccessResource(
  request.headers,
  document.userId
);
```

## ⚠️ Gestion des erreurs

### Hiérarchie des erreurs

```
AppError (classe de base)
  │
  ├── NotFoundError       (404) → Ressource non trouvée
  ├── UnauthorizedError   (401) → Non authentifié
  ├── ForbiddenError      (403) → Accès interdit
  ├── BadRequestError     (400) → Données invalides
  └── ConflictError       (409) → Conflit (ex: email déjà utilisé)
```

### Utilisation

```typescript
// Dans votre code
if (!template) {
  throw new NotFoundError('Template');
}

// Dans la route API
try {
  // Logique
} catch (error) {
  return ErrorHandler.toResponse(error);
  // → Convertit en réponse HTTP avec le bon code
}
```

### Avantages

✅ Messages cohérents  
✅ Codes HTTP automatiques  
✅ Logging centralisé  
✅ Stack traces en développement  

## 🎨 Helpers et utilitaires

### MarkdownBuilder

```typescript
const readme = new MarkdownBuilder()
  .h1("Mon Projet 🚀")
  .badge("Version", "1.0.0", "blue")
  .badge("License", "MIT", "green")
  .newLine()
  .paragraph("Description du projet")
  .h2("✨ Features")
  .bulletList([
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ])
  .h2("📦 Installation")
  .codeBlock("npm install mon-projet", "bash")
  .h2("🚀 Usage")
  .codeBlock(`
import { MyClass } from 'mon-projet';

const instance = new MyClass();
instance.doSomething();
  `, "javascript")
  .table(
    ["Commande", "Description"],
    [
      ["npm start", "Démarre le serveur"],
      ["npm test", "Lance les tests"],
    ]
  )
  .build();
```

### ToastService

```typescript
// Notifications simples
ToastService.success("Opération réussie !");
ToastService.error("Une erreur est survenue");
ToastService.warning("Attention !");
ToastService.info("Information");

// Notification avec action
ToastService.show({
  type: ToastType.INFO,
  title: "Action requise",
  message: "Voulez-vous sauvegarder vos modifications ?",
  duration: 10000,
  action: {
    label: "Sauvegarder",
    onClick: () => handleSave(),
  },
});
```

## 📊 Comparaison avant/après

| Aspect | ❌ Avant | ✅ Après |
|--------|---------|----------|
| **Architecture** | Fonctionnelle | POO avec patterns |
| **Accès BDD** | Direct Prisma | Via repositories |
| **Validation** | Manuelle | Automatique (Zod) |
| **Erreurs** | try/catch basique | Hiérarchie typée |
| **Tests** | Difficile | Facile (mocking) |
| **Maintenabilité** | Moyenne | Excellente |
| **Scalabilité** | Limitée | Très bonne |
| **Notifications** | alert() | ToastService |
| **Code dupliqué** | Beaucoup | Minimal (DRY) |

## 🚀 Avantages de cette architecture

### Pour les développeurs

✅ **Code organisé** : Facile de trouver où est quoi  
✅ **Réutilisable** : Services partagés dans tout le projet  
✅ **Testable** : Chaque couche isolée et mockable  
✅ **Type-safe** : TypeScript + Zod = Sécurité maximale  
✅ **Documentation** : Code auto-documenté par les types  

### Pour le projet

✅ **Maintenable** : Évolutions faciles  
✅ **Scalable** : Ajout de fonctionnalités simple  
✅ **Robuste** : Gestion d'erreurs cohérente  
✅ **Performant** : Services en Singleton  
✅ **Sécurisé** : Validation et autorisations centralisées  

### Pour l'équipe

✅ **Onboarding rapide** : Structure claire  
✅ **Conventions** : Patterns standardisés  
✅ **Collaboration** : Modules indépendants  
✅ **Qualité** : Code reviews facilités  

## 📚 Ressources

### Documentation projet

- **README.md** : Vue d'ensemble et installation
- **ARCHITECTURE.md** : Guide détaillé de l'architecture
- **API_EXAMPLE.md** : Exemples d'utilisation des API
- **MIGRATION_GUIDE.md** : Guide de migration pas à pas
- **QUICK_START.md** : Démarrage rapide
- **REFACTORING_SUMMARY.md** : Résumé de la refonte

### Pour aller plus loin

- [Design Patterns en TypeScript](https://refactoring.guru/design-patterns/typescript)
- [SOLID Principles](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [Zod Documentation](https://zod.dev/)
- [Next.js Best Practices](https://nextjs.org/docs)

---

**Cette architecture est prête pour la production ! 🎉**

*Développée avec ❤️ en suivant les meilleures pratiques de développement logiciel*
