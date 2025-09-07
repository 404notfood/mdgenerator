import { PrismaClient, TemplateCategory } from '@prisma/client'

const prisma = new PrismaClient()

const templates = [
  {
    name: "Startup MVP",
    description: "Template complet pour présenter votre MVP startup avec sections essentielles",
    category: TemplateCategory.STARTUP,
    price: 0,
    isPremium: false,
    content: `# 🚀 Nom de votre Startup

> Slogan accrocheur en une ligne qui résume votre mission

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org/)

## 🎯 Vision

Une phrase claire qui décrit la vision de votre startup et l'impact que vous voulez avoir.

## ✨ Fonctionnalités

- ✅ **Fonctionnalité 1** - Description courte et percutante
- ✅ **Fonctionnalité 2** - Ce qui rend votre produit unique
- ⏳ **Fonctionnalité 3** - En développement
- 📋 **Fonctionnalité 4** - Prévue pour le futur

## 🎨 Captures d'écran

*Ajoutez ici des captures d'écran de votre application*

## 🚀 Démarrage rapide

\`\`\`bash
# Cloner le repository
git clone https://github.com/votre-username/votre-repo.git

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
\`\`\`

## 📊 Métriques

- 👥 **Utilisateurs actifs** : X utilisateurs
- 🚀 **Croissance** : +X% ce mois
- ⭐ **Satisfaction** : X/5 étoiles

## 🛣️ Roadmap

- [x] ✅ Phase 1 : MVP
- [ ] 📱 Phase 2 : Application mobile
- [ ] 🤖 Phase 3 : IA intégrée
- [ ] 🌍 Phase 4 : Expansion internationale

## 🤝 Rejoignez-nous

Nous cherchons des **investisseurs**, **cofondateurs** et **premiers utilisateurs** !

📧 **Contact** : contact@votrestartup.com
🌐 **Site web** : https://votrestartup.com
📱 **Twitter** : [@VotreStartup](https://twitter.com/VotreStartup)

---

*Fait avec ❤️ par [Votre équipe]*`,
    htmlPreview: `<h1>🚀 Nom de votre Startup</h1><p>Template complet pour MVP startup...</p>`
  },
  
  {
    name: "Open Source Pro",
    description: "Template professionnel pour projets open source avec badges, documentation complète",
    category: TemplateCategory.OPEN_SOURCE,
    price: 990, // 9.90€
    isPremium: true,
    content: `# Project Name

[![Stars](https://img.shields.io/github/stars/username/repo?style=social)](https://github.com/username/repo)
[![Forks](https://img.shields.io/github/forks/username/repo?style=social)](https://github.com/username/repo)
[![Issues](https://img.shields.io/github/issues/username/repo)](https://github.com/username/repo/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/username/repo/workflows/CI/badge.svg)](https://github.com/username/repo/actions)

> A modern, performant and accessible component library built with TypeScript and Tailwind CSS.

## ✨ Features

- 🚀 **Modern Stack** - Built with the latest technologies
- 📦 **Tree Shakeable** - Import only what you need
- 🎨 **Customizable** - Full control over styling
- ♿ **Accessible** - WCAG 2.1 compliant
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Built-in dark theme support

## 📚 Documentation

Visit our [documentation site](https://yourproject.dev) for detailed guides and API reference.

## 🚀 Quick Start

\`\`\`bash
npm install your-library
\`\`\`

\`\`\`tsx
import { Button } from 'your-library'

function App() {
  return <Button variant="primary">Hello World</Button>
}
\`\`\`

## 🛠️ Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
\`\`\`

## 🤝 Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible. Please see our [Contributing Guide](CONTRIBUTING.md).

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
    htmlPreview: `<h1>Project Name</h1><p>Template professionnel pour projets open source...</p>`
  },

  {
    name: "API Documentation",
    description: "Documentation complète pour APIs REST/GraphQL avec exemples de code",
    category: TemplateCategory.API,
    price: 590, // 5.90€
    isPremium: true,
    content: `# API Documentation

[![API Status](https://img.shields.io/badge/API-Live-green.svg)](https://api.yourservice.com)
[![Version](https://img.shields.io/badge/version-v2.1-blue.svg)](https://api.yourservice.com/v2)
[![Uptime](https://img.shields.io/uptimerobot/ratio/m123456789-abcdef1234567890)](https://status.yourservice.com)

> Comprehensive REST API for modern applications with real-time features and extensive customization options.

## 🌐 Base URL

\`\`\`
https://api.yourservice.com/v2
\`\`\`

## 🔐 Authentication

All API requests require authentication using API keys:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.yourservice.com/v2/endpoint
\`\`\`

## 📋 Endpoints

### Users

#### Get User Profile
\`\`\`http
GET /users/{id}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Update User
\`\`\`http
PUT /users/{id}
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
\`\`\`

### Projects

#### List Projects
\`\`\`http
GET /projects?limit=10&offset=0
\`\`\`

#### Create Project
\`\`\`http
POST /projects
Content-Type: application/json

{
  "name": "My Project",
  "description": "A cool project",
  "tags": ["web", "api"]
}
\`\`\`

## 📊 Rate Limits

| Plan | Requests per minute |
|------|-------------------|
| Free | 100 |
| Pro  | 1,000 |
| Enterprise | 10,000 |

## ⚡ WebSocket API

Connect to real-time events:

\`\`\`javascript
const ws = new WebSocket('wss://api.yourservice.com/v2/ws')

ws.on('message', (data) => {
  console.log('Real-time update:', JSON.parse(data))
})
\`\`\`

## 🚨 Error Handling

The API uses conventional HTTP response codes:

- \`200\` - Success
- \`400\` - Bad Request
- \`401\` - Unauthorized  
- \`404\` - Not Found
- \`500\` - Internal Server Error

Error response format:
\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters"
  }
}
\`\`\`

## 📱 SDKs

Official SDKs available for:
- JavaScript/Node.js
- Python  
- PHP
- Go
- Ruby

## 🔧 Postman Collection

[Download Postman Collection](https://api.yourservice.com/postman)

## 📞 Support

- 📧 Email: api-support@yourservice.com
- 💬 Discord: [Join our server](https://discord.gg/yourserver)
- 📖 Knowledge Base: [help.yourservice.com](https://help.yourservice.com)`,
    htmlPreview: `<h1>API Documentation</h1><p>Documentation complète pour APIs REST/GraphQL...</p>`
  },

  {
    name: "Mobile App",
    description: "Template pour applications mobiles iOS/Android avec stores badges",
    category: TemplateCategory.MOBILE,
    price: 790, // 7.90€
    isPremium: true,
    content: `# 📱 App Name

> Your app tagline that captures its essence in one compelling sentence

<p align="center">
  <img src="app-icon.png" width="100" height="100" alt="App Icon">
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Download_on_the-App_Store-black?style=for-the-badge&logo=apple&logoColor=white" alt="App Store"></a>
  <a href="#"><img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" alt="Google Play"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Version-2.1.0-green?style=flat-square">
  <img src="https://img.shields.io/badge/Downloads-100K+-orange?style=flat-square">
</p>

## ✨ Key Features

- 🔥 **Feature One** - Revolutionary capability that sets you apart
- 🚀 **Feature Two** - Lightning-fast performance and smooth UX  
- 🎨 **Feature Three** - Beautiful, intuitive design
- 🔒 **Feature Four** - Bank-level security and privacy
- ☁️ **Feature Five** - Seamless cloud sync across devices
- 📊 **Feature Six** - Advanced analytics and insights

## 📱 Screenshots

<p align="center">
  <img src="screenshot1.png" width="200" alt="Home Screen">
  <img src="screenshot2.png" width="200" alt="Feature Screen">  
  <img src="screenshot3.png" width="200" alt="Settings Screen">
</p>

## 🛠️ Built With

- **Frontend**: React Native / Flutter / Swift / Kotlin
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Redis
- **Cloud**: AWS / Firebase
- **Analytics**: Mixpanel + Crashlytics

## 🎯 Target Audience

Perfect for users who want to:
- ✅ Solve specific problem X
- ✅ Achieve goal Y efficiently  
- ✅ Streamline workflow Z
- ✅ Connect with like-minded people

## 📊 App Stats

| Metric | Value |
|--------|--------|
| 📥 Total Downloads | 100,000+ |
| ⭐ Average Rating | 4.8/5 |
| 🌍 Countries Available | 50+ |
| 👥 Monthly Active Users | 25,000+ |

## 🚀 What's New in v2.1.0

- 🆕 Dark mode support
- ⚡ 40% faster app launch
- 🔧 Bug fixes and improvements
- 🌐 New language support (Spanish, French)

## 💬 User Reviews

> "This app has completely transformed how I manage my daily tasks. Couldn't live without it!"  
> — Sarah K., ⭐⭐⭐⭐⭐

> "Simple, elegant, and incredibly powerful. Exactly what I was looking for."  
> — Mike R., ⭐⭐⭐⭐⭐

## 🔒 Privacy & Security

Your privacy matters to us:
- 🔐 End-to-end encryption
- 🚫 No ads or tracking
- 📍 Location data stays on device
- 🗑️ Easy data deletion

## 📞 Support & Feedback

We'd love to hear from you!

- 📧 **Email**: support@yourapp.com
- 💬 **Chat**: In-app support available 24/7
- 🐦 **Twitter**: [@YourApp](https://twitter.com/YourApp)
- 📝 **Feedback**: Rate us in the app stores

## 🔮 Coming Soon

- 🤖 AI-powered recommendations
- 👥 Team collaboration features
- 🔗 Third-party integrations
- 📈 Advanced reporting

---

<p align="center">
  Made with ❤️ by the YourApp Team
</p>`,
    htmlPreview: `<h1>📱 App Name</h1><p>Template pour applications mobiles...</p>`
  },

  {
    name: "Web Application",
    description: "Template moderne pour applications web avec tech stack et déployment",
    category: TemplateCategory.WEB,
    price: 0,
    isPremium: false,
    content: `# 🌐 Web App Name

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://yourapp.com)
[![GitHub](https://img.shields.io/github/stars/username/repo?style=social)](https://github.com/username/repo)

> Modern web application built with the latest technologies for optimal performance and user experience.

## 🚀 Live Demo

Check out the live application: **[yourapp.com](https://yourapp.com)**

## ✨ Features

- ⚡ **Lightning Fast** - Sub-second page loads
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI/UX** - Clean and intuitive design
- 🔐 **Secure** - Authentication and authorization
- 🌙 **Dark Mode** - Toggle between themes
- 📊 **Analytics** - Built-in usage tracking

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Framer Motion

**Backend:**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- Redis (caching)

**DevOps:**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Vercel (Frontend)
- Railway (Backend)

## 📦 Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/username/webapp.git
cd webapp
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your configuration
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Environment Variables

\`\`\`bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── app/                # Next.js App Router
├── components/         # Reusable UI components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── types/             # TypeScript definitions
└── styles/            # Global styles
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Docker

\`\`\`bash
docker build -t webapp .
docker run -p 3000:3000 webapp
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
\`\`\`

## 📈 Performance

- **Lighthouse Score**: 100/100
- **Core Web Vitals**: All green
- **Bundle Size**: < 200KB gzipped
- **Time to Interactive**: < 1.2s

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@username](https://github.com/username)
- Twitter: [@username](https://twitter.com/username)
- LinkedIn: [Your Name](https://linkedin.com/in/username)

---

If you found this project helpful, please give it a ⭐!`,
    htmlPreview: `<h1>🌐 Web App Name</h1><p>Template moderne pour applications web...</p>`
  },

  {
    name: "Data Science Project",
    description: "Template complet pour projets de data science avec notebooks et résultats",
    category: TemplateCategory.DATA_SCIENCE,
    price: 1290, // 12.90€
    isPremium: true,
    content: `# 📊 Data Science Project: [Project Title]

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)](https://jupyter.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Comprehensive analysis of [dataset name] to predict/classify/understand [specific goal] using machine learning techniques.

## 🎯 Project Overview

### Problem Statement
Clear description of the business problem or research question you're trying to solve.

### Objectives
- 📈 **Primary Goal**: Main objective of the analysis
- 🔍 **Secondary Goals**: Additional insights to discover
- 📊 **Success Metrics**: How you'll measure success

## 📁 Project Structure

\`\`\`
├── data/
│   ├── raw/                 # Original, immutable data
│   ├── interim/            # Intermediate data that has been transformed
│   ├── processed/          # The final, canonical data sets for modeling
│   └── external/           # Data from third party sources
├── notebooks/
│   ├── 01-data-exploration.ipynb
│   ├── 02-data-cleaning.ipynb
│   ├── 03-feature-engineering.ipynb
│   ├── 04-modeling.ipynb
│   └── 05-results-analysis.ipynb
├── src/
│   ├── data/               # Scripts to download or generate data
│   ├── features/           # Scripts to turn raw data into features
│   ├── models/             # Scripts to train models and make predictions
│   └── visualization/      # Scripts to create visualizations
├── models/                 # Trained and serialized models
├── reports/               # Generated analysis as HTML, PDF, LaTeX
└── requirements.txt       # Dependencies
\`\`\`

## 📊 Dataset Information

| **Attribute** | **Description** |
|---------------|-----------------|
| **Source** | [Dataset source/link] |
| **Size** | X rows, Y columns |
| **Time Period** | MM/YYYY - MM/YYYY |
| **Target Variable** | Variable name (type) |

### Key Features
- **Feature 1** (\`dtype\`): Description
- **Feature 2** (\`dtype\`): Description  
- **Feature 3** (\`dtype\`): Description

## 🔍 Exploratory Data Analysis

### Key Insights
- 📈 **Finding 1**: Statistical insight with supporting evidence
- 🔗 **Finding 2**: Correlation or relationship discovered
- 📊 **Finding 3**: Distribution or pattern identified

### Data Quality Issues
- ❌ **Missing Values**: X% in columns A, B, C
- ⚠️ **Outliers**: Detected in feature Y using IQR method
- 🔧 **Data Types**: Converted categorical features to numeric

## 🤖 Machine Learning Pipeline

### Models Implemented
1. **Baseline Model**: Simple heuristic/linear model
2. **Model 2**: Random Forest / Gradient Boosting
3. **Model 3**: Neural Network / Advanced model

### Feature Engineering
- ✅ **Scaling**: StandardScaler for numerical features
- ✅ **Encoding**: One-hot encoding for categorical variables
- ✅ **Selection**: Used SelectKBest/RFE for feature selection
- ✅ **Creation**: Generated interaction/polynomial features

### Model Performance

| **Model** | **Accuracy** | **Precision** | **Recall** | **F1-Score** |
|-----------|--------------|---------------|------------|--------------|
| Baseline | 0.XX | 0.XX | 0.XX | 0.XX |
| Random Forest | 0.XX | 0.XX | 0.XX | 0.XX |
| Neural Network | **0.XX** | **0.XX** | **0.XX** | **0.XX** |

## 📈 Results & Insights

### Key Findings
1. **Most Important Features**: List top 5 features affecting predictions
2. **Model Performance**: Best model achieved XX% accuracy
3. **Business Impact**: Quantified impact (e.g., potential cost savings)

### Visualizations
![Feature Importance](images/feature_importance.png)
![Confusion Matrix](images/confusion_matrix.png)
![ROC Curve](images/roc_curve.png)

## 🚀 Quick Start

### Prerequisites
\`\`\`bash
Python 3.8+
Jupyter Notebook
Git
\`\`\`

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/username/data-science-project.git
cd data-science-project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Start Jupyter Notebook
jupyter notebook
\`\`\`

### Running the Analysis
1. **Data Exploration**: Open \`notebooks/01-data-exploration.ipynb\`
2. **Data Cleaning**: Run \`notebooks/02-data-cleaning.ipynb\`
3. **Feature Engineering**: Execute \`notebooks/03-feature-engineering.ipynb\`
4. **Modeling**: Train models with \`notebooks/04-modeling.ipynb\`
5. **Results**: Analyze results in \`notebooks/05-results-analysis.ipynb\`

## 📦 Dependencies

**Core Libraries:**
- pandas >= 1.3.0
- numpy >= 1.21.0
- scikit-learn >= 1.0.0
- matplotlib >= 3.4.0
- seaborn >= 0.11.0

**Machine Learning:**
- xgboost >= 1.5.0
- lightgbm >= 3.3.0
- tensorflow >= 2.8.0 (if using deep learning)

See [requirements.txt](requirements.txt) for complete list.

## 🔮 Future Work

- [ ] **Model Improvement**: Try ensemble methods
- [ ] **Feature Engineering**: Create more domain-specific features
- [ ] **Deployment**: Create API endpoint for real-time predictions
- [ ] **Monitoring**: Set up model performance monitoring
- [ ] **A/B Testing**: Design experiments to validate model impact

## 📚 References

1. [Research Paper 1](link) - Key methodology reference
2. [Documentation](link) - Tool/library documentation
3. [Dataset Source](link) - Original data source

## 👨‍💻 Author

**Your Name**
- GitHub: [@username](https://github.com/username)
- LinkedIn: [Your Name](https://linkedin.com/in/username)
- Email: your.email@example.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **Star this repo** if you found it helpful!`,
    htmlPreview: `<h1>📊 Data Science Project</h1><p>Template complet pour projets de data science...</p>`
  }
]

async function seedTemplates() {
  console.log('🌱 Seeding templates...')

  for (const template of templates) {
    try {
      // Vérifier si le template existe déjà
      const existingTemplate = await prisma.template.findFirst({
        where: { name: template.name }
      })

      if (existingTemplate) {
        // Mettre à jour le template existant
        await prisma.template.update({
          where: { id: existingTemplate.id },
          data: template
        })
        console.log(`🔄 Updated template: ${template.name}`)
      } else {
        // Créer un nouveau template
        await prisma.template.create({
          data: template
        })
        console.log(`✅ Created template: ${template.name}`)
      }
    } catch (error) {
      console.error(`❌ Error creating template ${template.name}:`, error)
    }
  }

  console.log('🎉 Template seeding completed!')
}

seedTemplates()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })