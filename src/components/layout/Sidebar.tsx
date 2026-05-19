'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Workspace, Project } from '@/types'
import { ThemeToggle } from './ThemeToggle'
import { Avatar } from '@/components/ui/Avatar'
import { signOut } from '@/lib/actions/auth'

interface SidebarProps {
  workspace: Workspace
  projects: Project[]
  userEmail: string
  userName?: string
}

export function Sidebar({ workspace, projects, userEmail, userName }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-52 flex-shrink-0 bg-gray-100/70 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Workspace */}
      <div className="px-3 pt-3 pb-2.5 border-b border-gray-200 dark:border-gray-800">
        <Link
          href={`/${workspace.slug}`}
          className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200/70 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="h-5 w-5 rounded bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {workspace.name[0].toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{workspace.name}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        <NavItem
          href={`/${workspace.slug}`}
          icon={<HomeIcon />}
          label="Dashboard"
          active={pathname === `/${workspace.slug}`}
        />
        <NavItem
          href="/workspaces"
          icon={<GridIcon />}
          label="Workspaces"
          active={pathname === '/workspaces'}
        />

        <div className="pt-4 pb-1 px-2">
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Projects</p>
        </div>

        {projects.map((project) => {
          const href = `/${workspace.slug}/${project.key}`
          const isActive = pathname.startsWith(href)
          return (
            <NavItem
              key={project.id}
              href={href}
              icon={
                <span className="h-4 w-4 rounded text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center flex-shrink-0">
                  {project.key[0]}
                </span>
              }
              label={project.name}
              active={isActive}
            />
          )
        })}

        {projects.length === 0 && (
          <p className="px-2 py-1.5 text-xs text-gray-400 dark:text-gray-500">No projects</p>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-2.5 border-t border-gray-200 dark:border-gray-800 space-y-0.5">
        <NavItem
          href={`/${workspace.slug}/settings`}
          icon={<SettingsIcon />}
          label="Settings"
          active={pathname.includes('/settings')}
        />

        <div className="flex items-center justify-between px-2 py-1.5 mt-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar name={userName} email={userEmail} size="sm" />
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{userName || userEmail.split('@')[0]}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <form action={signOut}>
              <button
                type="submit"
                className="h-7 w-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Sign out"
              >
                <LogoutIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
        active
          ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
      )}
    >
      <span className="flex-shrink-0 opacity-70">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  )
}

function HomeIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
}

function GridIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
}

function SettingsIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
}

function LogoutIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
}
