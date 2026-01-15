import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MarkdownPro - Créez des README professionnels",
    template: "%s | MarkdownPro",
  },
  description: "L'éditeur Markdown le plus puissant avec génération IA, widgets GitHub, templates premium et export professionnel.",
  keywords: ["markdown", "readme", "github", "editor", "documentation", "ai", "generator"],
  authors: [{ name: "MarkdownPro" }],
  creator: "MarkdownPro",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "MarkdownPro",
    title: "MarkdownPro - Créez des README professionnels",
    description: "L'éditeur Markdown le plus puissant avec génération IA, widgets GitHub et templates premium.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarkdownPro - Créez des README professionnels",
    description: "L'éditeur Markdown le plus puissant avec génération IA, widgets GitHub et templates premium.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
