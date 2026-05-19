'use client'

import { useState } from 'react'
import { KanbanBoard } from '@/components/board/KanbanBoard'
import { CreateIssueModal } from '@/components/issue/CreateIssueModal'
import type { IssueStatus, Issue } from '@/types'

interface Props {
  statuses: IssueStatus[]
  issues: (Issue & { status: IssueStatus })[]
  workspaceSlug: string
  projectKey: string
  projectId: string
}

export function BoardClient({ statuses, issues, workspaceSlug, projectKey, projectId }: Props) {
  const [createModal, setCreateModal] = useState<{ open: boolean; statusId?: string }>({ open: false })

  return (
    <>
      <KanbanBoard
        statuses={statuses}
        issues={issues}
        workspaceSlug={workspaceSlug}
        projectKey={projectKey}
        onCreateIssue={(statusId) => setCreateModal({ open: true, statusId })}
      />
      <CreateIssueModal
        open={createModal.open}
        onClose={() => setCreateModal({ open: false })}
        projectId={projectId}
        workspaceSlug={workspaceSlug}
        projectKey={projectKey}
        statuses={statuses}
        defaultStatusId={createModal.statusId}
      />
    </>
  )
}
