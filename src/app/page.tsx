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
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
