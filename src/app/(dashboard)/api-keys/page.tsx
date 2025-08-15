import PageLayout from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import CreateApiKeyDialog from '@/components/api-keys/create-apikey'
import AllApiKeys from '@/components/api-keys/all-apikeys'

export default function ApiKeysPage() {
  return (
    <PageLayout
      title="Api Keys"
      subtitle="View and manage your UploadNest API keys."
      rightAction={
        <CreateApiKeyDialog>
          <Button className="!pr-7">
            <PlusIcon />
            Create Key
          </Button>
        </CreateApiKeyDialog>
      }
    >
      <div className="w-full h-auto">
        <AllApiKeys />
      </div>
    </PageLayout>
  )
}