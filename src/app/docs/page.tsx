"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  BookOpen,
  Code2,
  Sparkles,
  FileText,
  Download,
  Palette,
  BarChart3,
  ArrowRight,
  Search,
  ChevronRight,
  X,
  Keyboard,
  Copy,
  Check
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Article {
  id: string
  title: string
  content: string
}

interface Section {
  title: string
  icon: any
  color: string
  articles: Article[]
}

const sections: Section[] = [
  {
    title: "Prise en main",
    icon: Sparkles,
    color: "from-teal-500 to-cyan-500",
    articles: [
      {
        id: "intro",
        title: "Introduction à MarkdownPro",
        content: `# Introduction à MarkdownPro

**MarkdownPro** est un éditeur de README professionnel conçu pour les développeurs qui veulent créer des documentations de qualité pour leurs projets GitHub.

## Fonctionnalités principales

- **Éditeur visuel** : Pas besoin de connaître la syntaxe Markdown, utilisez la barre d'outils
- **Widgets GitHub** : Ajoutez des stats, graphiques et badges en un clic
- **Génération IA** : Laissez l'IA créer votre README à partir de votre code
- **Templates Premium** : Utilisez des templates professionnels prêts à l'emploi
- **Export multiple** : Markdown, HTML, PDF

## Pour qui ?

MarkdownPro est parfait pour :
- Les développeurs open-source
- Les équipes qui documentent leurs projets
- Les freelances qui veulent impressionner leurs clients
- Tous ceux qui veulent un README professionnel rapidement`
      },
      {
        id: "first-readme",
        title: "Créer votre premier README",
        content: `# Créer votre premier README

## Étape 1 : Accéder à l'éditeur

Cliquez sur **"Nouveau README"** depuis le dashboard ou allez directement sur \`/editor\`.

## Étape 2 : Choisir un point de départ

Vous avez 3 options :
1. **Partir de zéro** : Commencez avec un document vide
2. **Utiliser un template** : Choisissez parmi nos templates
3. **Importer de GitHub** : Importez un README existant (Premium)

## Étape 3 : Rédiger votre contenu

Utilisez la barre d'outils pour :
- Ajouter des titres (H1, H2, H3)
- Mettre en **gras** ou *italique*
- Créer des listes
- Insérer du code
- Ajouter des widgets GitHub

## Étape 4 : Prévisualiser et exporter

- Cliquez sur l'onglet **Preview** pour voir le résultat
- Exportez en Markdown, HTML ou PDF
- Copiez directement vers GitHub`
      },
      {
        id: "interface",
        title: "Comprendre l'interface",
        content: `# Comprendre l'interface

## Barre d'outils principale

La barre d'outils en haut de l'éditeur contient :

| Icône | Action |
|-------|--------|
| **B** | Texte en gras |
| *I* | Texte en italique |
| H1/H2/H3 | Niveaux de titres |
| Liste | Créer une liste |
| Code | Bloc de code |
| Image | Insérer une image |
| Widget | Ajouter un widget GitHub |

## Panneau latéral

À droite, vous trouverez :
- **Widgets** : Bibliothèque de widgets GitHub
- **Templates** : Templates disponibles
- **Historique** : Versions précédentes

## Barre de statut

En bas de l'écran :
- Compteur de caractères
- Statut de sauvegarde
- Boutons d'export`
      },
      {
        id: "shortcuts",
        title: "Raccourcis clavier",
        content: `# Raccourcis clavier

Gagnez du temps avec ces raccourcis :

## Formatage

| Raccourci | Action |
|-----------|--------|
| \`Ctrl + B\` | Gras |
| \`Ctrl + I\` | Italique |
| \`Ctrl + U\` | Souligné |
| \`Ctrl + K\` | Lien |

## Édition

| Raccourci | Action |
|-----------|--------|
| \`Ctrl + Z\` | Annuler |
| \`Ctrl + Y\` | Rétablir |
| \`Ctrl + S\` | Sauvegarder |
| \`Ctrl + A\` | Tout sélectionner |

## Navigation

| Raccourci | Action |
|-----------|--------|
| \`Ctrl + Home\` | Début du document |
| \`Ctrl + End\` | Fin du document |
| \`Ctrl + F\` | Rechercher |

## Export

| Raccourci | Action |
|-----------|--------|
| \`Ctrl + Shift + E\` | Exporter |
| \`Ctrl + Shift + C\` | Copier en Markdown |`
      }
    ]
  },
  {
    title: "Éditeur",
    icon: Code2,
    color: "from-blue-500 to-indigo-500",
    articles: [
      {
        id: "markdown",
        title: "Syntaxe Markdown",
        content: `# Syntaxe Markdown

Le Markdown est un langage de balisage léger. Voici les bases :

## Titres

\`\`\`markdown
# Titre 1
## Titre 2
### Titre 3
\`\`\`

## Formatage de texte

\`\`\`markdown
**Texte en gras**
*Texte en italique*
~~Texte barré~~
\`code inline\`
\`\`\`

## Listes

\`\`\`markdown
- Élément 1
- Élément 2
  - Sous-élément

1. Premier
2. Deuxième
3. Troisième
\`\`\`

## Liens et images

\`\`\`markdown
[Texte du lien](https://example.com)
![Alt text](image.png)
\`\`\`

## Citations

\`\`\`markdown
> Ceci est une citation
> sur plusieurs lignes
\`\`\``
      },
      {
        id: "formatting",
        title: "Formatage avancé",
        content: `# Formatage avancé

## Tableaux

\`\`\`markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|:---------:|----------:|
| Gauche    | Centre    | Droite    |
| Texte     | Texte     | Texte     |
\`\`\`

## Listes de tâches

\`\`\`markdown
- [x] Tâche complétée
- [ ] Tâche à faire
- [ ] Autre tâche
\`\`\`

## Notes de bas de page

\`\`\`markdown
Voici un texte avec une note[^1].

[^1]: Contenu de la note de bas de page.
\`\`\`

## Lignes horizontales

\`\`\`markdown
---
***
___
\`\`\`

## HTML intégré

Vous pouvez utiliser du HTML directement :

\`\`\`html
<details>
<summary>Cliquez pour voir plus</summary>
Contenu caché ici
</details>
\`\`\``
      },
      {
        id: "code-blocks",
        title: "Blocs de code",
        content: `# Blocs de code

## Code inline

Utilisez les backticks pour du code inline :

\`\`\`markdown
Installez avec \`npm install package\`
\`\`\`

## Blocs de code

Utilisez trois backticks avec le langage :

\`\`\`markdown
\\\`\\\`\\\`javascript
function hello() {
  console.log("Hello World!");
}
\\\`\\\`\\\`
\`\`\`

## Langages supportés

- javascript / js
- typescript / ts
- python
- java
- go
- rust
- bash / shell
- json
- yaml
- markdown
- html / css
- sql
- et bien d'autres...

## Mise en évidence de lignes

Certains renderers supportent la mise en évidence :

\`\`\`markdown
\\\`\\\`\\\`javascript {2-3}
const a = 1;
const b = 2; // highlighted
const c = 3; // highlighted
\\\`\\\`\\\`
\`\`\``
      },
      {
        id: "media",
        title: "Images et médias",
        content: `# Images et médias

## Ajouter une image

\`\`\`markdown
![Description](url-de-image.png)
\`\`\`

## Image avec taille (HTML)

\`\`\`html
<img src="image.png" width="300" />
\`\`\`

## Image centrée

\`\`\`html
<p align="center">
  <img src="logo.png" width="200" />
</p>
\`\`\`

## GIFs animés

Les GIFs fonctionnent comme les images :

\`\`\`markdown
![Demo](demo.gif)
\`\`\`

## Vidéos

GitHub ne supporte pas les vidéos intégrées, mais vous pouvez :

1. Utiliser un GIF à la place
2. Ajouter une image avec un lien vers la vidéo :

\`\`\`markdown
[![Vidéo](thumbnail.png)](https://youtube.com/watch?v=xxx)
\`\`\`

## Badges

\`\`\`markdown
![Version](https://img.shields.io/badge/version-1.0-blue)
\`\`\``
      }
    ]
  },
  {
    title: "Widgets GitHub",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    articles: [
      {
        id: "add-widgets",
        title: "Ajouter des widgets",
        content: `# Ajouter des widgets GitHub

## Qu'est-ce qu'un widget ?

Les widgets sont des éléments visuels dynamiques qui affichent des informations de votre profil GitHub.

## Comment ajouter un widget

1. Ouvrez le panneau **Widgets** dans l'éditeur
2. Parcourez les catégories :
   - Stats de profil
   - Langages utilisés
   - Contributions
   - Trophées
   - Streak
3. Cliquez sur un widget pour l'ajouter
4. Personnalisez-le si nécessaire

## Types de widgets disponibles

### Stats de profil
Affiche vos statistiques GitHub : commits, PRs, issues, etc.

### Langages
Graphique des langages les plus utilisés.

### Contributions
Calendrier de vos contributions.

### Streak
Votre série de contributions consécutives.

### Trophées
Badges et accomplissements GitHub.`
      },
      {
        id: "widget-themes",
        title: "Personnaliser les thèmes",
        content: `# Personnaliser les thèmes des widgets

## Thèmes disponibles

Les widgets supportent de nombreux thèmes :

- **default** : Thème clair standard
- **dark** : Thème sombre
- **radical** : Rose/violet néon
- **merko** : Vert menthe
- **gruvbox** : Palette rétro
- **tokyonight** : Bleu nuit
- **onedark** : Thème One Dark
- **cobalt** : Bleu cobalt
- **synthwave** : Style années 80
- **dracula** : Thème Dracula populaire

## Appliquer un thème

Dans l'éditeur, sélectionnez un widget puis :

1. Cliquez sur **Personnaliser**
2. Choisissez un thème dans la liste
3. Le widget se met à jour automatiquement

## Couleurs personnalisées

Vous pouvez aussi définir vos propres couleurs :

- Couleur de fond
- Couleur du texte
- Couleur des bordures
- Couleur d'accent`
      },
      {
        id: "stats",
        title: "Stats et contributions",
        content: `# Stats et contributions

## Widget de statistiques

Affiche un résumé de votre activité GitHub :

- Total des commits
- Pull Requests
- Issues
- Contributions
- Stars reçues

## Personnalisation

Options disponibles :
- \`show_icons\` : Afficher les icônes
- \`include_all_commits\` : Inclure tous les commits
- \`count_private\` : Compter les repos privés
- \`hide\` : Masquer certaines stats

## Widget de contributions

Le calendrier de contributions montre votre activité jour par jour.

Options :
- Période personnalisée
- Couleurs du thème
- Afficher/masquer les légendes

## Widget Streak

Affiche votre série de contributions :
- Streak actuel
- Plus longue série
- Total des contributions`
      },
      {
        id: "badges",
        title: "Badges et trophées",
        content: `# Badges et trophées

## Trophées GitHub

Les trophées récompensent vos accomplissements :

- **MultiLanguage** : Utilisation de plusieurs langages
- **Commits** : Nombre de commits
- **Stars** : Stars reçues
- **Followers** : Nombre d'abonnés
- **PullRequest** : PRs créées
- **Issues** : Issues ouvertes
- **Repositories** : Repos créés

## Niveaux de trophées

Chaque trophée a plusieurs niveaux :
- 🥉 Bronze
- 🥈 Argent
- 🥇 Or
- 💎 Platine
- 👑 Diamant

## Badges personnalisés

Créez vos propres badges avec shields.io :

\`\`\`markdown
![Badge](https://img.shields.io/badge/label-message-color)
\`\`\`

Exemples :
- Version : \`![](https://img.shields.io/badge/version-2.0-blue)\`
- Licence : \`![](https://img.shields.io/badge/license-MIT-green)\`
- Status : \`![](https://img.shields.io/badge/build-passing-brightgreen)\``
      }
    ]
  },
  {
    title: "Templates",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
    articles: [
      {
        id: "use-template",
        title: "Utiliser un template",
        content: `# Utiliser un template

## Accéder aux templates

1. Allez sur la page **Templates** (\`/templates\`)
2. Parcourez les catégories :
   - Startup
   - Open Source
   - API
   - Mobile
   - Web
   - Data Science

## Prévisualiser un template

Cliquez sur un template pour voir :
- Aperçu complet
- Structure du contenu
- Widgets inclus

## Utiliser un template

1. Cliquez sur **Utiliser ce template**
2. Le template s'ouvre dans l'éditeur
3. Remplacez les placeholders par votre contenu
4. Personnalisez selon vos besoins

## Templates gratuits vs Premium

**Gratuits** :
- Templates basiques
- Fonctionnalités limitées

**Premium** :
- Templates professionnels
- Widgets avancés
- Support prioritaire`
      },
      {
        id: "template-types",
        title: "Templates gratuits vs Premium",
        content: `# Templates gratuits vs Premium

## Templates gratuits

Inclus avec le plan gratuit :
- README basique
- Documentation simple
- Profil GitHub standard

Limitations :
- Pas de widgets avancés
- Personnalisation limitée
- Pas de support prioritaire

## Templates Premium

Inclus avec le plan Premium (5€ une fois) :

### Startup
Templates pour présenter votre startup :
- Landing page README
- Pitch deck format
- Product showcase

### Open Source
Pour vos projets open source :
- Documentation complète
- Contributing guide
- Code of conduct

### API
Pour documenter vos APIs :
- Endpoints documentation
- Authentication guide
- Examples & tutorials

### Mobile / Web
Pour vos applications :
- Screenshots gallery
- Feature highlights
- Installation guide

### Data Science
Pour vos projets ML/Data :
- Model documentation
- Dataset description
- Results visualization`
      },
      {
        id: "customize",
        title: "Personnaliser un template",
        content: `# Personnaliser un template

## Modifier le contenu

Après avoir chargé un template :

1. **Remplacez les placeholders**
   - \`[Nom du projet]\` → Votre nom de projet
   - \`[Description]\` → Votre description
   - \`[username]\` → Votre username GitHub

2. **Ajoutez vos sections**
   - Cliquez où vous voulez ajouter
   - Utilisez la barre d'outils

3. **Supprimez les sections inutiles**
   - Sélectionnez le contenu
   - Appuyez sur Suppr

## Modifier les widgets

1. Cliquez sur un widget
2. Ouvrez le panneau de personnalisation
3. Modifiez :
   - Username
   - Thème
   - Options d'affichage

## Changer les couleurs

Dans les templates HTML/badges :
- Modifiez les codes couleur
- Utilisez des couleurs de votre marque

## Sauvegarder vos modifications

- Auto-save toutes les 30 secondes
- \`Ctrl + S\` pour sauvegarder manuellement`
      },
      {
        id: "create-template",
        title: "Créer son propre template",
        content: `# Créer son propre template

## Partir d'un document existant

1. Créez votre README parfait
2. Remplacez les informations spécifiques par des placeholders :
   - \`{{PROJECT_NAME}}\`
   - \`{{DESCRIPTION}}\`
   - \`{{USERNAME}}\`

## Structure recommandée

Un bon template contient :

\`\`\`markdown
# {{PROJECT_NAME}}

{{BADGES}}

## Description
{{DESCRIPTION}}

## Installation
\\\`\\\`\\\`bash
npm install {{PACKAGE_NAME}}
\\\`\\\`\\\`

## Usage
{{USAGE_EXAMPLES}}

## Features
{{FEATURES_LIST}}

## Contributing
{{CONTRIBUTING_GUIDE}}

## License
{{LICENSE}}
\`\`\`

## Bonnes pratiques

- Utilisez des placeholders clairs
- Incluez des commentaires explicatifs
- Testez avec différents projets
- Gardez une structure flexible`
      }
    ]
  },
  {
    title: "Import & Export",
    icon: Download,
    color: "from-orange-500 to-amber-500",
    articles: [
      {
        id: "import-github",
        title: "Importer depuis GitHub",
        content: `# Importer depuis GitHub

## Prérequis

- Compte Premium ou Admin
- Connexion GitHub (OAuth ou Personal Access Token)

## Importer un README

1. Dans le dashboard, cliquez sur **Importer de GitHub**
2. Sélectionnez un repository
3. Choisissez le fichier Markdown à importer
4. Cliquez sur **Importer**

## Accès aux repos privés

Pour les repositories privés :

1. Allez dans **Paramètres** (\`/dashboard/settings\`)
2. Ajoutez un **Personal Access Token** GitHub
3. Le token doit avoir le scope \`repo\`

### Créer un PAT sur GitHub

1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Sélectionnez le scope \`repo\`
5. Copiez le token et sauvegardez-le dans MarkdownPro

## Fichiers supportés

- README.md
- Tout fichier .md dans le repository
- Documentation dans /docs`
      },
      {
        id: "export-md",
        title: "Exporter en Markdown",
        content: `# Exporter en Markdown

## Export simple

1. Cliquez sur le bouton **Export** ou \`Ctrl + Shift + E\`
2. Sélectionnez **Markdown (.md)**
3. Le fichier est téléchargé

## Copier le Markdown

Pour copier directement :

1. Cliquez sur **Copier en Markdown**
2. Le contenu est dans votre presse-papiers
3. Collez-le où vous voulez

## Format de sortie

Le Markdown exporté est :
- Compatible GitHub
- Formaté proprement
- Avec les widgets en format URL

## Widgets dans l'export

Les widgets sont convertis en :

\`\`\`markdown
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=xxx)
\`\`\`

Ces URLs fonctionnent directement sur GitHub.`
      },
      {
        id: "export-html-pdf",
        title: "Exporter en HTML/PDF",
        content: `# Exporter en HTML/PDF

## Export HTML

1. Cliquez sur **Export**
2. Sélectionnez **HTML**
3. Options disponibles :
   - Inclure les styles
   - Thème clair/sombre
   - Standalone (CSS intégré)

Le fichier HTML est autonome et peut être ouvert dans n'importe quel navigateur.

## Export PDF

1. Cliquez sur **Export**
2. Sélectionnez **PDF**
3. Options :
   - Format (A4, Letter)
   - Orientation
   - Marges

## Qualité d'export

Les exports conservent :
- Le formatage complet
- Les images (en base64 pour PDF)
- Les couleurs et styles
- La mise en page

## Utilisations

**HTML** :
- Documentation web
- Intégration dans un site
- Envoi par email

**PDF** :
- Documentation imprimable
- Archivage
- Partage professionnel`
      },
      {
        id: "copy-github",
        title: "Copier vers GitHub",
        content: `# Copier vers GitHub

## Méthode manuelle

1. Exportez en Markdown
2. Allez sur votre repo GitHub
3. Éditez le README.md
4. Collez le contenu
5. Commit

## Via le presse-papiers

1. Dans l'éditeur, cliquez sur **Copier**
2. Le Markdown est copié
3. Allez sur GitHub
4. Collez directement

## Bonnes pratiques

### Avant de publier

- Vérifiez tous les liens
- Testez les images
- Vérifiez les widgets (username correct)
- Relisez le contenu

### Après publication

- Vérifiez le rendu sur GitHub
- Testez sur mobile
- Vérifiez que les widgets s'affichent

## Commit message suggéré

\`\`\`
docs: Update README with MarkdownPro

- Added project description
- Added installation guide
- Added GitHub stats widgets
- Updated badges
\`\`\``
      }
    ]
  },
  {
    title: "Génération IA",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    articles: [
      {
        id: "ai-intro",
        title: "Comment fonctionne l'IA",
        content: `# Comment fonctionne l'IA

## Technologie

MarkdownPro utilise des modèles de langage avancés pour :
- Analyser votre code
- Comprendre votre projet
- Générer du contenu pertinent

## Ce que l'IA peut faire

- **Générer** un README complet à partir de votre code
- **Améliorer** un README existant
- **Suggérer** des sections manquantes
- **Reformuler** pour plus de clarté

## Limites

L'IA ne peut pas :
- Accéder à vos repos privés (sans token)
- Garantir une exactitude à 100%
- Remplacer une relecture humaine

## Confidentialité

- Votre code n'est pas stocké
- Les requêtes sont chiffrées
- Aucun partage avec des tiers`
      },
      {
        id: "generate",
        title: "Générer un README",
        content: `# Générer un README avec l'IA

## Étapes

1. **Ouvrir l'éditeur**
   Allez sur \`/editor\`

2. **Cliquer sur "Générer avec l'IA"**
   Bouton avec l'icône ✨

3. **Fournir le contexte**
   - URL du repository GitHub
   - Ou description du projet
   - Ou coller du code

4. **Lancer la génération**
   L'IA analyse et génère

5. **Réviser et éditer**
   Modifiez selon vos besoins

## Options de génération

- **Style** : Technique, Marketing, Minimaliste
- **Langue** : Français, English
- **Longueur** : Court, Moyen, Détaillé
- **Sections** : Choisir les sections à inclure

## Temps de génération

- README simple : ~10 secondes
- README complet : ~30 secondes
- Avec analyse de code : ~1 minute`
      },
      {
        id: "improve",
        title: "Améliorer un README existant",
        content: `# Améliorer un README existant

## Importer votre README

1. Copiez votre README actuel
2. Collez-le dans l'éditeur
3. Ou importez depuis GitHub

## Demander des améliorations

Cliquez sur **"Améliorer avec l'IA"** et choisissez :

### Amélioration du contenu
- Rendre plus clair
- Ajouter des détails
- Corriger le style

### Ajout de sections
- Installation
- Configuration
- FAQ
- Contributing

### Optimisation SEO
- Meilleurs titres
- Mots-clés pertinents
- Structure optimisée

## Comparer les versions

L'éditeur vous montre :
- Version originale
- Version améliorée
- Différences en surbrillance

Acceptez ou rejetez chaque modification.`
      },
      {
        id: "ai-tips",
        title: "Bonnes pratiques IA",
        content: `# Bonnes pratiques avec l'IA

## Fournir un bon contexte

Plus vous donnez d'informations, meilleur sera le résultat :

- Description claire du projet
- Technologies utilisées
- Public cible
- Fonctionnalités principales

## Itérer

Ne vous arrêtez pas à la première génération :

1. Générez une première version
2. Identifiez ce qui manque
3. Demandez des modifications spécifiques
4. Répétez jusqu'à satisfaction

## Toujours relire

L'IA peut faire des erreurs :
- Vérifiez les faits
- Corrigez les inexactitudes
- Adaptez le ton
- Personnalisez

## Ce qu'il faut éviter

- Publier sans relire
- Accepter aveuglément
- Ignorer les erreurs factuelles
- Oublier de personnaliser

## Exemple de prompt efficace

> "Génère un README pour mon API REST en Node.js/Express.
> L'API gère des utilisateurs et des produits.
> Public cible : développeurs backend.
> Style : technique et concis.
> Inclure : installation, endpoints, exemples cURL."`
      }
    ]
  }
]

