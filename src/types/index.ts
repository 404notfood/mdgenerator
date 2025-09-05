import { User, Template, Document, Purchase, UserRole, PurchaseStatus, TemplateCategory } from '@prisma/client'

export type { User, Template, Document, Purchase, UserRole, PurchaseStatus, TemplateCategory }

export interface UserWithPurchases extends User {
  purchases: Purchase[]
}

export interface TemplateWithPurchases extends Template {
  purchases: Purchase[]
}

export interface DocumentWithUser extends Document {
  user: User
}

export interface PurchaseWithTemplate extends Purchase {
  template: Template
  user: User
}

export interface EditorState {
  content: string
  title: string
  isModified: boolean
}