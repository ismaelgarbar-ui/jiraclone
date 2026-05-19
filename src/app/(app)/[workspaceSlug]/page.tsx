import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjects } from '@/lib/actions/projects'
import { WorkspaceDashboardClient } from './WorkspaceDashboardClient'
import { formatDate } from '@/lib/utils'
import type { Workspace } from '@/types'

interface Props {
  params: Promise<{ workspaceSlug: string }>
}

export default async function WorkspaceDashboardPage({ params }: Props) {
  const { workspaceSlug } = await params

  const workspaceRaw = await getWorkspaceBySlug(workspaceSlug)
  if (!workspaceRaw) notFound()
  const workspace = workspaceRaw as Workspace
  const projects = await getProjects(workspace.id)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{workspace.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <WorkspaceDashboardClient workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-950 mb-4">
            <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">No projects yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create your first project to start tracking work</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${workspaceSlug}/${project.key}`}
              className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-8 w-8 rounded bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-sm">
                  {project.key[0]}
                </div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  {project.key}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-1">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{project.description}</p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">Created {formatDate(project.created_at)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
