import { BaseRepository } from '@/core/base/BaseRepository';
import { prisma } from '@/lib/prisma';
import { Document } from '@prisma/client';
import { PaginatedResult, PaginationOptions } from '@/core/types/common.types';

/**
 * Repository pour la gestion des documents
 */
export class DocumentRepository extends BaseRepository<Document> {
  protected readonly model = prisma.document;

  /**
   * Trouve tous les documents d'un utilisateur
   */
  async findByUserId(userId: string): Promise<Document[]> {
    try {
      return await this.model.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'findByUserId');
    }
  }

  /**
   * Trouve les documents d'un utilisateur avec pagination
   */
  async findByUserIdWithPagination(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Document>> {
    const { page, limit, sortBy = 'updatedAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;

    try {
      const [items, total] = await Promise.all([
        this.model.findMany({
          where: { userId },
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
        }),
        this.model.count({ where: { userId } }),
      ]);

      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw this.handleError(error, 'findByUserIdWithPagination');
    }
  }

  /**
   * Vérifie si un document appartient à un utilisateur
   */
  async belongsToUser(documentId: string, userId: string): Promise<boolean> {
    try {
      const count = await this.model.count({
        where: {
          id: documentId,
          userId,
        },
      });
      return count > 0;
    } catch (error) {
      throw this.handleError(error, 'belongsToUser');
    }
  }

  /**
   * Recherche dans les documents d'un utilisateur
   */
  async searchByUser(userId: string, query: string): Promise<Document[]> {
    try {
      return await this.model.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: query } },
            { content: { contains: query } },
          ],
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'searchByUser');
    }
  }

  /**
   * Compte les documents d'un utilisateur
   */
  async countByUser(userId: string): Promise<number> {
    try {
      return await this.model.count({
        where: { userId },
      });
    } catch (error) {
      throw this.handleError(error, 'countByUser');
    }
  }

  /**
   * Récupère les documents récents d'un utilisateur
   */
  async findRecentByUser(userId: string, limit: number = 10): Promise<Document[]> {
    try {
      return await this.model.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: limit,
      });
    } catch (error) {
      throw this.handleError(error, 'findRecentByUser');
    }
  }
}
