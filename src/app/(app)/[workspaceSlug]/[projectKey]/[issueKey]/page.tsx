import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjectByKey } from '@/lib/actions/projects'
import { getIssueByKey, getComments } from '@/lib/actions/issues'
import { IssueDetailClient } from './IssueDetailClient'
import type { Workspace, Project, IssueStatus, Issue } from '@/types'

interface Props {
  params: Promise<{ workspaceSlug: string; projectKey: string; issueKey: string }>
}

type ProjectWithStatuses = Project & { issue_statuses: IssueStatus[] }
type IssueWithStatus = Issue & { status: IssueStatus }

export default async function IssueDetailPage({ params }: Props) {
  const { workspaceSlug, projectKey, issueKey } = await params

  const workspaceRaw = await getWorkspaceBySlug(workspaceSlug)
  if (!workspaceRaw) notFound()
  const workspace = workspaceRaw as Workspace

  const projectRaw = await getProjectByKey(workspace.id, projectKey)
  if (!projectRaw) notFound()
  const project = projectRaw as ProjectWithStatuses

  const issueRaw = await getIssueByKey(project.id, issueKey)
  if (!issueRaw) notFound()
  const issue = issueRaw as IssueWithStatus

  const comments = await getComments(issue.id)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const statuses = (project as { issue_statuses?: { id: string; project_id: string; name: string; color: string; position: number; created_at: string }[] }).issue_statuses ?? []

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 text-sm flex-shrink-0">
        <Link href={`/${workspaceSlug}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          {workspace.name}
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <Link href={`/${workspaceSlug}/${projectKey}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          {project.name}
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="font-mono text-gray-900 dark:text-gray-100 font-medium">{issue.key}</span>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <IssueDetailClient
          issue={issue as Parameters<typeof IssueDetailClient>[0]['issue']}
          statuses={statuses}
          comments={comments}
          workspaceSlug={workspaceSlug}
          projectKey={projectKey}
          currentUserId={user?.id ?? ''}
        />
      </div>
    </div>
  )
}
