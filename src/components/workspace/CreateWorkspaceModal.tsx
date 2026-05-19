'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createWorkspace } from '@/lib/actions/workspaces'
import { slugify } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
}

export function CreateWorkspaceModal({ open, onClose }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await createWorkspace(new FormData(e.currentTarget))
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create workspace">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          name="name"
          label="Workspace name"
          placeholder="My Team"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
            URL: <span className="font-mono text-gray-700 dark:text-gray-300">/{slugify(name)}</span>
          </p>
        )}

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>Create workspace</Button>
        </div>
      </form>
    </Modal>
  )
}
