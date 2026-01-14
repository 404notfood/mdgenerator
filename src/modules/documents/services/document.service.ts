import { BaseService } from '@/core/base/BaseService';
import { DocumentRepository } from '../repositories/document.repository';
import {
  CreateDocumentDto,
  CreateDocumentSchema,
  UpdateDocumentDto,
  UpdateDocumentSchema,
  DocumentResponseDto,
} from '../dto/document.dto';
import { Document } from '@prisma/client';
import { NotFoundError, ForbiddenError } from '@/core/errors/ErrorHandler';
import { PaginatedResult, PaginationOptions } from '@/core/types/common.types';

/**
 * Service de gestion des documents
 */
export class DocumentService extends BaseService {
  private readonly repository: DocumentRepository;

  constructor() {
    super();
    this.repository = new DocumentRepository();
  }

  /**
   * Crée un nouveau document
   */
  async createDocument(userId: string, data: CreateDocumentDto): Promise<DocumentResponseDto> {
    this.log('Création d\'un nouveau document', { userId, title: data.title });

    // Validation
    const validatedData = this.validate<CreateDocumentDto>(CreateDocumentSchema, data);

    const document = await this.repository.create({
      ...validatedData,
      userId,
    });

    this.log('Document créé avec succès', { id: document.id });
    return this.mapToResponseDto(document);
  }

  /**
   * Récupère un document par ID
   */
  async getDocumentById(id: string, userId: string): Promise<DocumentResponseDto> {
    const document = await this.repository.findById(id);

    if (!document) {
      throw new NotFoundError('Document');
    }

    // Vérification de propriété
    if (document.userId !== userId) {
      throw new ForbiddenError('Vous n\'avez pas accès à ce document');
    }

    return this.mapToResponseDto(document);
  }

  /**
   * Met à jour un document
   */
  async updateDocument(
    id: string,
    userId: string,
    data: UpdateDocumentDto
  ): Promise<DocumentResponseDto> {
    this.log('Mise à jour du document', { id, userId });

    // Validation
    const validatedData = this.validate<UpdateDocumentDto>(UpdateDocumentSchema, data);

    // Vérification de l'existence et de la propriété
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Document');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('Vous n\'avez pas le droit de modifier ce document');
    }

    const document = await this.repository.update(id, validatedData);
    this.log('Document mis à jour avec succès', { id });

    return this.mapToResponseDto(document);
  }

  /**
   * Supprime un document
   */
  async deleteDocument(id: string, userId: string): Promise<void> {
    this.log('Suppression du document', { id, userId });

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Document');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('Vous n\'avez pas le droit de supprimer ce document');
    }

    await this.repository.delete(id);
    this.log('Document supprimé avec succès', { id });
  }

  /**
   * Liste tous les documents d'un utilisateur
   */
  async getUserDocuments(userId: string): Promise<DocumentResponseDto[]> {
    const documents = await this.repository.findByUserId(userId);
    return documents.map(doc => this.mapToResponseDto(doc));
  }

  /**
   * Liste les documents d'un utilisateur avec pagination
   */
  async getUserDocumentsPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<DocumentResponseDto>> {
    const result = await this.repository.findByUserIdWithPagination(userId, options);

    return {
      ...result,
      items: result.items.map(doc => this.mapToResponseDto(doc)),
    };
  }

  /**
   * Recherche dans les documents d'un utilisateur
   */
  async searchDocuments(userId: string, query: string): Promise<DocumentResponseDto[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const documents = await this.repository.searchByUser(userId, query.trim());
    return documents.map(doc => this.mapToResponseDto(doc));
  }

  /**
   * Récupère les documents récents d'un utilisateur
   */
  async getRecentDocuments(userId: string, limit: number = 10): Promise<DocumentResponseDto[]> {
    const documents = await this.repository.findRecentByUser(userId, limit);
    return documents.map(doc => this.mapToResponseDto(doc));
  }

  /**
   * Duplique un document
   */
  async duplicateDocument(id: string, userId: string): Promise<DocumentResponseDto> {
    this.log('Duplication du document', { id, userId });

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Document');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('Vous n\'avez pas accès à ce document');
    }

    const newDocument = await this.repository.create({
      title: `${existing.title} (copie)`,
      content: existing.content,
      userId,
    });

    this.log('Document dupliqué avec succès', { originalId: id, newId: newDocument.id });
    return this.mapToResponseDto(newDocument);
  }

  /**
   * Compte les documents d'un utilisateur
   */
  async countUserDocuments(userId: string): Promise<number> {
    return await this.repository.countByUser(userId);
  }

  /**
   * Mapping vers DTO de réponse
   */
  private mapToResponseDto(document: Document): DocumentResponseDto {
    return {
      id: document.id,
      title: document.title,
      content: document.content,
      userId: document.userId,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
