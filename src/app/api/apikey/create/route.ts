import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createApiKeyService } from '@/lib/services/apikey'
import { z } from 'zod'

const createApiKeySchema = z.object({
  name: z.string().min(2).max(50),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name } = createApiKeySchema.parse(body)

    const { rawKey } = await createApiKeyService(session.user.id, name)

    return NextResponse.json({
      message: 'API key created successfully',
      key: rawKey,
    })
  } catch (error) {
    console.error('Create API key error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}