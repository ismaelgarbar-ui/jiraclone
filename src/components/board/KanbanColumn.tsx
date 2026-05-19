'use client'

import { Droppable } from '@hello-pangea/dnd'
import { IssueCard } from './IssueCard'
import type { IssueStatus, Issue } from '@/types'

interface Props {
  status: IssueStatus
  issues: (Issue & { status: IssueStatus })[]
  workspaceSlug: string
  projectKey: string
  onCreateIssue: () => void
}

export function KanbanColumn({ status, issues, workspaceSlug, projectKey, onCreateIssue }: Props) {
  return (
    <div className="flex flex-col w-68 flex-shrink-0" style={{ width: '272px' }}>
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <span
          className="h-2 w-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: status.color }}
        />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide">{status.name}</span>
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {issues.length}
        </span>
      </div>

      <Droppable droppableId={status.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[120px] rounded-lg transition-colors duration-150 p-1.5 space-y-1.5 ${
              snapshot.isDraggingOver
                ? 'bg-violet-50 dark:bg-violet-950/20 ring-1 ring-violet-200 dark:ring-violet-800'
                : 'bg-gray-100/60 dark:bg-gray-900/40'
            }`}
          >
            {issues.map((issue, index) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                index={index}
                workspaceSlug={workspaceSlug}
                projectKey={projectKey}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={onCreateIssue}
        className="mt-1.5 flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add issue
      </button>
    </div>
  )
}
