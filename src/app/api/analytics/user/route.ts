import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserAnalyticsWithChartService } from '@/lib/services/analytics'

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
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const filter = {
      dateFrom: from ? new Date(from) : undefined,
      dateTo: to ? new Date(to) : undefined,
    }

    const result = await getUserAnalyticsWithChartService(session.user.id, filter)

    return NextResponse.json({
      message: 'User analytics retrieved successfully',
      ...result,
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}