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
  const [showTablePicker, setShowTablePicker] = React.useState(false)
  const [tableHover, setTableHover] = React.useState({ rows: 1, cols: 1 })
  
  // Fermer les dropdowns quand on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setShowEmojiPicker(false)
        setShowTablePicker(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
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
        addAttributes() {
          return {
            ...this.parent?.(),
            align: {
              default: 'left',
              parseHTML: element => element.getAttribute('data-align'),
              renderHTML: attributes => {
                if (!attributes.align) return {}
                return { 'data-align': attributes.align }
              },
            },
          }
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'div'],
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
        const currentAttrs = editor.getAttributes('image')
        const currentAlign = currentAttrs.align || 'left'
        const currentStyle = currentAttrs.style || ''
        
        // Préserver l'alignement existant et ajouter la largeur
        let newStyle = `width: ${width}px; height: auto;`
        
        if (currentAlign === 'center') {
          newStyle += ' display: block; margin: 0 auto 0.5rem auto;'
        } else if (currentAlign === 'right') {
          newStyle += ' float: right; margin-left: 1rem; margin-bottom: 0.5rem;'
        } else { // left or default
          newStyle += ' float: left; margin-right: 1rem; margin-bottom: 0.5rem;'
        }
        
        editor.chain().focus().updateAttributes('image', {
          width: Number(width),
          style: newStyle,
          align: currentAlign
        }).run()
      }
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour la redimensionner')
    }
  }

  const alignImageLeft = () => {
    if (editor.isActive('image')) {
      editor.chain().focus().updateAttributes('image', {
        align: 'left',
        style: 'float: left; margin-right: 1rem; margin-bottom: 0.5rem;'
      }).run()
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour l\'aligner')
    }
  }

  const alignImageCenter = () => {
    if (editor.isActive('image')) {
      editor.chain().focus().updateAttributes('image', {
        align: 'center',
        style: 'display: block; margin: 0 auto 0.5rem auto;'
      }).run()
    } else {
      alert('Veuillez d\'abord cliquer sur une image pour l\'aligner')
    }
  }

  const alignImageRight = () => {
    if (editor.isActive('image')) {
      editor.chain().focus().updateAttributes('image', {
        align: 'right',
        style: 'float: right; margin-left: 1rem; margin-bottom: 0.5rem;'
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

  const insertTable = (rows: number, cols: number) => {
    let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin: 1rem 0;"><thead><tr>'
    
    // En-têtes
    for (let i = 1; i <= cols; i++) {
      tableHTML += `<th style="border: 1px solid #d1d5db; padding: 8px 12px; background-color: #f3f4f6; font-weight: bold;">En-tête ${i}</th>`
    }
    tableHTML += '</tr></thead><tbody>'
    
    // Lignes de données
    for (let r = 1; r <= rows; r++) {
      tableHTML += '<tr>'
      for (let c = 1; c <= cols; c++) {
        tableHTML += `<td style="border: 1px solid #d1d5db; padding: 8px 12px;">Cellule ${r}-${c}</td>`
      }
      tableHTML += '</tr>'
    }
    tableHTML += '</tbody></table>'
    
    editor.chain().focus().insertContent(tableHTML).run()
    setShowTablePicker(false)
  }

  const handleTableCellHover = (row: number, col: number) => {
    setTableHover({ rows: row, cols: col })
  }

  const handleTableCellClick = (row: number, col: number) => {
    insertTable(row, col)
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
      <div className="bg-white border-b border-gray-300">
        {/* Première ligne - Actions principales */}
        <div className="flex flex-wrap items-center gap-0 p-2 border-b border-gray-200 bg-gray-50">
          {/* Groupe Undo/Redo */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="hover:bg-blue-100 disabled:opacity-50"
              title="Annuler (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="hover:bg-blue-100 disabled:opacity-50"
              title="Refaire (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Liens et Médias */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={setLink}
              className={`hover:bg-blue-100 ${editor.isActive('link') ? 'bg-blue-200' : ''}`}
              title="Lien (Ctrl+K)"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addImage}
              className="hover:bg-blue-100"
              title="Insérer une image"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Tableaux */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <div className="relative dropdown-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTablePicker(!showTablePicker)}
                title="Insérer un tableau"
                className={`hover:bg-blue-100 ${showTablePicker ? 'bg-blue-200' : ''}`}
              >
                <TableIcon className="w-4 h-4" />
              </Button>
              
              {showTablePicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 z-50 min-w-max">
                  <div className="text-sm text-gray-700 mb-2 font-medium text-center">Insérer un tableau</div>
                  <div className="grid grid-cols-10 gap-1 bg-gray-100 p-2 rounded border" style={{width: '220px'}}>
                    {Array.from({ length: 100 }, (_, index) => {
                      const row = Math.floor(index / 10) + 1
                      const col = (index % 10) + 1
                      const isSelected = row <= tableHover.rows && col <= tableHover.cols
                      
                      return (
                        <div
                          key={index}
                          className={`w-4 h-4 cursor-pointer transition-all duration-100 border rounded-sm flex-shrink-0 ${
                            isSelected 
                              ? 'bg-blue-500 border-blue-600 shadow-sm' 
                              : 'bg-white border-gray-400 hover:bg-gray-200 hover:border-gray-600'
                          }`}
                          onMouseEnter={() => handleTableCellHover(row, col)}
                          onClick={() => handleTableCellClick(row, col)}
                          title={`${row} × ${col}`}
                        />
                      )
                    })}
                  </div>
                  <div className="text-center text-sm text-gray-700 mt-2 font-medium bg-gray-50 py-1 px-3 rounded">
                    {tableHover.rows} × {tableHover.cols}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Groupe Blockquote et HR */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`hover:bg-blue-100 ${editor.isActive('blockquote') ? 'bg-blue-200' : ''}`}
              title="Citation"
            >
              <Quote className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addHorizontalRule}
              className="hover:bg-blue-100"
              title="Ligne horizontale"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Emojis */}
          <div className="flex">
            <div className="relative dropdown-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="Emojis"
                className={`hover:bg-blue-100 ${showEmojiPicker ? 'bg-blue-200' : ''}`}
              >
                <Smile className="w-4 h-4" />
              </Button>
              
              {showEmojiPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 z-50 w-80">
                  <div className="text-xs text-gray-700 mb-2 font-medium">Emojis pour README GitHub</div>
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
          </div>
        </div>

        {/* Deuxième ligne - Formatage du texte */}
        <div className="flex flex-wrap items-center gap-0 p-2">
          {/* Groupe Titres */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`hover:bg-blue-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : ''}`}
              title="Titre 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`hover:bg-blue-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : ''}`}
              title="Titre 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`hover:bg-blue-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-200' : ''}`}
              title="Titre 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Formatage */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`hover:bg-blue-100 ${editor.isActive('bold') ? 'bg-blue-200' : ''}`}
              title="Gras (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`hover:bg-blue-100 ${editor.isActive('italic') ? 'bg-blue-200' : ''}`}
              title="Italique (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`hover:bg-blue-100 ${editor.isActive('strike') ? 'bg-blue-200' : ''}`}
              title="Barré"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`hover:bg-blue-100 ${editor.isActive('code') ? 'bg-blue-200' : ''}`}
              title="Code inline"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Alignement */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`hover:bg-blue-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200' : ''}`}
              title="Aligner à gauche"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`hover:bg-blue-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200' : ''}`}
              title="Centrer"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`hover:bg-blue-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200' : ''}`}
              title="Aligner à droite"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`hover:bg-blue-100 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-200' : ''}`}
              title="Justifier"
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Listes */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`hover:bg-blue-100 ${editor.isActive('bulletList') ? 'bg-blue-200' : ''}`}
              title="Liste à puces"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`hover:bg-blue-100 ${editor.isActive('orderedList') ? 'bg-blue-200' : ''}`}
              title="Liste numérotée"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Images (alignement) */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resizeImage}
              className="hover:bg-blue-100"
              title="Redimensionner l'image"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={alignImageLeft}
              className="hover:bg-blue-100"
              title="Image à gauche"
            >
              <ImageLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={alignImageCenter}
              className="hover:bg-blue-100"
              title="Image centrée"
            >
              <ImageCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={alignImageRight}
              className="hover:bg-blue-100"
              title="Image à droite"
            >
              <ImageRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Groupe Couleurs */}
          <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
            <div className="flex items-center gap-1" title="Couleurs de texte">
              <Palette className="w-4 h-4 text-gray-600" />
              {colors.map((colorItem, index) => (
                <button
                  key={index}
                  onClick={() => setTextColor(colorItem.color)}
                  className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: colorItem.color }}
                  title={`${colorItem.name}`}
                />
              ))}
            </div>
          </div>

          {/* Groupe Surlignage */}
          <div className="flex items-center">
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
          </div>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}