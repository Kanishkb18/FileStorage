'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Key } from 'lucide-react'
import { toast } from 'sonner'

export default function AllApiKeys() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['api-keys'],
    queryFn: async () => {
      const response = await fetch('/api/apikey/all?pageSize=50&pageNumber=1')
      if (!response.ok) throw new Error('Failed to fetch API keys')
      return response.json()
    },
  })

  const handleDelete = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/apikey/${keyId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('API key deleted successfully')
        refetch()
      } else {
        toast.error(result.message || 'Failed to delete API key')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-muted animate-pulse rounded w-1/3" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  const apiKeys = data?.apiKeys || []

  return (
    <div className="space-y-4">
      {apiKeys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Key className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No API keys yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first API key to start using the UploadNest API
            </p>
          </CardContent>
        </Card>
      ) : (
        apiKeys.map((apiKey: any) => (
          <Card key={apiKey.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{apiKey.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(apiKey.createdAt).toLocaleDateString()}
                    {apiKey.lastUsedAt && (
                      <span className="ml-2">
                        • Last used {new Date(apiKey.lastUsedAt).toLocaleDateString()}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(apiKey.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                  {apiKey.displayKey}
                </code>
                <span className="text-xs text-muted-foreground">
                  (Key is hidden for security)
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}