'use client'

import { useState } from 'react'
import { TipTapEditor } from '@/components/editor/tiptap-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [content, setContent] = useState("<h1>Mon Super Projet</h1><p>Commencez à écrire votre README ici...</p>")
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          README Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Créez des README professionnels avec notre éditeur Markdown WYSIWYG. 
          Commencez gratuitement ou explorez nos templates premium.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Éditeur Markdown</CardTitle>
            <CardDescription>
              Commencez à écrire votre README avec notre éditeur intuitif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TipTapEditor
              content={content}
              onChange={setContent}
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>
              Voici comment votre README apparaîtra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[500px] border prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none">
              <style jsx>{`
                .prose h1 {
                  font-size: 2.25rem;
                  font-weight: bold;
                  margin: 2rem 0 1rem 0;
                  line-height: 1.2;
                  color: #1f2937;
                  border-bottom: 2px solid #e5e7eb;
                  padding-bottom: 0.5rem;
                }
                .prose h2 {
                  font-size: 1.875rem;
                  font-weight: bold;
                  margin: 1.5rem 0 0.75rem 0;
                  line-height: 1.3;
                  color: #374151;
                  border-bottom: 1px solid #e5e7eb;
                  padding-bottom: 0.25rem;
                }
                .prose h3 {
                  font-size: 1.5rem;
                  font-weight: bold;
                  margin: 1.25rem 0 0.5rem 0;
                  line-height: 1.4;
                  color: #4b5563;
                }
                .prose h4 {
                  font-size: 1.25rem;
                  font-weight: bold;
                  margin: 1rem 0 0.5rem 0;
                  line-height: 1.5;
                }
                .prose h5 {
                  font-size: 1.125rem;
                  font-weight: bold;
                  margin: 0.75rem 0 0.25rem 0;
                  line-height: 1.5;
                }
                .prose h6 {
                  font-size: 1rem;
                  font-weight: bold;
                  margin: 0.5rem 0 0.25rem 0;
                  line-height: 1.6;
                }
                .prose ul {
                  list-style-type: disc;
                  list-style-position: inside;
                  margin-left: 1rem;
                }
                .prose ol {
                  list-style-type: decimal;
                  list-style-position: inside;
                  margin-left: 1rem;
                }
                .prose li {
                  margin-bottom: 0.25rem;
                }
                .prose img {
                  border-radius: 0.5rem;
                  max-width: 100%;
                  height: auto;
                }
                .prose [style*="text-align: center"] {
                  text-align: center;
                }
                .prose [style*="text-align: right"] {
                  text-align: right;
                }
                .prose [style*="text-align: justify"] {
                  text-align: justify;
                }
                .prose hr {
                  border: none;
                  border-top: 2px solid #d1d5db;
                  margin: 2rem 0;
                }
                .prose table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 1rem 0;
                  font-size: 0.875rem;
                }
                .prose th, .prose td {
                  border: 1px solid #d1d5db;
                  padding: 8px 12px;
                  text-align: left;
                }
                .prose th {
                  background-color: #f3f4f6;
                  font-weight: bold;
                }
                .prose span[style*="color"] {
                  /* Préserver les couleurs inline */
                }
                .prose span[style*="background-color"] {
                  /* Préserver le surlignage */
                  padding: 2px 4px;
                  border-radius: 3px;
                }
                .prose p {
                  margin: 0.75rem 0;
                  line-height: 1.6;
                }
                .prose img {
                  border-radius: 0.5rem;
                  max-width: 100%;
                  height: auto;
                  cursor: pointer;
                }
                .prose img[style*="margin: 0 auto"] {
                  display: block;
                  margin: 1rem auto;
                }
                .prose img[style*="margin: 0 0 0 auto"] {
                  display: block;
                  margin: 1rem 0 1rem auto;
                }
                .prose img[style*="margin: 0;"] {
                  display: block;
                  margin: 1rem 0;
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
