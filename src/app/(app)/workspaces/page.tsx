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
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your workspaces</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select a workspace or create a new one</p>
          </div>
          <WorkspacesClient />
        </div>

        {workspaces.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-950 mb-4">
              <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">No workspaces yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create your first workspace to get started</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {workspaces.map((ws) => (
              <Link
                key={ws.id}
                href={`/${ws.slug}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {ws.name[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{ws.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">/{ws.slug}</p>
                </div>
                <svg className="h-5 w-5 text-gray-400 group-hover:text-violet-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
