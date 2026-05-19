'use client'

import { useState, useCallback } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { KanbanColumn } from './KanbanColumn'
import { moveIssue } from '@/lib/actions/issues'
import type { IssueStatus, Issue } from '@/types'

interface Props {
  statuses: IssueStatus[]
  issues: (Issue & { status: IssueStatus })[]
  workspaceSlug: string
  projectKey: string
  onCreateIssue: (statusId: string) => void
}

export function KanbanBoard({ statuses, issues, workspaceSlug, projectKey, onCreateIssue }: Props) {
  const sortedStatuses = [...statuses].sort((a, b) => a.position - b.position)

  const [optimisticIssues, setOptimisticIssues] = useState(issues)

  const issuesByStatus = sortedStatuses.reduce<Record<string, typeof issues>>((acc, status) => {
    acc[status.id] = optimisticIssues.filter((i) => i.status_id === status.id)
    return acc
  }, {})

  const handleDragEnd = useCallback(async (result: DropResult) => {
    const { draggableId, destination, source } = result
    if (!destination || destination.droppableId === source.droppableId) return

    const issue = optimisticIssues.find((i) => i.id === draggableId)
    if (!issue) return

    const newStatus = statuses.find((s) => s.id === destination.droppableId)
    if (!newStatus) return

    // Optimistic update
    setOptimisticIssues((prev) =>
      prev.map((i) => i.id === draggableId ? { ...i, status_id: destination.droppableId, status: newStatus } : i)
    )

    const res = await moveIssue(draggableId, destination.droppableId, workspaceSlug, projectKey)
    if (res?.error) {
      // Revert on error
      setOptimisticIssues(issues)
    }
  }, [optimisticIssues, issues, statuses, workspaceSlug, projectKey])

  // Sync when parent issues change (after revalidation)
  if (JSON.stringify(issues.map(i => i.status_id)) !== JSON.stringify(optimisticIssues.map(i => i.status_id))) {
    setOptimisticIssues(issues)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto pb-4 px-1">
        {sortedStatuses.map((status) => (
          <KanbanColumn
            key={status.id}
            status={status}
            issues={issuesByStatus[status.id] ?? []}
            workspaceSlug={workspaceSlug}
            projectKey={projectKey}
            onCreateIssue={() => onCreateIssue(status.id)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
