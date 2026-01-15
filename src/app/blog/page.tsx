"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  User
} from "lucide-react"

const posts = [
  {
    title: "Comment créer un README parfait pour votre projet open source",
    excerpt: "Un bon README est essentiel pour attirer des contributeurs. Découvrez les meilleures pratiques et les sections indispensables.",
    date: "15 Janvier 2025",
    readTime: "8 min",
    author: "Marie Dupont",
    category: "Tutoriel",
    image: "from-teal-500 to-cyan-500"
  },
  {
    title: "Les widgets GitHub : boostez vos profils et README",
    excerpt: "Apprenez à utiliser les widgets GitHub Stats, Streak et Trophées pour rendre vos README plus attractifs.",
    date: "10 Janvier 2025",
    readTime: "5 min",
    author: "Thomas Martin",
    category: "Guide",
    image: "from-purple-500 to-pink-500"
  },
  {
    title: "Génération IA : le futur de la documentation",
    excerpt: "Comment l'intelligence artificielle révolutionne la création de documentation technique.",
    date: "5 Janvier 2025",
    readTime: "6 min",
    author: "Sophie Bernard",
    category: "Innovation",
    image: "from-orange-500 to-amber-500"
  },
  {
    title: "10 templates README pour inspirer vos projets",
    excerpt: "Une sélection des meilleurs templates pour startups, API, applications mobiles et projets data science.",
    date: "28 Décembre 2024",
    readTime: "10 min",
    author: "Pierre Leroy",
    category: "Ressources",
    image: "from-green-500 to-emerald-500"
  },
  {
    title: "Markdown avancé : astuces méconnues",
    excerpt: "Découvrez des fonctionnalités Markdown peu connues pour enrichir vos documents.",
    date: "20 Décembre 2024",
    readTime: "7 min",
    author: "Marie Dupont",
    category: "Tutoriel",
    image: "from-blue-500 to-indigo-500"
  },
  {
    title: "Pourquoi la documentation est cruciale pour votre startup",
    excerpt: "Une bonne documentation peut faire la différence entre le succès et l'échec de votre produit.",
    date: "15 Décembre 2024",
    readTime: "4 min",
    author: "Thomas Martin",
    category: "Business",
    image: "from-pink-500 to-rose-500"
  }
]

const categories = ["Tous", "Tutoriel", "Guide", "Innovation", "Ressources", "Business"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Actualités et{" "}
              <span className="text-gradient">tutoriels</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)]">
              Conseils, guides et bonnes pratiques pour créer une documentation exceptionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-[var(--color-border-dark)]">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-[var(--color-bg-dark)]"
                    : "bg-[var(--color-surface-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border-dark)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="card-bento group hover:border-[var(--color-primary-dark)] transition-all cursor-pointer"
              >
                {/* Image placeholder */}
                <div className={`h-40 rounded-xl bg-gradient-to-br ${post.image} mb-6 flex items-center justify-center`}>
                  <BookOpen className="w-12 h-12 text-white/50" />
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[var(--color-primary)]" />
                  <span className="text-sm text-[var(--color-primary)]">{post.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[var(--color-text-muted)] mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date.split(" ")[0]} {post.date.split(" ")[1]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Restez informé
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Recevez nos derniers articles et conseils directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
              <button className="btn-primary">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
