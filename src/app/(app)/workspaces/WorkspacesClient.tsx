'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CreateWorkspaceModal } from '@/components/workspace/CreateWorkspaceModal'

export function WorkspacesClient() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New workspace
      </Button>
      <CreateWorkspaceModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
