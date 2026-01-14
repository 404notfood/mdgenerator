# 🏗️ Guide d'architecture - Markdown Generator Pro

## Vue d'ensemble

Ce document décrit l'architecture orientée objet du projet Markdown Generator Pro, conçue pour être **maintenable**, **scalable** et **testable**.

## Principes architecturaux

### 1. Séparation des responsabilités

L'application est organisée en couches distinctes :

```
Présentation (React Components)
         ↓
Controllers (API Routes)
         ↓
Services (Logique métier)
         ↓
Repositories (Accès données)
         ↓
Database (MySQL via Prisma)
```

### 2. Programmation Orientée Objet

Tous les services et repositories sont des **classes** respectant les principes SOLID :

- **S**ingle Responsibility : Chaque classe a une seule responsabilité
- **O**pen/Closed : Ouvert à l'extension, fermé à la modification
- **L**iskov Substitution : Les sous-classes peuvent remplacer les classes parentes
- **I**nterface Segregation : Interfaces spécifiques plutôt que générales
- **D**ependency Inversion : Dépendre des abstractions, pas des implémentations

### 3. Design Patterns utilisés

#### Repository Pattern

**Objectif** : Abstraire l'accès aux données

```typescript
// Base abstraite
export abstract class BaseRepository<T> {
  protected abstract readonly model: any;
  
  async findById(id: string): Promise<T | null> { ... }
  async findAll(): Promise<T[]> { ... }
  async create(data: Partial<T>): Promise<T> { ... }
  async update(id: string, data: Partial<T>): Promise<T> { ... }
  async delete(id: string): Promise<T> { ... }
}

// Implémentation concrète
export class TemplateRepository extends BaseRepository<Template> {
  protected readonly model = prisma.template;
  
  async findByCategory(category: TemplateCategory): Promise<Template[]> {
    // Logique spécifique
  }
}
```

**Avantages** :
- Centralisation des requêtes
- Facilite les tests (mocking)
- Changement de base de données facilité

#### Factory Pattern (Singleton)

**Objectif** : Créer et gérer les instances de services

```typescript
export class ServiceFactory {
  private static templateServiceInstance: TemplateService | null = null;

  static getTemplateService(): TemplateService {
    if (!this.templateServiceInstance) {
      this.templateServiceInstance = new TemplateService();
    }
    return this.templateServiceInstance;
  }
}

// Utilisation
const service = ServiceFactory.getTemplateService();
```

**Avantages** :
- Une seule instance par service (économie mémoire)
- Point d'accès centralisé
- Facilite l'injection de dépendances

#### Builder Pattern

**Objectif** : Construire des objets complexes étape par étape

```typescript
const markdown = new MarkdownBuilder()
  .h1("Titre")
  .paragraph("Description")
  .codeBlock("code", "javascript")
  .build();
```

**Avantages** :
- API fluide et lisible
- Construction progressive
- Validation à chaque étape

#### DTO Pattern

**Objectif** : Valider et typer les données transferées

```typescript
export const CreateTemplateSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  // ...
});

export type CreateTemplateDto = z.infer<typeof CreateTemplateSchema>;

// Dans le service
const validatedData = this.validate<CreateTemplateDto>(
  CreateTemplateSchema, 
  data
);
```

**Avantages** :
- Sécurité des données
- Validation automatique
- Documentation via types

## Structure des modules

### Module Template

```
modules/templates/
├── dto/
│   └── template.dto.ts        # DTOs et schémas Zod
├── repositories/
│   └── template.repository.ts # Accès données
└── services/
    └── template.service.ts    # Logique métier
```

#### Flux de données

```typescript
// 1. API Route (Controller)
export async function POST(request: Request) {
  const data = await request.json();
  const service = ServiceFactory.getTemplateService();
  const template = await service.createTemplate(data);
  return NextResponse.json({ success: true, data: template });
}

// 2. Service (Validation + Logique)
async createTemplate(data: CreateTemplateDto) {
  // Validation Zod
  const validated = this.validate(CreateTemplateSchema, data);
  
  // Logique métier
  if (!validated.htmlPreview) {
    validated.htmlPreview = this.generateHtmlPreview(validated.content);
  }
  
  // Persistance
  return await this.repository.create(validated);
}

// 3. Repository (Persistance)
async create(data: Partial<Template>) {
  return await this.model.create({ data });
}
```

## Gestion des erreurs

### Hiérarchie des erreurs

```typescript
AppError (classe de base)
  ├── NotFoundError (404)
  ├── UnauthorizedError (401)
  ├── ForbiddenError (403)
  ├── BadRequestError (400)
  └── ConflictError (409)
```

