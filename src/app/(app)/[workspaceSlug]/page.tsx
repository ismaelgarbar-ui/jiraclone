import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/actions/workspaces'
import { getProjects } from '@/lib/actions/projects'
import { WorkspaceDashboardClient } from './WorkspaceDashboardClient'
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
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{workspace.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {projects.length === 0 ? 'No projects' : `${projects.length} project${projects.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <WorkspaceDashboardClient workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      </div>

      {projects.length === 0 ? (
        <div className="py-14 text-center rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">Create your first project to start tracking work</p>
          <WorkspaceDashboardClient workspaceId={workspace.id} workspaceSlug={workspace.slug} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${workspaceSlug}/${project.key}`}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-7 w-7 rounded bg-violet-600 flex items-center justify-center text-white font-semibold text-xs">
                  {project.key[0]}
                </div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  {project.key}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {project.name}
              </p>
              {project.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{project.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
