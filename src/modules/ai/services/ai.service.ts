import { BaseService } from '@/core/base/BaseService';
import { MarkdownBuilder } from '@/core/builders/MarkdownBuilder';
import { BadRequestError } from '@/core/errors/ErrorHandler';

/**
 * Interface pour les options de génération
 */
export interface GenerateReadmeOptions {
  projectName: string;
  description?: string;
  technologies?: string[];
  features?: string[];
  installCommand?: string;
  usageExample?: string;
  license?: string;
  includeContribution?: boolean;
  includeBadges?: boolean;
}

/**
 * Interface pour les suggestions de contenu
 */
export interface ContentSuggestion {
  type: 'section' | 'feature' | 'improvement';
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Service d'intelligence artificielle pour la génération de contenu
 * Note: Cette version utilise des templates intelligents
 * Pour une vraie intégration IA, connectez OpenAI, Anthropic ou Mistral
 */
export class AIService extends BaseService {
  /**
   * Génère un README complet à partir des options
   */
  async generateReadme(options: GenerateReadmeOptions): Promise<string> {
    this.log('Génération d\'un README', { projectName: options.projectName });

    if (!options.projectName) {
      throw new BadRequestError('Le nom du projet est requis');
    }

    const builder = new MarkdownBuilder();

    // En-tête avec badges si demandé
    if (options.includeBadges) {
      this.addBadges(builder, options);
    }

    // Titre principal
    builder.h1(`${options.projectName} 🚀`);

    // Description
    if (options.description) {
      builder.paragraph(options.description);
    }

    // Technologies
    if (options.technologies && options.technologies.length > 0) {
      builder.h2('🛠️ Technologies utilisées');
      builder.bulletList(options.technologies);
    }

    // Fonctionnalités
    if (options.features && options.features.length > 0) {
      builder.h2('✨ Fonctionnalités');
      builder.bulletList(options.features);
    }

    // Installation
    builder.h2('📦 Installation');
    if (options.installCommand) {
      builder.codeBlock(options.installCommand, 'bash');
    } else {
      builder
        .paragraph('Clonez le repository :')
        .codeBlock(`git clone https://github.com/username/${options.projectName.toLowerCase().replace(/\s+/g, '-')}.git`, 'bash')
        .paragraph('Installez les dépendances :')
        .codeBlock('npm install', 'bash');
    }

    // Utilisation
    builder.h2('🚀 Utilisation');
    if (options.usageExample) {
      builder.codeBlock(options.usageExample, 'javascript');
    } else {
      builder.paragraph('Démarrez l\'application :');
      builder.codeBlock('npm start', 'bash');
    }

    // Configuration (optionnelle)
    builder.h2('⚙️ Configuration');
    builder.paragraph('Créez un fichier `.env` à la racine du projet :');
    builder.codeBlock('# Exemple de configuration\nAPI_KEY=your_api_key_here\nPORT=3000', 'env');

    // Structure du projet
    builder.h2('📁 Structure du projet');
    builder.codeBlock(
      this.generateProjectStructure(options.projectName),
      'plaintext'
    );

    // Contribution
    if (options.includeContribution !== false) {
      builder.h2('🤝 Contribution');
      builder
        .paragraph('Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :')
        .orderedList([
          'Forkez le projet',
          'Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)',
          'Commitez vos changements (`git commit -m \'Add some AmazingFeature\'`)',
          'Poussez vers la branche (`git push origin feature/AmazingFeature`)',
          'Ouvrez une Pull Request',
        ]);
    }

    // Licence
    builder.h2('📄 Licence');
    builder.paragraph(`Ce projet est sous licence ${options.license || 'MIT'}.`);

    // Footer
    builder
      .horizontalRule()
      .paragraph('Fait avec ❤️ par votre équipe');

    this.log('README généré avec succès');
    return builder.build();
  }

