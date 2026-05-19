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
    <div className="flex flex-col w-72 flex-shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span
          className="h-2.5 w-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: status.color }}
        />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{status.name}</span>
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 font-medium">
          {issues.length}
        </span>
      </div>

      {/* Issues list */}
      <Droppable droppableId={status.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[120px] rounded-xl transition-colors p-1 space-y-2 ${
              snapshot.isDraggingOver
                ? 'bg-violet-50 dark:bg-violet-950/30 ring-2 ring-violet-300 dark:ring-violet-700'
                : 'bg-gray-100/50 dark:bg-gray-900/50'
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

      {/* Add issue button */}
      <button
        onClick={onCreateIssue}
        className="mt-2 flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add issue
      </button>
    </div>
  )
}
