import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function apiKeyAuthMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('API key required. Use Authorization Bearer <API_KEY>')
  }

  const apiKey = authHeader.slice(7).trim()
  if (!apiKey) {
    throw new Error('API key missing')
  }

  if (!apiKey.startsWith('sk_') || apiKey.length < 20) {
    throw new Error('Invalid API key format')
  }

  const parts = apiKey.split('_')
  if (parts.length < 3 || parts[0] !== 'sk') {
    throw new Error('Invalid API key format')
  }

  const keyType = parts[1] // 'live'
  if (keyType !== 'live') {
    throw new Error('Invalid API key type')
  }

  const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex')

  const apiKeyDoc = await prisma.apiKey.findUnique({
    where: { hashedKey },
    include: { user: true },
  })

  if (!apiKeyDoc) {
    throw new Error('Invalid API key')
  }

  // Update last used timestamp
  await prisma.apiKey.update({
    where: { id: apiKeyDoc.id },
    data: { lastUsedAt: new Date() },
  })

  return apiKeyDoc.user
}