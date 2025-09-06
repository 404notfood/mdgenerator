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
            <div className="bg-gray-50 p-4 rounded-lg min-h-[500px] border prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-8 [&_h1]:text-gray-800 [&_h1]:border-b-2 [&_h1]:border-gray-200 [&_h1]:pb-2 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-6 [&_h2]:text-gray-700 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-1 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-5 [&_h3]:text-gray-600 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:ml-4 [&_li]:mb-1 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto [&_img]:cursor-pointer [&_hr]:border-0 [&_hr]:border-t-2 [&_hr]:border-gray-300 [&_hr]:my-8 [&_table]:border-collapse [&_table]:w-full [&_table]:my-4 [&_table]:text-sm [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100 [&_th]:font-bold [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2 [&_p]:my-3 [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:bg-gray-100 [&_blockquote]:my-4 [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:rounded">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
