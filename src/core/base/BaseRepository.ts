/**
 * Classe abstraite de base pour tous les repositories
 * Implémente le pattern Repository pour l'accès aux données
 */
export abstract class BaseRepository<T> {
  protected abstract readonly model: any;

  /**
   * Trouve une entité par son ID
   */
  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findUnique({
        where: { id }
      });
    } catch (error) {
      throw this.handleError(error, 'findById');
    }
  }

  /**
   * Trouve toutes les entités
   */
  async findAll(): Promise<T[]> {
    try {
      return await this.model.findMany();
    } catch (error) {
      throw this.handleError(error, 'findAll');
    }
  }

  /**
   * Crée une nouvelle entité
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.model.create({
        data
      });
    } catch (error) {
      throw this.handleError(error, 'create');
    }
  }

  /**
   * Met à jour une entité
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      return await this.model.update({
        where: { id },
        data
      });
    } catch (error) {
      throw this.handleError(error, 'update');
    }
  }

  /**
   * Supprime une entité
   */
  async delete(id: string): Promise<T> {
    try {
      return await this.model.delete({
        where: { id }
      });
    } catch (error) {
      throw this.handleError(error, 'delete');
    }
  }

  /**
   * Compte le nombre d'entités
   */
  async count(where?: any): Promise<number> {
    try {
      return await this.model.count({ where });
    } catch (error) {
      throw this.handleError(error, 'count');
    }
  }

  /**
   * Gestion centralisée des erreurs
   */
  protected handleError(error: any, operation: string): Error {
    const message = `Erreur lors de l'opération ${operation} sur ${this.constructor.name}`;
    console.error(message, error);
    return new Error(`${message}: ${error.message}`);
  }
}
