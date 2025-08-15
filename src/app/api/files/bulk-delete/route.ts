import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { deleteFilesService } from '@/lib/services/files'
import { z } from 'zod'

const deleteFilesSchema = z.object({
  fileIds: z.array(z.string()).min(1, 'At least one file ID must be provided'),
})

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { fileIds } = deleteFilesSchema.parse(body)

    const result = await deleteFilesService(session.user.id, fileIds)

    return NextResponse.json({
      message: 'Files deleted successfully',
      ...result,
    })
  } catch (error) {
    console.error('Delete files error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}