import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllApiKeysService } from '@/lib/services/apikey'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1')

    const result = await getAllApiKeysService(
      session.user.id,
      { pageSize, pageNumber }
    )

    return NextResponse.json({
      message: 'API keys retrieved successfully',
      ...result,
    })
  } catch (error) {
    console.error('Get API keys error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}