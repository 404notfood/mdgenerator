import { BaseService } from '@/core/base/BaseService';
import { TemplateRepository } from '../repositories/template.repository';
import {
  CreateTemplateDto,
  CreateTemplateSchema,
  UpdateTemplateDto,
  UpdateTemplateSchema,
  TemplateFilterDto,
  TemplateResponseDto,
  TemplateDetailDto,
} from '../dto/template.dto';
import { Template, TemplateCategory } from '@prisma/client';
import { NotFoundError, ForbiddenError } from '@/core/errors/ErrorHandler';
import { PaginatedResult, PaginationOptions } from '@/core/types/common.types';

/**
 * Service de gestion des templates
 * Encapsule toute la logique métier liée aux templates
 */
export class TemplateService extends BaseService {
  private readonly repository: TemplateRepository;

  constructor() {
    super();
    this.repository = new TemplateRepository();
  }

  /**
   * Crée un nouveau template
   */
  async createTemplate(data: CreateTemplateDto): Promise<TemplateDetailDto> {
    this.log('Création d\'un nouveau template', { name: data.name });

    // Validation des données
    const validatedData = this.validate<CreateTemplateDto>(CreateTemplateSchema, data);

    // Génération de la prévisualisation HTML si non fournie
    if (!validatedData.htmlPreview) {
      validatedData.htmlPreview = this.generateHtmlPreview(validatedData.content);
    }

    const template = await this.repository.create(validatedData);
    this.log('Template créé avec succès', { id: template.id });

    return this.mapToDetailDto(template);
  }

  /**
   * Récupère un template par son ID
   */
  async getTemplateById(id: string, includeContent: boolean = false): Promise<TemplateDetailDto | TemplateResponseDto> {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new NotFoundError('Template');
    }

    return includeContent ? this.mapToDetailDto(template) : this.mapToResponseDto(template);
  }

  /**
   * Met à jour un template
   */
  async updateTemplate(id: string, data: UpdateTemplateDto): Promise<TemplateDetailDto> {
    this.log('Mise à jour du template', { id });

    // Validation des données
    const validatedData = this.validate<UpdateTemplateDto>(UpdateTemplateSchema, data);

    // Vérification de l'existence
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Template');
    }

    // Régénération de la prévisualisation si le contenu change
    if (validatedData.content && !validatedData.htmlPreview) {
      validatedData.htmlPreview = this.generateHtmlPreview(validatedData.content);
    }

    const template = await this.repository.update(id, validatedData);
    this.log('Template mis à jour avec succès', { id });

    return this.mapToDetailDto(template);
  }

  /**
   * Supprime un template
   */
  async deleteTemplate(id: string): Promise<void> {
    this.log('Suppression du template', { id });

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Template');
    }

    await this.repository.delete(id);
    this.log('Template supprimé avec succès', { id });
  }

  /**
   * Liste les templates avec pagination
   */
  async listTemplates(
    options: PaginationOptions,
    filters?: TemplateFilterDto
  ): Promise<PaginatedResult<TemplateResponseDto>> {
    const result = await this.repository.findWithPagination(options, filters);

    return {
      ...result,
      items: result.items.map(template => this.mapToResponseDto(template)),
    };
  }

  /**
   * Récupère les templates par catégorie
   */
  async getTemplatesByCategory(category: TemplateCategory): Promise<TemplateResponseDto[]> {
    const templates = await this.repository.findByCategory(category);
    return templates.map(template => this.mapToResponseDto(template));
  }

  /**
   * Récupère les templates premium actifs
   */
  async getPremiumTemplates(): Promise<TemplateResponseDto[]> {
    const templates = await this.repository.findPremiumActive();
    return templates.map(template => this.mapToResponseDto(template));
  }

  /**
   * Récupère les templates gratuits actifs
   */
  async getFreeTemplates(): Promise<TemplateResponseDto[]> {
    const templates = await this.repository.findFreeActive();
    return templates.map(template => this.mapToResponseDto(template));
  }

  /**
   * Met à jour le prix d'un template
   */
  async updatePrice(id: string, price: number): Promise<TemplateDetailDto> {
    this.log('Mise à jour du prix du template', { id, price });

    if (price < 0) {
      throw new ForbiddenError('Le prix ne peut pas être négatif');
    }

    const template = await this.repository.updatePrice(id, price);
    return this.mapToDetailDto(template);
  }

  /**
   * Active ou désactive un template
   */
  async toggleActive(id: string, isActive: boolean): Promise<TemplateDetailDto> {
    this.log('Changement de statut du template', { id, isActive });

    const template = await this.repository.toggleActive(id, isActive);
    return this.mapToDetailDto(template);
  }

  /**
   * Statistiques sur les templates
   */
  async getStatistics(): Promise<{
    total: number;
    premium: number;
    free: number;
    byCategory: Record<TemplateCategory, number>;
  }> {
    const [total, premium, free, byCategory] = await Promise.all([
      this.repository.count(),
      this.repository.count({ isPremium: true }),
      this.repository.count({ isPremium: false }),
      this.repository.countByCategory(),
    ]);

    return { total, premium, free, byCategory };
  }

  /**
   * Génère une prévisualisation HTML basique
   */
  private generateHtmlPreview(markdown: string): string {
    // Conversion Markdown basique (à améliorer avec marked ou remark)
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /**
   * Mapping vers DTO de réponse
   */
  private mapToResponseDto(template: Template): TemplateResponseDto {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
      price: template.price,
      thumbnail: template.thumbnail,
      isPremium: template.isPremium,
      isActive: template.isActive,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  /**
   * Mapping vers DTO détaillé
   */
  private mapToDetailDto(template: Template): TemplateDetailDto {
    return {
      ...this.mapToResponseDto(template),
      content: template.content,
      htmlPreview: template.htmlPreview,
    };
  }
}
