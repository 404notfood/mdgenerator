"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Copy, Check, Code, FileText } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface TemplatePreviewDialogProps {
  templateName: string
  content: string
  children: React.ReactNode
}

export function TemplatePreviewDialog({
  templateName,
  content,
  children
}: TemplatePreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-[var(--color-text-primary)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block">{templateName}</span>
                <span className="text-xs font-normal text-[var(--color-text-muted)]">
                  Aperçu du template
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Toggle View Mode */}
              <div className="flex rounded-lg bg-[var(--color-bg-darker)] p-1">
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === "preview"
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Aperçu
                </button>
                <button
                  onClick={() => setViewMode("code")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === "code"
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Code
                </button>
              </div>
              {/* Copy Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-[var(--color-border-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-400" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copier
                  </>
                )}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-xl border border-[var(--color-border-dark)]">
          {viewMode === "preview" ? (
            <div className="p-6 bg-[var(--color-bg-darker)] prose prose-invert prose-sm max-w-none
              prose-headings:text-[var(--color-text-primary)]
              prose-p:text-[var(--color-text-secondary)]
              prose-a:text-[var(--color-primary)]
              prose-strong:text-[var(--color-text-primary)]
              prose-code:text-[var(--color-primary)]
              prose-code:bg-[var(--color-surface-dark)]
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:rounded
              prose-pre:bg-[var(--color-surface-dark)]
              prose-pre:border
              prose-pre:border-[var(--color-border-dark)]
              prose-blockquote:border-[var(--color-primary)]
              prose-blockquote:text-[var(--color-text-muted)]
              prose-li:text-[var(--color-text-secondary)]
              prose-table:text-[var(--color-text-secondary)]
              prose-th:text-[var(--color-text-primary)]
              prose-th:border-[var(--color-border-dark)]
              prose-td:border-[var(--color-border-dark)]
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="relative">
              <pre className="p-6 bg-[var(--color-bg-darker)] text-[var(--color-text-secondary)] text-sm overflow-x-auto font-mono whitespace-pre-wrap">
                {content}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