export default function DocsPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0)

  const copyContent = () => {
    if (selectedArticle) {
      navigator.clipboard.writeText(selectedArticle.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-teal w-[500px] h-[500px] -top-40 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Apprenez à utiliser{" "}
              <span className="text-gradient">MarkdownPro</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Guides, tutoriels et références pour maîtriser toutes les fonctionnalités.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher dans la documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Docs Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSections.map((section, index) => (
              <div key={index} className="card-bento group">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-2">
                  {section.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-center gap-2 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-all group/link w-full text-left"
                      >
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        <span>{article.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Notre équipe de support est là pour vous aider.
            </p>
            <Link href="/support" className="btn-primary inline-flex">
              Contacter le support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)]">
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyContent}
                    className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    title="Copier le contenu"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="prose prose-invert prose-teal max-w-none">
                  <MarkdownContent content={selectedArticle.content} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Simple Markdown renderer component
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactElement[] = []
  let inCodeBlock = false
  let codeContent = ''
  let codeLanguage = ''
  let inTable = false
  let tableRows: string[][] = []

  const processInlineMarkdown = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--color-surface-elevated)] text-[var(--color-primary)] text-sm">$1</code>')
    // Links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[var(--color-primary)] hover:underline">$1</a>')

    return text
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const key = `line-${i}`

    // Code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
        codeContent = ''
      } else {
        inCodeBlock = false
        elements.push(
          <pre key={key} className="p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] overflow-x-auto my-4">
            <code className="text-sm text-[var(--color-text-secondary)]">{codeContent}</code>
          </pre>
        )
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line
      continue
    }

    // Tables
    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true
        tableRows = []
      }
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
      if (!cells.every(c => c.match(/^[-:]+$/))) {
        tableRows.push(cells)
      }
      continue
    } else if (inTable) {
      inTable = false
      elements.push(
        <div key={key} className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-dark)]">
                {tableRows[0]?.map((cell, j) => (
                  <th key={j} className="p-3 text-left text-[var(--color-text-primary)] font-semibold">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, j) => (
                <tr key={j} className="border-b border-[var(--color-border-dark)]">
                  {row.map((cell, k) => (
                    <td key={k} className="p-3 text-[var(--color-text-secondary)]" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key} className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 mt-6">{line.slice(2)}</h1>)
      continue
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key} className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3 mt-6">{line.slice(3)}</h2>)
      continue
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key} className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 mt-4">{line.slice(4)}</h3>)
      continue
    }

    // Lists
    if (line.startsWith('- ')) {
      elements.push(
        <li key={key} className="text-[var(--color-text-secondary)] ml-4 list-disc" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(2)) }} />
      )
      continue
    }
    if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={key} className="text-[var(--color-text-secondary)] ml-4 list-decimal" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.replace(/^\d+\. /, '')) }} />
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={key} className="h-4" />)
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={key} className="text-[var(--color-text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
    )
  }

  // Handle unclosed table
  if (inTable && tableRows.length > 0) {
    elements.push(
      <div key="table-end" className="overflow-x-auto my-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border-dark)]">
              {tableRows[0]?.map((cell, j) => (
                <th key={j} className="p-3 text-left text-[var(--color-text-primary)] font-semibold">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(1).map((row, j) => (
              <tr key={j} className="border-b border-[var(--color-border-dark)]">
                {row.map((cell, k) => (
                  <td key={k} className="p-3 text-[var(--color-text-secondary)]" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <>{elements}</>
}
