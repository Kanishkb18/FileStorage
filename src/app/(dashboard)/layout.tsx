import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/')
  }

  return (
    <div className="w-full min-h-screen pb-10">
      <Navbar />
      <main className="mx-auto flex min-w-0 max-w-7xl grow flex-col sm:flex-row sm:py-6">
        <Sidebar />
        <div
          style={{ scrollbarWidth: "none" }}
          className="flex w-screen grow flex-col overflow-y-auto px-4 sm:w-full sm:p-6"
        >
          {children}
        </div>
      </main>
    </div>
  )
}