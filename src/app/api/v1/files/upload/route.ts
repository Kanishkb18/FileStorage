import { NextRequest, NextResponse } from 'next/server'
import { uploadFilesService } from '@/lib/services/files'
import { UploadSource } from '@prisma/client'
import { apiKeyAuthMiddleware } from '@/lib/middleware/apikey-auth'

export async function POST(req: NextRequest) {
  try {
    // Authenticate using API key
    const user = await apiKeyAuthMiddleware(req)
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: 'No files provided' },
        { status: 400 }
      )
    }

    const result = await uploadFilesService(
      user.id,
      files,
      UploadSource.API
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Upload error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}