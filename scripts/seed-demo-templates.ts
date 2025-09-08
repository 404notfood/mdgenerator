import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const demoTemplates = [
  {
    name: "Projet Web Basique",
    description: "Template simple pour un projet web avec HTML, CSS et JavaScript",
    category: "WEB" as const,
    price: 0,
    isPremium: false,
    content: `# Mon Projet Web

Une description courte de votre projet web.

## 🚀 Fonctionnalités

- Interface utilisateur moderne
- Responsive design
- JavaScript vanilla
- CSS3 avancé

## 📦 Installation

\`\`\`bash
git clone https://github.com/username/project.git
cd project
npm install
\`\`\`

## 🔧 Utilisation

Ouvrez \`index.html\` dans votre navigateur.

## 📝 Licence

MIT`,
    htmlPreview: `<h1>Mon Projet Web</h1><p>Une description courte de votre projet web.</p><h2>🚀 Fonctionnalités</h2><ul><li>Interface utilisateur moderne</li><li>Responsive design</li><li>JavaScript vanilla</li><li>CSS3 avancé</li></ul>`
  },
  {
    name: "API REST Professionnelle",
    description: "Template complet pour documenter une API REST avec exemples",
    category: "API" as const,
    price: 500, // 5€
    isPremium: true,
    content: `# 🚀 API REST Professionnelle

API moderne avec authentication JWT et documentation complète.

![API Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)

## 📋 Sommaire

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Exemples](#exemples)

## 🛠️ Installation

\`\`\`bash
git clone https://github.com/username/api.git
cd api
npm install
cp .env.example .env
npm run dev
\`\`\`

## ⚙️ Configuration

Variables d'environnement requises :

\`\`\`env
PORT=3000
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/db
\`\`\`

## 🔗 Endpoints

### Authentication

\`POST /api/auth/login\`
\`POST /api/auth/register\`
\`POST /api/auth/refresh\`

### Users

\`GET /api/users\`
\`GET /api/users/:id\`
\`PUT /api/users/:id\`
\`DELETE /api/users/:id\`

## 🔐 Authentication

Utilisez JWT Bearer Token :

\`\`\`http
Authorization: Bearer your-jwt-token
\`\`\`

## 💡 Exemples

### Login
\`\`\`javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
\`\`\`

## 📄 Licence

MIT © [Votre Nom]`,
    htmlPreview: `<h1>🚀 API REST Professionnelle</h1><p>API moderne avec authentication JWT et documentation complète.</p>`
  },
  {
    name: "Startup MVP",
    description: "Template attractif pour présenter votre startup et MVP",
    category: "STARTUP" as const,
    price: 500, // 5€
    isPremium: true,
    content: `# 💡 Startup Name

*Révolutionnez votre industrie avec notre solution innovante*

![Startup](https://img.shields.io/badge/Stage-MVP-orange?style=for-the-badge)
![Funding](https://img.shields.io/badge/Funding-Seed-blue?style=for-the-badge)

## 🎯 Vision

Nous transformons la façon dont les entreprises [votre domaine] en offrant une solution [description courte].

## ⭐ Pourquoi Nous ?

- **🚀 Innovation** : Technologie de pointe
- **💰 ROI** : Réduction des coûts de 40%
- **⚡ Performance** : 10x plus rapide que la concurrence
- **🔒 Sécurité** : Chiffrement de niveau bancaire

## 🛠️ Notre Solution

### Pour les Entreprises
- Dashboard analytique en temps réel
- API complète et documentation
- Support 24/7

### Pour les Développeurs
- SDK dans 5+ langages
- Webhooks et callbacks
- Sandbox de test gratuit

## 📊 Métriques

| Métrique | Valeur |
|----------|--------|
| Utilisateurs actifs | 10,000+ |
| Croissance mensuelle | +25% |
| Temps de disponibilité | 99.9% |
| Satisfaction client | 4.8/5 |

## 👥 Équipe

- **CEO** : [Nom] - Ex-Google, 10 ans d'expérience
- **CTO** : [Nom] - Ex-Facebook, Expert IA
- **CMO** : [Nom] - Ex-Tesla, Growth Hacking

## 🚀 Roadmap

- **Q1 2024** : MVP Launch
- **Q2 2024** : Mobile App
- **Q3 2024** : Série A
- **Q4 2024** : Expansion Europe

## 💼 Investisseurs

Nous recherchons des investisseurs pour notre **Série A de 2M€**.

[**📧 Contactez-nous**](mailto:contact@startup.com) | [**📱 Demo**](https://demo.startup.com)

---
*© 2024 Startup Name. Tous droits réservés.*`,
    htmlPreview: `<h1>💡 Startup Name</h1><p><em>Révolutionnez votre industrie avec notre solution innovante</em></p>`
  },
  {
    name: "Open Source Standard",
    description: "Template classique pour projets open source avec toutes les sections essentielles",
    category: "OPEN_SOURCE" as const,
    price: 0,
    isPremium: false,
    content: `# Nom du Projet

Description courte de votre projet open source.

## Installation

\`\`\`bash
npm install nom-du-projet
\`\`\`

## Utilisation

\`\`\`javascript
const projet = require('nom-du-projet');
projet.faire();
\`\`\`

## Contribuer

1. Fork le projet
2. Créez votre branche (\`git checkout -b feature/AmazingFeature\`)
3. Commit vos changements (\`git commit -m 'Add AmazingFeature'\`)
4. Push vers la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrez une Pull Request

## Licence

MIT`,
    htmlPreview: `<h1>Nom du Projet</h1><p>Description courte de votre projet open source.</p>`
  }
]

async function main() {
  console.log('🌱 Création des templates de démonstration...')

  for (const template of demoTemplates) {
    const existing = await prisma.template.findFirst({
      where: { name: template.name }
    })

    if (!existing) {
      await prisma.template.create({
        data: template
      })
      console.log(`✅ Template créé: ${template.name}`)
    } else {
      console.log(`⏭️  Template existant: ${template.name}`)
    }
  }

  console.log('🎉 Templates de démonstration créés avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })