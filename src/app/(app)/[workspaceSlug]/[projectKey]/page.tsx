import Link from 'next/link'
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
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">{project.name}</h1>
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            {project.key}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">{issues.length} issue{issues.length !== 1 ? 's' : ''}</span>
          <Link
            href={`/${workspaceSlug}/${projectKey}`}
            className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Board
          </Link>
          <Link
            href={`/${workspaceSlug}/${projectKey}/list`}
            className="px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            List
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-5">
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
