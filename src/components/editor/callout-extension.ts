import { Node, mergeAttributes } from '@tiptap/core'

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attributes?: { type: string; title?: string }) => ReturnType
      toggleCallout: (attributes?: { type: string; title?: string }) => ReturnType
      unsetCallout: () => ReturnType
    }
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      type: {
        default: 'note',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          if (!attributes.type) {
            return {}
          }
          return {
            'data-type': attributes.type,
          }
        },
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          if (!attributes.title) {
            return {}
          }
          return {
            'data-title': attributes.title,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const type = node.attrs.type || 'note'
    const title = node.attrs.title || type.charAt(0).toUpperCase() + type.slice(1)
    
    const typeConfig = {
      note: { 
        icon: 'ℹ️', 
        color: 'text-blue-700', 
        bgColor: 'bg-blue-50', 
        borderColor: 'border-l-blue-500' 
      },
      tip: { 
        icon: '💡', 
        color: 'text-green-700', 
        bgColor: 'bg-green-50', 
        borderColor: 'border-l-green-500' 
      },
      important: { 
        icon: '⭐', 
        color: 'text-purple-700', 
        bgColor: 'bg-purple-50', 
        borderColor: 'border-l-purple-500' 
      },
      warning: { 
        icon: '⚠️', 
        color: 'text-yellow-700', 
        bgColor: 'bg-yellow-50', 
        borderColor: 'border-l-yellow-500' 
      },
      caution: { 
        icon: '🚨', 
        color: 'text-red-700', 
        bgColor: 'bg-red-50', 
        borderColor: 'border-l-red-500' 
      }
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.note

    return [
      'div',
      mergeAttributes(
        {
          'data-callout': '',
          'data-type': type,
          'data-title': title,
          class: `callout ${config.bgColor} ${config.borderColor} border-l-4 p-4 my-4 rounded-r-lg`,
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      [
        'div',
        { class: `callout-header flex items-center gap-2 mb-2 ${config.color} font-semibold` },
        [
          'span',
          { class: 'callout-icon' },
          config.icon,
        ],
        [
          'span',
          { class: 'callout-title' },
          title,
        ],
      ],
      [
        'div',
        { class: `callout-content ${config.color}` },
        0,
      ],
    ]
  },

  content: 'block+',

  group: 'block',

  defining: true,

  addCommands() {
    return {
      setCallout:
        attributes =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
      toggleCallout:
        attributes =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
      unsetCallout:
        () =>
        ({ commands }) => {
          return commands.setNode('paragraph')
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.toggleCallout({ type: 'note' }),
    }
  },
})