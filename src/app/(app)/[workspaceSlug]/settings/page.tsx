import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getWorkspaceBySlug, getWorkspaceMembers, deleteWorkspace } from '@/lib/actions/workspaces'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ workspaceSlug: string }>
}

export default async function WorkspaceSettingsPage({ params }: Props) {
  const { workspaceSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const workspace = await getWorkspaceBySlug(workspaceSlug)
  if (!workspace) notFound()

  const members = await getWorkspaceMembers(workspace.id)
  const isOwner = workspace.owner_id === user.id

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Settings</h1>

      <section className="mb-8">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Workspace</h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Name</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{workspace.name}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">URL</span>
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">/{workspace.slug}</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Members ({members.length})
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-semibold">
                  {member.user_id[0].toUpperCase()}
                </div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{member.user_id.slice(0, 12)}…</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 capitalize">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {isOwner && (
        <section>
          <h2 className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-3">Danger zone</h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-900/50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Delete workspace</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Permanently removes all projects and issues</p>
              </div>
              <form
                action={async () => {
                  'use server'
                  await deleteWorkspace(workspace.id)
                }}
              >
                <Button variant="danger" size="sm" type="submit">Delete</Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
