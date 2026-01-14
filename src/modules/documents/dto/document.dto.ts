import { z } from 'zod';

/**
 * DTO pour la création d'un document
 */
export const CreateDocumentSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200),
  content: z.string().default(''),
});

export type CreateDocumentDto = z.infer<typeof CreateDocumentSchema>;

/**
 * DTO pour la mise à jour d'un document
 */
export const UpdateDocumentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
});

export type UpdateDocumentDto = z.infer<typeof UpdateDocumentSchema>;

/**
 * DTO pour la réponse d'un document
 */
export interface DocumentResponseDto {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO pour un document avec informations utilisateur
 */
export interface DocumentWithUserDto extends DocumentResponseDto {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}
