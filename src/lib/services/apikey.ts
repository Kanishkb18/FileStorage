import { prisma } from '@/lib/prisma'
import { generateAPIKey } from '@/lib/utils'

export async function createApiKeyService(userId: string, name: string) {
  const { rawKey, hashedKey, displayKey } = generateAPIKey()

  await prisma.apiKey.create({
    data: {
      userId,
      name,
      hashedKey,
      displayKey,
    },
  })

  return { rawKey }
}

export async function getAllApiKeysService(
  userId: string,
  pagination: { pageSize: number; pageNumber: number }
) {
  const { pageSize, pageNumber } = pagination
  const skip = (pageNumber - 1) * pageSize

  const [apiKeys, totalCount] = await Promise.all([
    prisma.apiKey.findMany({
      where: { userId },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.apiKey.count({ where: { userId } }),
  ])

  const totalPages = Math.ceil(totalCount / pageSize)

  return {
    apiKeys,
    pagination: {
      pageSize,
      totalCount,
      totalPages,
      pageNumber,
      skip,
    },
  }
}

export async function deleteApiKeyService(userId: string, apiKeyId: string) {
  const result = await prisma.apiKey.deleteMany({
    where: {
      id: apiKeyId,
      userId,
    },
  })

  if (result.count === 0) {
    throw new Error('API Key not found')
  }

  return { deletedCount: result.count }
}