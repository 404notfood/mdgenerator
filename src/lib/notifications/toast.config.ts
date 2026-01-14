/**
 * Configuration centralisée des notifications toast
 * Remplace les alert() par un système moderne
 */

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface ToastOptions {
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Classe pour gérer les notifications
 * Utilise l'API native du navigateur en attendant l'intégration d'une lib (sonner, react-hot-toast)
 */
export class ToastService {
  private static toasts: Map<string, HTMLDivElement> = new Map();
  private static container: HTMLDivElement | null = null;

  /**
   * Initialise le conteneur de toasts
   */
  private static initContainer(): void {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  /**
   * Affiche une notification
   */
  static show(options: ToastOptions): string {
    this.initContainer();

    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast = this.createToastElement(options, id);

    this.toasts.set(id, toast);
    this.container!.appendChild(toast);

    // Animation d'entrée
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);

    // Auto-suppression
    const duration = options.duration || 5000;
    setTimeout(() => {
      this.hide(id);
    }, duration);

    return id;
  }

  /**
   * Crée l'élément DOM du toast
   */
  private static createToastElement(options: ToastOptions, id: string): HTMLDivElement {
    const toast = document.createElement('div');
    const colors = this.getColors(options.type);

    toast.style.cssText = `
      background: white;
      border-left: 4px solid ${colors.border};
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(400px);
      opacity: 0;
      transition: all 0.3s ease;
      cursor: pointer;
      min-width: 300px;
    `;

    const icon = this.getIcon(options.type);

    toast.innerHTML = `
      <div style="display: flex; align-items: start; gap: 12px;">
        <div style="font-size: 24px;">${icon}</div>
        <div style="flex: 1;">
          ${options.title ? `<div style="font-weight: 600; margin-bottom: 4px; color: #1f2937;">${options.title}</div>` : ''}
          <div style="color: #6b7280; font-size: 14px;">${options.message}</div>
          ${options.action ? `
            <button onclick="(${options.action.onClick.toString()})()" style="
              margin-top: 8px;
              padding: 4px 12px;
              background: ${colors.border};
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 500;
            ">${options.action.label}</button>
          ` : ''}
        </div>
        <button onclick="this.closest('div[style*=transform]').remove()" style="
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #9ca3af;
          padding: 0;
          line-height: 1;
        ">×</button>
      </div>
    `;

    toast.onclick = () => this.hide(id);

    return toast;
  }

  /**
   * Masque un toast
   */
  static hide(id: string): void {
    const toast = this.toasts.get(id);
    if (!toast) return;

    toast.style.transform = 'translateX(400px)';
    toast.style.opacity = '0';

    setTimeout(() => {
      toast.remove();
      this.toasts.delete(id);
    }, 300);
  }

  /**
   * Récupère les couleurs selon le type
   */
  private static getColors(type: ToastType): { border: string; bg: string } {
    switch (type) {
      case ToastType.SUCCESS:
        return { border: '#10b981', bg: '#d1fae5' };
      case ToastType.ERROR:
        return { border: '#ef4444', bg: '#fee2e2' };
      case ToastType.WARNING:
        return { border: '#f59e0b', bg: '#fef3c7' };
      case ToastType.INFO:
      default:
        return { border: '#3b82f6', bg: '#dbeafe' };
    }
  }

  /**
   * Récupère l'icône selon le type
   */
  private static getIcon(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return '✅';
      case ToastType.ERROR:
        return '❌';
      case ToastType.WARNING:
        return '⚠️';
      case ToastType.INFO:
      default:
        return 'ℹ️';
    }
  }

  /**
   * Raccourcis pratiques
   */
  static success(message: string, title?: string): string {
    return this.show({ message, title, type: ToastType.SUCCESS });
  }

  static error(message: string, title?: string): string {
    return this.show({ message, title, type: ToastType.ERROR });
  }

  static warning(message: string, title?: string): string {
    return this.show({ message, title, type: ToastType.WARNING });
  }

  static info(message: string, title?: string): string {
    return this.show({ message, title, type: ToastType.INFO });
  }
}
