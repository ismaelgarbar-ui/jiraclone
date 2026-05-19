import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getWorkspaces } from '@/lib/actions/workspaces'
import { WorkspacesClient } from './WorkspacesClient'

export default async function WorkspacesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const workspaces = await getWorkspaces()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Workspaces</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {workspaces.length === 0 ? 'No workspaces yet' : `${workspaces.length} workspace${workspaces.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <WorkspacesClient />
        </div>

        {workspaces.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">Create a workspace to get started</p>
            <WorkspacesClient />
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {workspaces.map((ws) => (
              <Link
                key={ws.id}
                href={`/${ws.slug}`}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
              >
                <div className="h-8 w-8 rounded-md bg-violet-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {ws.name[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{ws.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">/{ws.slug}</p>
                </div>
                <svg className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
