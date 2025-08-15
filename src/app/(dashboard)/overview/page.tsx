import { OverviewChart } from '@/components/overview/overview-chart'
import RecentUploads from '@/components/overview/recent-uploads'

export default function OverviewPage() {
  return (
    <div className="space-y-4 pt-5 lg:pt-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="break-normal font-medium text-lg sm:text-xl">
            🎉 Welcome, you've got a place to store files!
          </h1>
          <h2 className="text-muted-foreground text-xs sm:text-sm">
            Like, lots and lots of files. So many files!
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-6">
        <OverviewChart />
        <RecentUploads />
      </div>
    </div>
  )
}