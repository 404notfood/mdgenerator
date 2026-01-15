import { PrismaClient, UserRole } from '@prisma/client'
import { scryptAsync } from '@noble/hashes/scrypt.js'

const prisma = new PrismaClient()

// Configuration du compte admin
const ADMIN_CONFIG = {
  email: 'admin@markdownpro.com',
  name: 'Admin MarkdownPro',
  password: 'Admin123!@#', // Changez ce mot de passe en production !
}

// Better Auth password hashing config (same as better-auth/crypto/password.mjs)
const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
}

function hexEncode(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password: string): Promise<string> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16))
  const salt = hexEncode(saltBytes)

  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  })

  return `${salt}:${hexEncode(key)}`
}

async function seedAdmin() {
  console.log('🔐 Creation du compte admin...')
  console.log('')

  try {
    // Verifier si l'admin existe deja
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_CONFIG.email },
      include: { accounts: true }
    })

    // Hasher le mot de passe avec scrypt (comme Better Auth)
    const hashedPassword = await hashPassword(ADMIN_CONFIG.password)

    if (existingUser) {
      // Mettre a jour le role
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: UserRole.ADMIN }
      })

      // Mettre a jour ou creer le mot de passe dans l'account
      const credentialAccount = existingUser.accounts.find(a => a.providerId === 'credential')
      if (credentialAccount) {
        await prisma.account.update({
          where: { id: credentialAccount.id },
          data: { password: hashedPassword }
        })
      } else {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            accountId: existingUser.id,
            providerId: 'credential',
            password: hashedPassword,
          }
        })
      }

      console.log('🔄 Compte admin mis a jour!')
    } else {
      // Creer l'utilisateur admin
      await prisma.user.create({
        data: {
          email: ADMIN_CONFIG.email,
          name: ADMIN_CONFIG.name,
          role: UserRole.ADMIN,
          emailVerified: true,
          accounts: {
            create: {
              accountId: ADMIN_CONFIG.email,
              providerId: 'credential',
              password: hashedPassword,
            }
          }
        }
      })
      console.log('✅ Compte admin cree avec succes!')
    }

    console.log('')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    console.log('📧 Email:    ', ADMIN_CONFIG.email)
    console.log('🔑 Password: ', ADMIN_CONFIG.password)
    console.log('👤 Role:     ', 'ADMIN')
    console.log('')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    console.log('⚠️  IMPORTANT: Changez le mot de passe apres la premiere connexion!')
    console.log('')

  } catch (error) {
    console.error('❌ Erreur lors de la creation du compte admin:', error)
    throw error
  }
}

// Execution
seedAdmin()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
