import { z } from 'zod';
import { TemplateCategory } from '@prisma/client';

/**
 * DTO pour la création d'un template
 */
export const CreateTemplateSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(500),
  category: z.nativeEnum(TemplateCategory),
  price: z.number().int().min(0, 'Le prix doit être positif'),
  content: z.string().min(1, 'Le contenu est requis'),
  htmlPreview: z.string().optional(),
  thumbnail: z.string().url().optional().nullable(),
  isPremium: z.boolean().default(true),
  isActive: z.boolean().default(true),
});

export type CreateTemplateDto = z.infer<typeof CreateTemplateSchema>;

/**
 * DTO pour la mise à jour d'un template
 */
export const UpdateTemplateSchema = CreateTemplateSchema.partial();

export type UpdateTemplateDto = z.infer<typeof UpdateTemplateSchema>;

/**
 * DTO pour les filtres de recherche de templates
 */
export const TemplateFilterSchema = z.object({
  category: z.nativeEnum(TemplateCategory).optional(),
  isPremium: z.boolean().optional(),
  isActive: z.boolean().optional(),
  minPrice: z.number().int().min(0).optional(),
  maxPrice: z.number().int().min(0).optional(),
  search: z.string().optional(),
});

export type TemplateFilterDto = z.infer<typeof TemplateFilterSchema>;

/**
 * DTO pour la réponse d'un template
 */
export interface TemplateResponseDto {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number;
  thumbnail: string | null;
  isPremium: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO détaillé incluant le contenu
 */
export interface TemplateDetailDto extends TemplateResponseDto {
  content: string;
  htmlPreview: string;
  purchaseCount?: number;
}
