# 🔄 Guide de migration vers l'architecture POO

Ce guide vous aide à migrer progressivement votre code existant vers la nouvelle architecture orientée objet.

## 📋 Vue d'ensemble

### Avant (Ancien code)
```typescript
// Code fonctionnel avec accès direct à Prisma
export async function POST(request: Request) {
  const data = await request.json();
  const template = await prisma.template.create({ data });
  return NextResponse.json(template);
}
```

### Après (Nouvelle architecture)
```typescript
// Architecture POO avec services
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

## 🗂️ Structure de fichiers

### Nouvelle arborescence créée

```
src/
├── core/                          # 🆕 Nouveau
│   ├── base/
│   │   ├── BaseRepository.ts      # Classe de base pour repositories
│   │   └── BaseService.ts         # Classe de base pour services
│   ├── builders/
│   │   └── MarkdownBuilder.ts     # Builder pour Markdown
│   ├── errors/
│   │   └── ErrorHandler.ts        # Gestion centralisée des erreurs
│   ├── factories/
│   │   └── ServiceFactory.ts      # Factory pour services (Singleton)
│   └── types/
│       └── common.types.ts        # Types communs
│
├── modules/                       # 🆕 Nouveau
│   ├── ai/
│   │   └── services/
│   │       └── ai.service.ts      # Service IA
│   ├── documents/
│   │   ├── dto/
│   │   │   └── document.dto.ts
│   │   ├── repositories/
│   │   │   └── document.repository.ts
│   │   └── services/
│   │       └── document.service.ts
│   ├── templates/
│   │   ├── dto/
│   │   │   └── template.dto.ts
│   │   ├── repositories/
│   │   │   └── template.repository.ts
│   │   └── services/
│   │       └── template.service.ts
│   └── users/
│       ├── dto/
│       │   └── user.dto.ts
│       ├── repositories/
│       │   └── user.repository.ts
│       └── services/
│           └── user.service.ts
│
└── lib/
    ├── auth/
    │   └── AuthService.ts         # 🆕 Service d'auth POO
    └── notifications/
        └── toast.config.ts        # 🆕 Système de toasts
```

## 🔄 Migration étape par étape

### Étape 1 : Migrer les routes API Templates

#### Fichier : `app/api/templates/route.ts`

**Avant**
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const templates = await prisma.template.findMany({
    where: { isActive: true },
  });
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  const data = await request.json();
  const template = await prisma.template.create({ data });
  return NextResponse.json(template);
}
```

**Après**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { UserRole } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const templateService = ServiceFactory.getTemplateService();
    const result = await templateService.listTemplates({ page, limit });

    return NextResponse.json({
      success: true,
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    await authService.requireRole(request.headers, UserRole.ADMIN);

    const data = await request.json();
    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.createTemplate(data);

    return NextResponse.json({
      success: true,
      data: template,
    }, { status: 201 });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}
```

### Étape 2 : Migrer les routes API Documents

#### Fichier : `app/api/documents/route.ts`

**Avant**
```typescript
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
  });
  
  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await request.json();
  const document = await prisma.document.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  return NextResponse.json(document);
}
```

**Après**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

export async function GET(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    const documents = await documentService.getUserDocuments(user.id);

    return NextResponse.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const data = await request.json();
    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.createDocument(user.id, data);

    return NextResponse.json({
      success: true,
      data: document,
    }, { status: 201 });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}
```

### Étape 3 : Migrer les routes par ID

#### Fichier : `app/api/documents/[id]/route.ts`

**Avant**
```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const document = await prisma.document.findUnique({
    where: { id: params.id },
  });

  if (!document) {
    return new Response('Not found', { status: 404 });
  }

  if (document.userId !== session.user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  return NextResponse.json(document);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await request.json();
  
  const existing = await prisma.document.findUnique({
    where: { id: params.id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  const document = await prisma.document.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(document);
}
```

