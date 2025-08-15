import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { downloadFilesService } from '@/lib/services/files'
import { z } from 'zod'

const downloadFilesSchema = z.object({
  fileIds: z.array(z.string()).min(1, 'At least one file ID must be provided'),
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
    const { fileIds } = downloadFilesSchema.parse(body)

    const result = await downloadFilesService(session.user.id, fileIds)

    return NextResponse.json({
      message: 'File download URL generated successfully',
      downloadUrl: result?.url,
      isZip: result?.isZip || false,
    })
  } catch (error) {
    console.error('Download files error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}