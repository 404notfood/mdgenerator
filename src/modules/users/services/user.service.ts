import { BaseService } from '@/core/base/BaseService';
import { UserRepository } from '../repositories/user.repository';
import {
  CreateUserDto,
  CreateUserSchema,
  UpdateUserDto,
  UpdateUserSchema,
  UserResponseDto,
  UserWithStatsDto,
} from '../dto/user.dto';
import { User, UserRole } from '@prisma/client';
import { NotFoundError, ConflictError, ForbiddenError } from '@/core/errors/ErrorHandler';

/**
 * Service de gestion des utilisateurs
 */
export class UserService extends BaseService {
  private readonly repository: UserRepository;

  constructor() {
    super();
    this.repository = new UserRepository();
  }

  /**
   * Crée un nouvel utilisateur
   */
  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    this.log('Création d\'un nouvel utilisateur', { email: data.email });

    // Validation
    const validatedData = this.validate<CreateUserDto>(CreateUserSchema, data);

    // Vérification de l'unicité de l'email
    const emailExists = await this.repository.emailExists(validatedData.email);
    if (emailExists) {
      throw new ConflictError('Cet email est déjà utilisé');
    }

    const user = await this.repository.create(validatedData);
    this.log('Utilisateur créé avec succès', { id: user.id });

    return this.mapToResponseDto(user);
  }

  /**
   * Récupère un utilisateur par ID
   */
  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('Utilisateur');
    }

    return this.mapToResponseDto(user);
  }

  /**
   * Récupère un utilisateur par email
   */
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('Utilisateur');
    }

    return this.mapToResponseDto(user);
  }

  /**
   * Récupère un utilisateur avec ses statistiques
   */
  async getUserWithStats(id: string): Promise<UserWithStatsDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('Utilisateur');
    }

    const stats = await this.repository.getUserStats(id);

    return {
      ...this.mapToResponseDto(user),
      ...stats,
    };
  }

  /**
   * Met à jour un utilisateur
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    this.log('Mise à jour de l\'utilisateur', { id });

    // Validation
    const validatedData = this.validate<UpdateUserDto>(UpdateUserSchema, data);

    // Vérification de l'existence
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError('Utilisateur');
    }

    const user = await this.repository.update(id, validatedData);
    this.log('Utilisateur mis à jour avec succès', { id });

    return this.mapToResponseDto(user);
  }

  /**
   * Change le rôle d'un utilisateur
   */
  async changeUserRole(id: string, role: UserRole, requesterId: string): Promise<UserResponseDto> {
    this.log('Changement de rôle', { userId: id, newRole: role, requesterId });

    // Vérification que l'utilisateur existe
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('Utilisateur');
    }

    // Vérification que le requérant n'essaie pas de changer son propre rôle
    if (id === requesterId) {
      throw new ForbiddenError('Vous ne pouvez pas changer votre propre rôle');
    }

    const updatedUser = await this.repository.updateRole(id, role);
    this.log('Rôle mis à jour avec succès', { userId: id, newRole: role });

    return this.mapToResponseDto(updatedUser);
  }

  /**
   * Supprime un utilisateur
   */
  async deleteUser(id: string, requesterId: string): Promise<void> {
    this.log('Suppression de l\'utilisateur', { id, requesterId });

    // Vérification de l'existence
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('Utilisateur');
    }

    // Empêcher l'auto-suppression
    if (id === requesterId) {
      throw new ForbiddenError('Vous ne pouvez pas supprimer votre propre compte');
    }

    await this.repository.delete(id);
    this.log('Utilisateur supprimé avec succès', { id });
  }

  /**
   * Récupère tous les utilisateurs premium
   */
  async getPremiumUsers(): Promise<UserResponseDto[]> {
    const users = await this.repository.findPremiumUsers();
    return users.map(user => this.mapToResponseDto(user));
  }

  /**
   * Statistiques globales des utilisateurs
   */
  async getStatistics(): Promise<{
    total: number;
    byRole: Record<UserRole, number>;
  }> {
    const [total, byRole] = await Promise.all([
      this.repository.count(),
      this.repository.countByRole(),
    ]);

    return { total, byRole };
  }

  /**
   * Mapping vers DTO de réponse
   */
  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
