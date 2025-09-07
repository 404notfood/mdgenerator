"use client"

import React from "react"
import { useSession } from "@/lib/auth-client"
import { useEffect, useState } from "react"

export type Permission = 
  | 'upload:images'
  | 'export:html'
  | 'templates:premium'
  | 'templates:create'
  | 'admin:dashboard'
  | 'admin:users'
  | 'admin:templates'
  | 'payments:create'

export type UserRole = 'USER' | 'ADMIN'

// Définition des permissions par rôle
const rolePermissions: Record<UserRole, Permission[]> = {
  USER: [
    'upload:images',
    'export:html',
    'templates:premium',
    'payments:create'
  ],
  ADMIN: [
    'upload:images',
    'export:html',
    'templates:premium',
    'templates:create',
    'admin:dashboard',
    'admin:users',
    'admin:templates',
    'payments:create'
  ]
}

export function usePermissions() {
  const { data: session, isPending } = useSession()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [role, setRole] = useState<UserRole | null>(null)

  useEffect(() => {
    if (session?.user) {
      // For now, default to USER role since role might not be in session yet
      const userRole = ((session.user as { role?: string }).role as UserRole) || 'USER'
      setRole(userRole)
      setPermissions(rolePermissions[userRole])
    } else {
      setRole(null)
      setPermissions([])
    }
  }, [session])

  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission)
  }

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!role) return false
    
    // Les admins ont accès à tout
    if (role === 'ADMIN') return true
    
    return role === requiredRole
  }

  const isAuthenticated = (): boolean => {
    return !!session?.user
  }

  const isAdmin = (): boolean => {
    return role === 'ADMIN'
  }

  const canUploadImages = (): boolean => {
    return hasPermission('upload:images') && isAuthenticated()
  }

  const canExportHtml = (): boolean => {
    return hasPermission('export:html') && isAuthenticated()
  }

  const canAccessPremiumTemplates = (): boolean => {
    return hasPermission('templates:premium') && isAuthenticated()
  }

  const canCreateTemplates = (): boolean => {
    return hasPermission('templates:create')
  }

  const canAccessAdminDashboard = (): boolean => {
    return hasPermission('admin:dashboard')
  }

  const canMakePayments = (): boolean => {
    return hasPermission('payments:create') && isAuthenticated()
  }

  return {
    // État
    isPending,
    isAuthenticated: isAuthenticated(),
    role,
    permissions,
    
    // Vérifications génériques
    hasPermission,
    hasRole,
    
    // Vérifications spécifiques
    isAdmin: isAdmin(),
    canUploadImages: canUploadImages(),
    canExportHtml: canExportHtml(),
    canAccessPremiumTemplates: canAccessPremiumTemplates(),
    canCreateTemplates: canCreateTemplates(),
    canAccessAdminDashboard: canAccessAdminDashboard(),
    canMakePayments: canMakePayments(),
    
    // Informations utilisateur
    user: session?.user || null
  }
}

// HOC pour protéger des composants
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission: Permission,
  fallback?: React.ComponentType
) {
  return function PermissionWrapper(props: P) {
    const { hasPermission, isPending } = usePermissions()

    if (isPending) {
      return <div>Chargement...</div>
    }

    if (!hasPermission(requiredPermission)) {
      if (fallback) {
        const Fallback = fallback
        return <Fallback />
      }
      return <div>Accès non autorisé</div>
    }

    return <Component {...props} />
  }
}

// HOC pour protéger des composants par rôle
export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: UserRole,
  fallback?: React.ComponentType
) {
  return function RoleWrapper(props: P) {
    const { hasRole, isPending } = usePermissions()

    if (isPending) {
      return <div>Chargement...</div>
    }

    if (!hasRole(requiredRole)) {
      if (fallback) {
        const Fallback = fallback
        return <Fallback />
      }
      return <div>Accès non autorisé</div>
    }

    return <Component {...props} />
  }
}