  /**
   * Génère des suggestions pour améliorer un document
   */
  async generateSuggestions(content: string): Promise<ContentSuggestion[]> {
    this.log('Génération de suggestions de contenu');

    const suggestions: ContentSuggestion[] = [];
    const contentLower = content.toLowerCase();

    // Suggestions basées sur le contenu manquant
    if (!contentLower.includes('installation')) {
      suggestions.push({
        type: 'section',
        title: 'Section Installation',
        content: 'Ajoutez une section expliquant comment installer votre projet.',
        priority: 'high',
      });
    }

    if (!contentLower.includes('license') && !contentLower.includes('licence')) {
      suggestions.push({
        type: 'section',
        title: 'Section Licence',
        content: 'Spécifiez la licence de votre projet.',
        priority: 'medium',
      });
    }

    if (!contentLower.includes('contribution')) {
      suggestions.push({
        type: 'section',
        title: 'Guide de contribution',
        content: 'Ajoutez un guide pour les contributeurs.',
        priority: 'medium',
      });
    }

    if (!contentLower.includes('test')) {
      suggestions.push({
        type: 'improvement',
        title: 'Tests',
        content: 'Documentez comment exécuter les tests.',
        priority: 'high',
      });
    }

    if (!content.includes('```')) {
      suggestions.push({
        type: 'improvement',
        title: 'Exemples de code',
        content: 'Ajoutez des exemples de code pour illustrer l\'utilisation.',
        priority: 'high',
      });
    }

    // Suggestions de fonctionnalités
    if (contentLower.includes('api')) {
      suggestions.push({
        type: 'feature',
        title: 'Documentation API',
        content: 'Créez une documentation détaillée de votre API.',
        priority: 'high',
      });
    }

    return suggestions;
  }

  /**
   * Génère une structure de projet type
   */
  private generateProjectStructure(projectName: string): string {
    return `${projectName}/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── tests/
├── docs/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json`;
  }

  /**
   * Ajoute des badges au document
   */
  private addBadges(builder: MarkdownBuilder, options: GenerateReadmeOptions): void {
    builder
      .badge('Version', '1.0.0', 'blue')
      .badge('License', options.license || 'MIT', 'green')
      .badge('Status', 'Active', 'success')
      .newLine()
      .newLine();
  }

  /**
   * Analyse la qualité d'un README
   */
  async analyzeReadmeQuality(content: string): Promise<{
    score: number;
    feedback: string[];
    missingElements: string[];
  }> {
    this.log('Analyse de la qualité du README');

    const feedback: string[] = [];
    const missingElements: string[] = [];
    let score = 0;

    const contentLower = content.toLowerCase();
    const essentialSections = [
      { name: 'titre', pattern: /^#\s/m, points: 10 },
      { name: 'description', length: 50, points: 15 },
      { name: 'installation', pattern: /installation/i, points: 20 },
      { name: 'utilisation', pattern: /usage|utilisation/i, points: 20 },
      { name: 'exemples', pattern: /```/g, points: 15 },
      { name: 'licence', pattern: /license|licence/i, points: 10 },
      { name: 'contribution', pattern: /contribut/i, points: 10 },
    ];

    // Vérification des sections essentielles
    essentialSections.forEach(section => {
      if (section.pattern) {
        if (section.pattern.test(content)) {
          score += section.points;
          feedback.push(`✅ Section "${section.name}" présente`);
        } else {
          missingElements.push(section.name);
          feedback.push(`❌ Section "${section.name}" manquante`);
        }
      } else if (section.length && content.length >= section.length) {
        score += section.points;
      }
    });

    // Bonus pour la qualité
    if (content.includes('![')) {
      score += 5;
      feedback.push('✅ Contient des images');
    }

    if (content.match(/```[\s\S]*?```/g)?.length! >= 2) {
      score += 5;
      feedback.push('✅ Contient plusieurs exemples de code');
    }

    return { score, feedback, missingElements };
  }
}
