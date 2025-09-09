"use client"

import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Edit, Save, X } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  category: string
  price: number
  isPremium: boolean
}

export default function AdminTemplatesPage() {
  const { data: session, isPending } = useSession()
  const [templates, setTemplates] = useState<Template[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // Check if user is admin
  const isAdmin = session && (session.user as any).role === 'ADMIN'

  useEffect(() => {
    if (!isAdmin) return
    
    fetchTemplates()
  }, [isAdmin])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePrice = async (templateId: string, newPrice: number) => {
    try {
      const response = await fetch(`/api/admin/templates/${templateId}/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: newPrice })
      })

      if (response.ok) {
        setTemplates(prev => 
          prev.map(template => 
            template.id === templateId 
              ? { ...template, price: newPrice }
              : template
          )
        )
        setEditingId(null)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prix:', error)
    }
  }

  if (isPending) {
    return <div className="container mx-auto py-12 px-4 text-center">Chargement...</div>
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p className="text-gray-600 mb-6">Vous devez être administrateur pour accéder à cette page.</p>
        <Button asChild>
          <Link href="/dashboard">Retour au dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Templates
            <Badge variant="destructive" className="ml-2">ADMIN</Badge>
          </h1>
          <p className="text-gray-600">Modifier les prix et paramètres des templates</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">← Retour</Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Chargement des templates...</div>
      ) : (
        <div className="grid gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {template.name}
                      {template.isPremium && (
                        <Badge variant="secondary">Premium</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {editingId === template.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24"
                          min="0"
                          step="10"
                        />
                        <span className="text-sm text-gray-500">centimes</span>
                        <Button
                          size="sm"
                          onClick={() => handleUpdatePrice(template.id, editPrice)}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          {(template.price / 100).toFixed(2)}€
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(template.id)
                            setEditPrice(template.price)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}