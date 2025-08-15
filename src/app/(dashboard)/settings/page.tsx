import PageLayout from '@/components/page-layout'
import Appearance from '@/components/settings/appearance'
import Account from '@/components/settings/account'

export default function SettingsPage() {
  return (
    <PageLayout
      title="Settings"
      subtitle="Configure the settings for this application"
    >
      <div className="flex flex-col space-y-8 h-auto py-5 pb-7 px-4 divide-y-2 divide-gray-100 dark:divide-gray-800 border rounded-2xl">
        <Appearance />
        <Account />
      </div>
    </PageLayout>
  )
}