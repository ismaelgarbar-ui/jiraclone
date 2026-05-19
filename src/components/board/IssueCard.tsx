'use client'

import { Draggable } from '@hello-pangea/dnd'
import Link from 'next/link'
import { cn, priorityConfig, formatDate } from '@/lib/utils'
import type { Issue, IssueStatus } from '@/types'

interface Props {
  issue: Issue & { status: IssueStatus }
  index: number
  workspaceSlug: string
  projectKey: string
}

export function IssueCard({ issue, index, workspaceSlug, projectKey }: Props) {
  const priority = priorityConfig[issue.priority]

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-grab active:cursor-grabbing transition-shadow',
            snapshot.isDragging && 'shadow-lg ring-2 ring-violet-400 rotate-1'
          )}
        >
          <Link href={`/${workspaceSlug}/${projectKey}/${issue.key}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-2">
              <span className={cn('text-sm font-medium mt-0.5 flex-shrink-0', priority.color)} title={priority.label}>
                {priority.icon}
              </span>
              <p className="text-sm text-gray-900 dark:text-gray-100 leading-snug hover:text-violet-600 dark:hover:text-violet-400 transition-colors line-clamp-2">
                {issue.title}
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-between mt-2.5">
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{issue.key}</span>
            {issue.due_date && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(issue.due_date)}</span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
