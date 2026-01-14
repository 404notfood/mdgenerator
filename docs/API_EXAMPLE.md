# 📡 Exemples d'utilisation des API

Ce document montre comment utiliser la nouvelle architecture POO dans vos routes API.

## Exemple complet : Route Templates

### Créer un template (POST)

```typescript
// app/api/templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { UserRole } from '@prisma/client';
import { CreateTemplateDto } from '@/modules/templates/dto/template.dto';

export async function POST(request: NextRequest) {
  try {
    // 1. Authentification et autorisation
    const authService = new AuthService();
    await authService.requireRole(request.headers, UserRole.ADMIN);

    // 2. Récupération des données
    const data: CreateTemplateDto = await request.json();

    // 3. Utilisation du service
    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.createTemplate(data);

    // 4. Réponse
    return NextResponse.json({
      success: true,
      data: template,
    }, { status: 201 });

  } catch (error) {
    // 5. Gestion des erreurs
    ErrorHandler.log(error, 'POST /api/templates');
    return ErrorHandler.toResponse(error);
  }
}
```

### Lister les templates (GET)

```typescript
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filtres
    const category = searchParams.get('category');
    const isPremium = searchParams.get('isPremium') === 'true';

    // Service
    const templateService = ServiceFactory.getTemplateService();
    const result = await templateService.listTemplates(
      { page, limit },
      { category, isPremium }
    );

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
    ErrorHandler.log(error, 'GET /api/templates');
    return ErrorHandler.toResponse(error);
  }
}
```

### Récupérer un template par ID

```typescript
// app/api/templates/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.getTemplateById(
      params.id,
      true // Inclure le contenu
    );

    return NextResponse.json({
      success: true,
      data: template,
    });

  } catch (error) {
    ErrorHandler.log(error, `GET /api/templates/${params.id}`);
    return ErrorHandler.toResponse(error);
  }
}
```

### Mettre à jour un template

```typescript
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier les permissions
    const authService = new AuthService();
    await authService.requireRole(request.headers, UserRole.ADMIN);

    // Données
    const data = await request.json();

    // Service
    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.updateTemplate(params.id, data);

    return NextResponse.json({
      success: true,
      data: template,
    });

  } catch (error) {
    ErrorHandler.log(error, `PATCH /api/templates/${params.id}`);
    return ErrorHandler.toResponse(error);
  }
}
```

### Supprimer un template

```typescript
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authService = new AuthService();
    await authService.requireRole(request.headers, UserRole.ADMIN);

    const templateService = ServiceFactory.getTemplateService();
    await templateService.deleteTemplate(params.id);

    return NextResponse.json({
      success: true,
      message: 'Template supprimé avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, `DELETE /api/templates/${params.id}`);
    return ErrorHandler.toResponse(error);
  }
}
```

## Exemple : Route Documents

### Créer un document

```typescript
// app/api/documents/route.ts
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
    ErrorHandler.log(error, 'POST /api/documents');
    return ErrorHandler.toResponse(error);
  }
}
```

### Lister les documents de l'utilisateur

```typescript
export async function GET(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const documentService = ServiceFactory.getDocumentService();
    const result = await documentService.getUserDocumentsPaginated(
      user.id,
      { page, limit }
    );

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
    ErrorHandler.log(error, 'GET /api/documents');
    return ErrorHandler.toResponse(error);
  }
}
```

## Exemple : Génération IA

### Générer un README

```typescript
// app/api/ai/generate-readme/route.ts
import { AIService } from '@/modules/ai/services/ai.service';

export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    const isPremium = await authService.isPremium(request.headers);

    if (!isPremium) {
      throw new ForbiddenError('Fonctionnalité réservée aux utilisateurs premium');
    }

    const options = await request.json();

    const aiService = new AIService();
    const readme = await aiService.generateReadme(options);

    return NextResponse.json({
      success: true,
      data: { content: readme },
    });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/ai/generate-readme');
    return ErrorHandler.toResponse(error);
  }
}
```

### Obtenir des suggestions

```typescript
// app/api/ai/suggestions/route.ts
export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    const aiService = new AIService();
    const suggestions = await aiService.generateSuggestions(content);

    return NextResponse.json({
      success: true,
      data: suggestions,
    });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/ai/suggestions');
    return ErrorHandler.toResponse(error);
  }
}
```

## Exemple : Administration

### Changer le rôle d'un utilisateur

```typescript
// app/api/admin/users/[id]/role/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUser(request.headers);
    await authService.requireRole(request.headers, UserRole.ADMIN);

    const { role } = await request.json();

    const userService = ServiceFactory.getUserService();
    const user = await userService.changeUserRole(
      params.id,
      role,
      currentUser.id
    );

    return NextResponse.json({
      success: true,
      data: user,
    });

  } catch (error) {
    ErrorHandler.log(error, `PATCH /api/admin/users/${params.id}/role`);
    return ErrorHandler.toResponse(error);
  }
}
```

## Middleware d'authentification

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Routes publiques
  const publicRoutes = ['/api/auth'];
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Vérification de l'auth pour les autres routes
  try {
    const authService = new AuthService();
    await authService.getCurrentSession(request.headers);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { success: false, error: { message: 'Non authentifié' } },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};
```

## Réponses standardisées

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

## Codes HTTP

- `200` : OK
- `201` : Created
- `400` : Bad Request
- `401` : Unauthorized
- `403` : Forbidden
- `404` : Not Found
- `409` : Conflict
- `500` : Internal Server Error
