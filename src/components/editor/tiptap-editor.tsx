'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Emoji from '@tiptap/extension-emoji'
import FileHandler from '@tiptap/extension-file-handler'
import Highlight from '@tiptap/extension-highlight'
import { createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  List, 
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Settings,
  Minus,
  Smile,
  Heading1,
  Heading2,
  Heading3,
  Palette,
  Table as TableIcon,
  Highlighter,
  AlignCenter as ImageCenter,
  MoveLeft as ImageLeft,
  MoveRight as ImageRight,
} from 'lucide-react'

interface TipTapEditorProps {
  content?: string
  onChange?: (content: string) => void
  className?: string
}

export function TipTapEditor({ content = '', onChange, className }: TipTapEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  
  const lowlight = createLowlight()
  
  // Register languages
  lowlight.register('js', js)
  lowlight.register('javascript', js)
  lowlight.register('ts', ts)
  lowlight.register('typescript', ts)
  lowlight.register('html', html)
  lowlight.register('xml', html)
  lowlight.register('css', css)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-inside',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-inside',
          },
        },
        link: false, // Désactiver le link du StarterKit
        horizontalRule: false, // Désactiver le horizontalRule du StarterKit  
        codeBlock: false, // Désactiver le codeBlock du StarterKit
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg cursor-pointer',
        },
        allowBase64: true,
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'border-t-2 border-gray-300 my-4',
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'highlight',
        },
      }),
      Emoji,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files) => {
          files.forEach(file => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().focus().setImage({
                src: fileReader.result,
              }).run()
            }
          })
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-md bg-gray-900 text-white p-4 font-mono text-sm overflow-x-auto',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4',
        spellcheck: 'false',
      },
      handleKeyDown: (view, event) => {
        // Fix pour éviter l'erreur TransformError sur Enter
        if (event.key === 'Enter' && !event.shiftKey) {
          const { state } = view
          const { selection } = state
          if (selection.empty && selection.$from.parent.type.name === 'paragraph') {
            return false // Laisser TipTap gérer normalement
          }
        }
        return false
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL de l\'image')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const resizeImage = () => {
    if (editor.isActive('image')) {
      const width = window.prompt('Largeur de l\'image (en pixels, ex: 300)', '300')
      if (width && !isNaN(Number(width))) {
        editor.chain().focus().updateAttributes('image', {
          width: Number(width),
          style: `width: ${width}px; height: auto;`
        }).run()
      }
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour la redimensionner')
    }
  }

  const alignImageLeft = () => {
    if (editor.isActive('image')) {
      const currentAttrs = editor.getAttributes('image')
      editor.chain().focus().updateAttributes('image', {
        ...currentAttrs,
        style: `width: ${currentAttrs.width || 300}px; height: auto; display: block; margin: 1rem 0;`
      }).run()
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour l\'aligner')
    }
  }

  const alignImageCenter = () => {
    if (editor.isActive('image')) {
      const currentAttrs = editor.getAttributes('image')
      editor.chain().focus().updateAttributes('image', {
        ...currentAttrs,
        style: `width: ${currentAttrs.width || 300}px; height: auto; display: block; margin: 1rem auto;`
      }).run()
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour l\'aligner')
    }
  }

  const alignImageRight = () => {
    if (editor.isActive('image')) {
      const currentAttrs = editor.getAttributes('image')
      editor.chain().focus().updateAttributes('image', {
        ...currentAttrs,
        style: `width: ${currentAttrs.width || 300}px; height: auto; display: block; margin: 1rem 0 1rem auto;`
      }).run()
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour l\'aligner')
    }
  }


  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run()
  }

  const insertEmoji = (emoji: string) => {
    editor.chain().focus().insertContent(emoji).run()
    setShowEmojiPicker(false)
  }

  const colors = [
    { name: 'Noir', color: '#000000' },
    { name: 'Rouge', color: '#dc2626' },
    { name: 'Orange', color: '#ea580c' },
    { name: 'Vert', color: '#16a34a' },
    { name: 'Bleu', color: '#2563eb' },
    { name: 'Violet', color: '#9333ea' },
  ]

  const highlightColors = [
    { name: 'Jaune', color: '#fef08a' },
    { name: 'Vert', color: '#bbf7d0' },
    { name: 'Bleu', color: '#dbeafe' },
    { name: 'Rose', color: '#fbcfe8' },
    { name: 'Orange', color: '#fed7aa' },
  ]

  const githubEmojis = [
    { emoji: '🚀', name: 'Fusée' },
    { emoji: '⭐', name: 'Étoile' },
    { emoji: '🎯', name: 'Cible' },
    { emoji: '💡', name: 'Ampoule' },
    { emoji: '🔥', name: 'Feu' },
    { emoji: '✅', name: 'Check' },
    { emoji: '❌', name: 'Croix' },
    { emoji: '⚠️', name: 'Attention' },
    { emoji: '📚', name: 'Livres' },
    { emoji: '🛠️', name: 'Outils' },
    { emoji: '📦', name: 'Package' },
    { emoji: '🔧', name: 'Clé' },
    { emoji: '🌟', name: 'Étoile brillante' },
    { emoji: '💻', name: 'Ordinateur' },
    { emoji: '📊', name: 'Graphique' },
    { emoji: '🎨', name: 'Palette' },
  ]

  const setTextColor = (color: string) => {
    const selection = editor.state.selection
    if (!selection.empty) {
      const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
      editor.chain().focus().insertContent(`<span style="color: ${color}">${selectedText}</span>`).run()
    } else {
      editor.chain().focus().insertContent(`<span style="color: ${color}">Texte coloré</span>`).run()
    }
  }

  const setHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run()
  }

  const insertTable = () => {
    const cols = window.prompt('Nombre de colonnes (1-10):', '3')
    const rows = window.prompt('Nombre de lignes (1-20):', '3')
    
    if (cols && rows && !isNaN(Number(cols)) && !isNaN(Number(rows))) {
      const colCount = Math.max(1, Math.min(10, Number(cols)))
      const rowCount = Math.max(1, Math.min(20, Number(rows)))
      
      let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin: 1rem 0;"><thead><tr>'
      
      // En-têtes
      for (let i = 1; i <= colCount; i++) {
        tableHTML += `<th style="border: 1px solid #d1d5db; padding: 8px 12px; background-color: #f3f4f6; font-weight: bold;">En-tête ${i}</th>`
      }
      tableHTML += '</tr></thead><tbody>'
      
      // Lignes de données
      for (let r = 1; r <= rowCount; r++) {
        tableHTML += '<tr>'
        for (let c = 1; c <= colCount; c++) {
          tableHTML += `<td style="border: 1px solid #d1d5db; padding: 8px 12px;">Cellule ${r}-${c}</td>`
        }
        tableHTML += '</tr>'
      }
      tableHTML += '</tbody></table>'
      
      editor.chain().focus().insertContent(tableHTML).run()
    }
  }



  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL du lien', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-gray-200' : ''}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'bg-gray-200' : ''}
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
          title="Titre H1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
          title="Titre H2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
          title="Titre H3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}
        >
          <AlignJustify className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-gray-200' : ''}
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={resizeImage}
          title="Redimensionner l'image"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={alignImageLeft}
          title="Aligner l'image à gauche"
        >
          <ImageLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={alignImageCenter}
          title="Centrer l'image"
        >
          <ImageCenter className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={alignImageRight}
          title="Aligner l'image à droite"
        >
          <ImageRight className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addHorizontalRule}
          title="Ligne de séparation"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={insertTable}
          title="Insérer un tableau"
        >
          <TableIcon className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <div className="flex items-center gap-1" title="Couleurs de texte">
          <Palette className="w-4 h-4 text-gray-600" />
          {colors.map((colorItem, index) => (
            <button
              key={index}
              onClick={() => setTextColor(colorItem.color)}
              className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: colorItem.color }}
              title={`${colorItem.name} (${colorItem.color})`}
            />
          ))}
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <div className="flex items-center gap-1" title="Surlignage">
          <Highlighter className="w-4 h-4 text-gray-600" />
          {highlightColors.map((colorItem, index) => (
            <button
              key={index}
              onClick={() => setHighlight(colorItem.color)}
              className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: colorItem.color }}
              title={`Surligner en ${colorItem.name}`}
            />
          ))}
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Choisir un emoji"
          >
            <Smile className="w-4 h-4" />
          </Button>
          
          {showEmojiPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50 w-80">
              <div className="text-xs text-gray-600 mb-2 font-semibold">Emojis pour README GitHub</div>
              <div className="grid grid-cols-8 gap-2">
                {githubEmojis.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(item.emoji)}
                    className="p-2 hover:bg-gray-100 rounded text-xl transition-colors hover:scale-110 transform"
                    title={item.name}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}