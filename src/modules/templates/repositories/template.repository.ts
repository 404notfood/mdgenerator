import { BaseRepository } from '@/core/base/BaseRepository';
import { prisma } from '@/lib/prisma';
import { Template, TemplateCategory } from '@prisma/client';
import { PaginatedResult, PaginationOptions } from '@/core/types/common.types';
import { TemplateFilterDto } from '../dto/template.dto';

/**
 * Repository pour la gestion des templates
 */
export class TemplateRepository extends BaseRepository<Template> {
  protected readonly model = prisma.template;

  /**
   * Trouve les templates avec pagination et filtres
   */
  async findWithPagination(
    options: PaginationOptions,
    filters?: TemplateFilterDto
  ): Promise<PaginatedResult<Template>> {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;

    // Construction des filtres
    const where: any = {};
    
    if (filters) {
      if (filters.category) where.category = filters.category;
      if (filters.isPremium !== undefined) where.isPremium = filters.isPremium;
      if (filters.isActive !== undefined) where.isActive = filters.isActive;
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
        if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
      }
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search } },
          { description: { contains: filters.search } },
        ];
      }
    }

    const [items, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.model.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Trouve les templates par catégorie
   */
  async findByCategory(category: TemplateCategory): Promise<Template[]> {
    try {
      return await this.model.findMany({
        where: { category, isActive: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'findByCategory');
    }
  }

  /**
   * Trouve les templates premium actifs
   */
  async findPremiumActive(): Promise<Template[]> {
    try {
      return await this.model.findMany({
        where: { 
          isPremium: true,
          isActive: true 
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'findPremiumActive');
    }
  }

  /**
   * Trouve les templates gratuits actifs
   */
  async findFreeActive(): Promise<Template[]> {
    try {
      return await this.model.findMany({
        where: { 
          isPremium: false,
          isActive: true 
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'findFreeActive');
    }
  }

  /**
   * Met à jour le prix d'un template
   */
  async updatePrice(id: string, price: number): Promise<Template> {
    try {
      return await this.model.update({
        where: { id },
        data: { price },
      });
    } catch (error) {
      throw this.handleError(error, 'updatePrice');
    }
  }

  /**
   * Active ou désactive un template
   */
  async toggleActive(id: string, isActive: boolean): Promise<Template> {
    try {
      return await this.model.update({
        where: { id },
        data: { isActive },
      });
    } catch (error) {
      throw this.handleError(error, 'toggleActive');
    }
  }

  /**
   * Compte les templates par catégorie
   */
  async countByCategory(): Promise<Record<TemplateCategory, number>> {
    try {
      const templates = await this.model.groupBy({
        by: ['category'],
        _count: true,
      });

      const result: any = {};
      templates.forEach(({ category, _count }: { category: TemplateCategory; _count: number }) => {
        result[category] = _count;
      });

      return result;
    } catch (error) {
      throw this.handleError(error, 'countByCategory');
    }
  }
}
