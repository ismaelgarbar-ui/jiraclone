'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createIssue } from '@/lib/actions/issues'
import type { IssueStatus } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  projectId: string
  workspaceSlug: string
  projectKey: string
  statuses: IssueStatus[]
  defaultStatusId?: string
}

export function CreateIssueModal({ open, onClose, projectId, workspaceSlug, projectKey, statuses, defaultStatusId }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await createIssue(new FormData(e.currentTarget), projectId, workspaceSlug, projectKey)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      onClose()
      setLoading(false)
    }
  }

  const sortedStatuses = [...statuses].sort((a, b) => a.position - b.position)

  return (
    <Modal open={open} onClose={onClose} title="Create issue" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="title"
          name="title"
          label="Title"
          placeholder="Short, descriptive issue title"
          required
          autoFocus
        />

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
            Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="description"
            className="h-24 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 resize-none"
            placeholder="Add more context..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Status</label>
            <select
              name="status_id"
              defaultValue={defaultStatusId || sortedStatuses[0]?.id}
              className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              {sortedStatuses.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Priority</label>
            <select
              name="priority"
              defaultValue="medium"
              className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              <option value="lowest">↓ Lowest</option>
              <option value="low">↙ Low</option>
              <option value="medium">→ Medium</option>
              <option value="high">↗ High</option>
              <option value="highest">↑ Highest</option>
            </select>
          </div>
        </div>

        <Input
          id="due_date"
          name="due_date"
          type="date"
          label="Due date (optional)"
        />

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>Create issue</Button>
        </div>
      </form>
    </Modal>
  )
}