**Après**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.getDocumentById(params.id, user.id);

    return NextResponse.json({
      success: true,
      data: document,
    });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const data = await request.json();
    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.updateDocument(params.id, user.id, data);

    return NextResponse.json({
      success: true,
      data: document,
    });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    await documentService.deleteDocument(params.id, user.id);

    return NextResponse.json({
      success: true,
      message: 'Document supprimé avec succès',
    });
  } catch (error) {
    return ErrorHandler.toResponse(error);
  }
}
```

### Étape 4 : Remplacer les alert() par des toasts

#### Dans les composants React

**Avant**
```typescript
const handleSave = async () => {
  try {
    await saveDocument();
    alert('Document sauvegardé !');
  } catch (error) {
    alert('Erreur lors de la sauvegarde');
  }
};
```

**Après**
```typescript
import { ToastService } from '@/lib/notifications/toast.config';

const handleSave = async () => {
  try {
    await saveDocument();
    ToastService.success('Document sauvegardé avec succès');
  } catch (error) {
    ToastService.error('Erreur lors de la sauvegarde');
  }
};
```

### Étape 5 : Utiliser le MarkdownBuilder

**Avant**
```typescript
const generateReadme = (projectName: string) => {
  let content = `# ${projectName}\n\n`;
  content += `## Installation\n\n`;
  content += '```bash\n';
  content += 'npm install\n';
  content += '```\n\n';
  return content;
};
```

**Après**
```typescript
import { MarkdownBuilder } from '@/core/builders/MarkdownBuilder';

const generateReadme = (projectName: string) => {
  return new MarkdownBuilder()
    .h1(projectName)
    .h2('Installation')
    .codeBlock('npm install', 'bash')
    .build();
};
```

## ✅ Checklist de migration

### Pour chaque route API

- [ ] Importer `ServiceFactory` et `ErrorHandler`
- [ ] Remplacer l'accès direct à `prisma` par les services
- [ ] Ajouter un try/catch avec `ErrorHandler.toResponse()`
- [ ] Utiliser `AuthService` pour l'authentification
- [ ] Standardiser les réponses avec `{ success, data }`
- [ ] Valider les données avec les DTOs Zod

### Pour les composants React

- [ ] Remplacer `alert()` par `ToastService`
- [ ] Utiliser les hooks existants avec les nouveaux services
- [ ] Gérer les erreurs de façon cohérente

### Tests à effectuer

- [ ] Créer un template (admin uniquement)
- [ ] Lister les templates (tous les utilisateurs)
- [ ] Créer un document (utilisateur authentifié)
- [ ] Modifier son propre document
- [ ] Tenter de modifier le document d'un autre (doit échouer)
- [ ] Générer un README avec l'IA (premium uniquement)

## 🔍 Vérification

### Exécuter les linters

```bash
npm run lint
```

### Vérifier le build

```bash
npm run build
```

### Tester manuellement

1. Démarrez le serveur : `npm run dev`
2. Testez chaque endpoint migré avec Postman ou curl
3. Vérifiez les logs dans la console

## 📊 Avantages de la migration

### Avant
❌ Code répétitif  
❌ Gestion d'erreurs incohérente  
❌ Validation manuelle  
❌ Difficile à tester  
❌ Couplage fort avec Prisma  

### Après
✅ Code DRY (Don't Repeat Yourself)  
✅ Gestion d'erreurs centralisée  
✅ Validation automatique avec Zod  
✅ Facilement testable (mocking)  
✅ Découplage via repositories  
✅ Architecture scalable  

## 🚀 Prochaines étapes

1. **Migrer toutes les routes API** une par une
2. **Ajouter des tests unitaires** pour chaque service
3. **Documenter les nouveaux endpoints** dans Swagger/OpenAPI
4. **Former l'équipe** à la nouvelle architecture
5. **Monitorer les performances** et optimiser si nécessaire

## 💡 Conseils

- **Migrez progressivement** : une route à la fois
- **Testez après chaque migration** : ne cassez pas ce qui fonctionne
- **Gardez l'ancien code** dans une branche backup
- **Documentez les changements** dans les commits
- **Communiquez avec l'équipe** sur les nouvelles pratiques

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Consultez `docs/ARCHITECTURE.md` pour comprendre les concepts
2. Vérifiez `docs/API_EXAMPLE.md` pour des exemples complets
3. Ouvrez une issue sur GitHub
4. Contactez l'équipe technique

Bonne migration ! 🎉
