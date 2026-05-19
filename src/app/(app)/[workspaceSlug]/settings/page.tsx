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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Settings</h1>

      {/* Workspace info */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Workspace</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">Name</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{workspace.name}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">Slug</span>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">/{workspace.slug}</span>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Members <span className="text-gray-400 font-normal">({members.length})</span>
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold">
                  {member.user_id[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono text-xs">{member.user_id.slice(0, 8)}…</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 capitalize">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      {isOwner && (
        <section>
          <h2 className="text-base font-semibold text-red-600 dark:text-red-400 mb-4">Danger zone</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Delete workspace</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Permanently delete this workspace and all its data</p>
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
