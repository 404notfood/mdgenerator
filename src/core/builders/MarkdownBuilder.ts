/**
 * Builder pour construire des documents Markdown de façon fluide
 * Pattern Builder pour créer des documents complexes étape par étape
 */
export class MarkdownBuilder {
  private content: string = '';

  /**
   * Ajoute un titre de niveau 1
   */
  h1(text: string): this {
    this.content += `# ${text}\n\n`;
    return this;
  }

  /**
   * Ajoute un titre de niveau 2
   */
  h2(text: string): this {
    this.content += `## ${text}\n\n`;
    return this;
  }

  /**
   * Ajoute un titre de niveau 3
   */
  h3(text: string): this {
    this.content += `### ${text}\n\n`;
    return this;
  }

  /**
   * Ajoute un paragraphe
   */
  paragraph(text: string): this {
    this.content += `${text}\n\n`;
    return this;
  }

  /**
   * Ajoute du texte en gras
   */
  bold(text: string): this {
    this.content += `**${text}**`;
    return this;
  }

  /**
   * Ajoute du texte en italique
   */
  italic(text: string): this {
    this.content += `*${text}*`;
    return this;
  }

  /**
   * Ajoute un lien
   */
  link(text: string, url: string): this {
    this.content += `[${text}](${url})`;
    return this;
  }

  /**
   * Ajoute une image
   */
  image(alt: string, url: string): this {
    this.content += `![${alt}](${url})\n\n`;
    return this;
  }

  /**
   * Ajoute une liste à puces
   */
  bulletList(items: string[]): this {
    items.forEach(item => {
      this.content += `- ${item}\n`;
    });
    this.content += '\n';
    return this;
  }

  /**
   * Ajoute une liste numérotée
   */
  orderedList(items: string[]): this {
    items.forEach((item, index) => {
      this.content += `${index + 1}. ${item}\n`;
    });
    this.content += '\n';
    return this;
  }

  /**
   * Ajoute un bloc de code
   */
  codeBlock(code: string, language: string = ''): this {
    this.content += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    return this;
  }

  /**
   * Ajoute du code inline
   */
  inlineCode(code: string): this {
    this.content += `\`${code}\``;
    return this;
  }

  /**
   * Ajoute une citation
   */
  quote(text: string): this {
    this.content += `> ${text}\n\n`;
    return this;
  }

  /**
   * Ajoute une ligne horizontale
   */
  horizontalRule(): this {
    this.content += `---\n\n`;
    return this;
  }

  /**
   * Ajoute un tableau
   */
  table(headers: string[], rows: string[][]): this {
    // En-têtes
    this.content += `| ${headers.join(' | ')} |\n`;
    // Séparateur
    this.content += `| ${headers.map(() => '---').join(' | ')} |\n`;
    // Lignes
    rows.forEach(row => {
      this.content += `| ${row.join(' | ')} |\n`;
    });
    this.content += '\n';
    return this;
  }

  /**
   * Ajoute un badge GitHub
   */
  badge(label: string, message: string, color: string = 'blue'): this {
    const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;
    this.content += `![${label}](${url}) `;
    return this;
  }

  /**
   * Ajoute un emoji
   */
  emoji(emoji: string): this {
    this.content += emoji;
    return this;
  }

  /**
   * Ajoute une nouvelle ligne
   */
  newLine(): this {
    this.content += '\n';
    return this;
  }

  /**
   * Ajoute du texte brut
   */
  raw(text: string): this {
    this.content += text;
    return this;
  }

  /**
   * Réinitialise le contenu
   */
  reset(): this {
    this.content = '';
    return this;
  }

  /**
   * Construit et retourne le Markdown final
   */
  build(): string {
    return this.content.trim();
  }

  /**
   * Crée un template de README basique
   */
  static createBasicReadme(projectName: string, description: string): string {
    return new MarkdownBuilder()
      .h1(projectName)
      .paragraph(description)
      .h2('🚀 Installation')
      .codeBlock('npm install', 'bash')
      .h2('📖 Utilisation')
      .paragraph('Décrivez comment utiliser votre projet ici.')
      .h2('🤝 Contribution')
      .paragraph('Les contributions sont les bienvenues !')
      .h2('📄 Licence')
      .paragraph('MIT')
      .build();
  }
}
