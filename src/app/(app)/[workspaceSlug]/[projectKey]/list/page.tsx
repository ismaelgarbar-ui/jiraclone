import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjectByKey } from '@/lib/actions/projects'
import { getIssues } from '@/lib/actions/issues'
import { cn, priorityConfig, formatDate } from '@/lib/utils'
import type { IssueStatus, Workspace, Project } from '@/types'

type ProjectWithStatuses = Project & { issue_statuses: IssueStatus[] }

interface Props {
  params: Promise<{ workspaceSlug: string; projectKey: string }>
}

export default async function ListView({ params }: Props) {
  const { workspaceSlug, projectKey } = await params

  const workspaceRaw = await getWorkspaceBySlug(workspaceSlug)
  if (!workspaceRaw) notFound()
  const workspace = workspaceRaw as Workspace

  const projectRaw = await getProjectByKey(workspace.id, projectKey)
  if (!projectRaw) notFound()
  const project = projectRaw as ProjectWithStatuses

  const issues = await getIssues(project.id)
  const statuses = project.issue_statuses ?? []
  const statusMap = new Map(statuses.map((s) => [s.id, s]))

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
            className="px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Board
          </Link>
          <Link
            href={`/${workspaceSlug}/${projectKey}/list`}
            className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            List
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {issues.length === 0 ? (
          <div className="text-center py-14 text-sm text-gray-400 dark:text-gray-500">No issues yet</div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider w-24">Key</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider w-32">Status</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider w-28">Priority</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider w-28">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {issues.map((issue) => {
                  const status = statusMap.get(issue.status_id)
                  const priority = priorityConfig[issue.priority]
                  return (
                    <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="px-4 py-2.5">
                        <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{issue.key}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/${workspaceSlug}/${projectKey}/${issue.key}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        >
                          {issue.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5">
                        {status && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                            <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: status.color }} />
                            {status.name}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={cn('text-xs', priority.color)}>
                          {priority.icon} {priority.label}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {issue.due_date ? formatDate(issue.due_date) : '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