### Utilisation

```typescript
// Dans un service
if (!template) {
  throw new NotFoundError('Template');
}

// Dans une route API
try {
  // Logique
} catch (error) {
  return ErrorHandler.toResponse(error);
}
```

### Avantages

- Messages d'erreur cohérents
- Codes HTTP automatiques
- Logging centralisé

## Authentification et autorisations

### AuthService

```typescript
class AuthService {
  async getCurrentUser(headers: Headers): Promise<User>
  async requireRole(headers: Headers, role: UserRole): Promise<void>
  async isPremium(headers: Headers): Promise<boolean>
  async isAdmin(headers: Headers): Promise<boolean>
  async canAccessResource(headers, ownerId): Promise<boolean>
}
```

### Utilisation dans les routes

```typescript
export async function GET(request: Request) {
  const authService = new AuthService();
  
  // Récupérer l'utilisateur
  const user = await authService.getCurrentUser(request.headers);
  
  // Vérifier le rôle
  await authService.requireRole(request.headers, UserRole.ADMIN);
  
  // ...
}
```

## Service IA

### Fonctionnalités

```typescript
class AIService extends BaseService {
  // Génération de README
  async generateReadme(options: GenerateReadmeOptions): Promise<string>
  
  // Suggestions d'amélioration
  async generateSuggestions(content: string): Promise<ContentSuggestion[]>
  
  // Analyse de qualité
  async analyzeReadmeQuality(content: string): Promise<QualityReport>
}
```

### Extension future

Pour intégrer une vraie IA (OpenAI, Claude, etc.) :

```typescript
class AIService extends BaseService {
  private readonly openai: OpenAI;
  
  constructor() {
    super();
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  async generateReadme(options: GenerateReadmeOptions): Promise<string> {
    const prompt = this.buildPrompt(options);
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
```

## Système de notifications

### ToastService

```typescript
// Succès
ToastService.success("Template créé avec succès");

// Erreur
ToastService.error("Erreur lors de la création");

// Avec action
ToastService.show({
  type: ToastType.INFO,
  message: "Voulez-vous sauvegarder ?",
  action: {
    label: "Sauvegarder",
    onClick: () => save(),
  },
});
```

## Bonnes pratiques

### 1. Toujours utiliser les factories

❌ **Mauvais**
```typescript
const service = new TemplateService();
```

✅ **Bon**
```typescript
const service = ServiceFactory.getTemplateService();
```

### 2. Valider avec Zod

❌ **Mauvais**
```typescript
if (!data.name || data.name.length < 3) {
  throw new Error("Invalid name");
}
```

✅ **Bon**
```typescript
const validated = this.validate(CreateTemplateSchema, data);
```

### 3. Utiliser les erreurs typées

❌ **Mauvais**
```typescript
throw new Error("Not found");
```

✅ **Bon**
```typescript
throw new NotFoundError('Template');
```

### 4. Logger les opérations

```typescript
class MyService extends BaseService {
  async doSomething() {
    this.log('Starting operation', { id: 123 });
    // ...
    this.log('Operation completed');
  }
}
```

## Tests (à implémenter)

### Structure de test

```
src/
├── modules/
│   └── templates/
│       ├── services/
│       │   ├── template.service.ts
│       │   └── template.service.test.ts
│       └── repositories/
│           ├── template.repository.ts
│           └── template.repository.test.ts
```

### Exemple de test

```typescript
describe('TemplateService', () => {
  let service: TemplateService;
  
  beforeEach(() => {
    service = new TemplateService();
  });
  
  it('should create a template', async () => {
    const data: CreateTemplateDto = {
      name: "Test Template",
      // ...
    };
    
    const template = await service.createTemplate(data);
    
    expect(template).toBeDefined();
    expect(template.name).toBe("Test Template");
  });
});
```

## Migration depuis l'ancien code

### Avant (style fonctionnel)

```typescript
// app/api/templates/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  const template = await prisma.template.create({ data });
  return NextResponse.json(template);
}
```

### Après (POO)

```typescript
// app/api/templates/route.ts
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
```

## Conclusion

Cette architecture POO offre :

✅ **Maintenabilité** : Code organisé et prévisible  
✅ **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités  
✅ **Testabilité** : Chaque couche peut être testée indépendamment  
✅ **Réutilisabilité** : Services et repositories partagés  
✅ **Sécurité** : Validation et gestion d'erreurs robustes

Pour toute question, consultez le code source ou ouvrez une issue GitHub !
