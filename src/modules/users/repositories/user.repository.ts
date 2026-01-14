import { BaseRepository } from '@/core/base/BaseRepository';
import { prisma } from '@/lib/prisma';
import { User, UserRole } from '@prisma/client';

/**
 * Repository pour la gestion des utilisateurs
 */
export class UserRepository extends BaseRepository<User> {
  protected readonly model = prisma.user;

  /**
   * Trouve un utilisateur par email
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.model.findUnique({
        where: { email },
      });
    } catch (error) {
      throw this.handleError(error, 'findByEmail');
    }
  }

  /**
   * Trouve un utilisateur avec ses relations
   */
  async findByIdWithRelations(id: string): Promise<any> {
    try {
      return await this.model.findUnique({
        where: { id },
        include: {
          documents: {
            orderBy: { updatedAt: 'desc' },
            take: 10,
          },
          purchases: {
            include: {
              template: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    } catch (error) {
      throw this.handleError(error, 'findByIdWithRelations');
    }
  }

  /**
   * Met à jour le rôle d'un utilisateur
   */
  async updateRole(id: string, role: UserRole): Promise<User> {
    try {
      return await this.model.update({
        where: { id },
        data: { role },
      });
    } catch (error) {
      throw this.handleError(error, 'updateRole');
    }
  }

  /**
   * Compte les utilisateurs par rôle
   */
  async countByRole(): Promise<Record<UserRole, number>> {
    try {
      const users = await this.model.groupBy({
        by: ['role'],
        _count: true,
      });

      const result: any = {
        [UserRole.USER]: 0,
        [UserRole.PREMIUM]: 0,
        [UserRole.ADMIN]: 0,
      };

      users.forEach(({ role, _count }: { role: UserRole; _count: number }) => {
        result[role] = _count;
      });

      return result;
    } catch (error) {
      throw this.handleError(error, 'countByRole');
    }
  }

  /**
   * Récupère les utilisateurs premium
   */
  async findPremiumUsers(): Promise<User[]> {
    try {
      return await this.model.findMany({
        where: { role: UserRole.PREMIUM },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw this.handleError(error, 'findPremiumUsers');
    }
  }

  /**
   * Vérifie si un email existe déjà
   */
  async emailExists(email: string): Promise<boolean> {
    try {
      const count = await this.model.count({
        where: { email },
      });
      return count > 0;
    } catch (error) {
      throw this.handleError(error, 'emailExists');
    }
  }

  /**
   * Récupère les statistiques d'un utilisateur
   */
  async getUserStats(userId: string): Promise<{
    documentsCount: number;
    purchasesCount: number;
    totalSpent: number;
  }> {
    try {
      const [documentsCount, purchases] = await Promise.all([
        prisma.document.count({ where: { userId } }),
        prisma.purchase.findMany({
          where: { userId, status: 'SUCCEEDED' },
          select: { amount: true },
        }),
      ]);

      const totalSpent = purchases.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0);

      return {
        documentsCount,
        purchasesCount: purchases.length,
        totalSpent,
      };
    } catch (error) {
      throw this.handleError(error, 'getUserStats');
    }
  }
}
