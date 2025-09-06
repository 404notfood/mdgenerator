'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Emoji from '@tiptap/extension-emoji'
import Details from '@tiptap/extension-details'
import FileHandler from '@tiptap/extension-file-handler'
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
  Table as TableIcon,
  Minus,
  Smile,
  ChevronRight
} from 'lucide-react'

interface TipTapEditorProps {
  content?: string
  onChange?: (content: string) => void
  className?: string
}

export function TipTapEditor({ content = '', onChange, className }: TipTapEditorProps) {
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
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto cursor-pointer',
          style: 'max-width: 300px; height: auto;',
        },
        allowBase64: true,
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
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'table-auto border-collapse border border-gray-300',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'border-t-2 border-gray-300 my-4',
        },
      }),
      Emoji,
      Details,
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
    const width = window.prompt('Largeur de l\'image (en pixels, ex: 300)', '300')
    if (width && !isNaN(Number(width))) {
      const attrs = editor.getAttributes('image')
      editor.chain().focus().updateAttributes('image', { 
        ...attrs,
        style: `max-width: ${width}px; height: auto;`
      }).run()
    }
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run()
  }

  const insertEmoji = () => {
    const emoji = window.prompt('Entrez un emoji (ex: 😀, 🚀, ⭐)')
    if (emoji) {
      editor.chain().focus().insertContent(emoji).run()
    }
  }

  const insertDetails = () => {
    editor.chain().focus().insertContent(`
      <details>
        <summary>Titre de section</summary>
        <p>Contenu masqué ici...</p>
      </details>
    `).run()
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

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={insertTable}
          title="Insérer un tableau"
        >
          <TableIcon className="w-4 h-4" />
        </Button>
        
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
          onClick={insertEmoji}
          title="Insérer un emoji"
        >
          <Smile className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={insertDetails}
          title="Section collapsible"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

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