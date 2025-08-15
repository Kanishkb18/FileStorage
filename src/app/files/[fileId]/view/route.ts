import { NextRequest, NextResponse } from 'next/server'
import { getFileUrlService } from '@/lib/services/files'

export async function GET(
  req: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { stream, contentType, fileSize } = await getFileUrlService(params.fileId)

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Length': fileSize.toString(),
      'Cache-Control': 'public, max-age=3600',
      'Content-Disposition': 'inline',
      'X-Content-Type-Options': 'nosniff',
    })

    // Convert stream to response
    const response = new NextResponse(stream as any, {
      status: 200,
      headers,
    })

    return response
  } catch (error) {
    console.error('Get file error:', error)
    return NextResponse.json(
      { message: 'File not found' },
      { status: 404 }
    )
  }
}