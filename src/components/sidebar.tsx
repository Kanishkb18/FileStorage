'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Folder, HelpCircle, Home, Key, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname()

  const routes = [
    {
      icon: Home,
      href: '/overview',
      label: 'Overview',
    },
    {
      icon: Folder,
      href: '/files',
      label: 'Files',
    },
    {
      icon: HelpCircle,
      href: '/docs',
      label: 'Docs',
    },
    {
      icon: Key,
      href: '/api-keys',
      label: 'Api Keys',
    },
    {
      icon: Settings,
      href: '/settings',
      label: 'Settings',
    },
  ]

  return (
    <div className="hidden lg:flex w-screen sticky shrink-0 top-20 flex-col sm:w-[215px] h-full">
      <nav>
        <ul
          className="flex flex-row justify-between gap-x-4 gap-y-2 p-4 
        text-center sm:flex-col sm:p-6 sm:text-left"
        >
          {routes.map((route, i) => {
            const Icon = route.icon
            return (
              <li key={i}>
                <Link
                  className={cn(
                    'rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary hover:!text-secondary-foreground flex h-max flex-col items-center justify-center gap-2 px-2 py-1.5 font-medium sm:h-10 sm:flex-row sm:justify-start sm:px-4 sm:text-sm bg-transparent text-foreground',
                    pathname === route.href && 'bg-secondary'
                  )}
                  href={route.href}
                >
                  <Icon className="size-5" />
                  <span className="sr-only line-clamp-2 sm:not-sr-only">
                    {route.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar