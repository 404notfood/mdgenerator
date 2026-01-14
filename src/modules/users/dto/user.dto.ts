import { z } from 'zod';
import { UserRole } from '@prisma/client';

/**
 * DTO pour la création d'un utilisateur
 */
export const CreateUserSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100).optional(),
  image: z.string().url().optional().nullable(),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  emailVerified: z.boolean().default(false),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

/**
 * DTO pour la mise à jour d'un utilisateur
 */
export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional().nullable(),
  role: z.nativeEnum(UserRole).optional(),
  emailVerified: z.boolean().optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

/**
 * DTO pour la réponse utilisateur (sans données sensibles)
 */
export interface UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO utilisateur avec statistiques
 */
export interface UserWithStatsDto extends UserResponseDto {
  documentsCount: number;
  purchasesCount: number;
  totalSpent: number;
}
