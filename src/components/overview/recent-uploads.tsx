'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBytes } from '@/lib/utils'

export default function RecentUploads() {
  const { data, isLoading } = useQuery({
    queryKey: ['recent-files'],
    queryFn: async () => {
      const response = await fetch('/api/files/all?pageSize=5&pageNumber=1')
      if (!response.ok) throw new Error('Failed to fetch recent files')
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Your latest uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-muted animate-pulse rounded" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const files = data?.files || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
        <CardDescription>Your latest uploaded files</CardDescription>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No files uploaded yet
          </p>
        ) : (
          <div className="space-y-4">
            {files.slice(0, 5).map((file: any) => (
              <div key={file.id} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                  {file.mimeType.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="text-xs font-medium">
                      {file.ext.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {file.originalName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}