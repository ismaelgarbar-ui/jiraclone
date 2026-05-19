import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjectByKey } from '@/lib/actions/projects'
import { getIssues } from '@/lib/actions/issues'
import { BoardClient } from './BoardClient'
import type { Workspace, Project, IssueStatus } from '@/types'

type ProjectWithStatuses = Project & { issue_statuses: IssueStatus[] }

interface Props {
  params: Promise<{ workspaceSlug: string; projectKey: string }>
}

export default async function BoardPage({ params }: Props) {
  const { workspaceSlug, projectKey } = await params

  const workspaceRaw = await getWorkspaceBySlug(workspaceSlug)
  if (!workspaceRaw) notFound()
  const workspace = workspaceRaw as Workspace

  const projectRaw = await getProjectByKey(workspace.id, projectKey)
  if (!projectRaw) notFound()
  const project = projectRaw as ProjectWithStatuses

  const issues = await getIssues(project.id)

  const statuses = project.issue_statuses ?? []

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{project.name}</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">{project.key}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{issues.length} issues</span>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-hidden p-6">
        <BoardClient
          statuses={statuses}
          issues={issues as Parameters<typeof BoardClient>[0]['issues']}
          workspaceSlug={workspaceSlug}
          projectKey={project.key}
          projectId={project.id}
        />
      </div>
    </div>
  )
}
