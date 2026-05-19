'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CreateProjectModal } from '@/components/workspace/CreateProjectModal'

interface Props {
  workspaceId: string
  workspaceSlug: string
}

export function WorkspaceDashboardClient({ workspaceId, workspaceSlug }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New project
      </Button>
      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        workspaceId={workspaceId}
        workspaceSlug={workspaceSlug}
      />
    </>
  )
}
