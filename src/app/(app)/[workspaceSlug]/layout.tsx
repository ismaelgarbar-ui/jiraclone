import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjects } from '@/lib/actions/projects'
import { Sidebar } from '@/components/layout/Sidebar'
import type { Workspace } from '@/types'

interface Props {
  children: React.ReactNode
  params: Promise<{ workspaceSlug: string }>
}

export default async function WorkspaceLayout({ children, params }: Props) {
  const { workspaceSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const workspaceRaw = await getWorkspaceBySlug(workspaceSlug)
  if (!workspaceRaw) notFound()
  const workspace = workspaceRaw as Workspace

  const projects = await getProjects(workspace.id)

  const userName = user.user_metadata?.full_name as string | undefined

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar
        workspace={workspace}
        projects={projects}
        userEmail={user.email!}
        userName={userName}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
