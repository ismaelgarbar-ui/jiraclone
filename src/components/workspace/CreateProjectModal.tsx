'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createProject } from '@/lib/actions/projects'
import { generateProjectKey } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
  workspaceId: string
  workspaceSlug: string
}

export function CreateProjectModal({ open, onClose, workspaceId, workspaceSlug }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
  const [keyEdited, setKeyEdited] = useState(false)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    if (!keyEdited) setKey(generateProjectKey(e.target.value))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await createProject(new FormData(e.currentTarget), workspaceId, workspaceSlug)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create project">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          name="name"
          label="Project name"
          placeholder="My Project"
          required
          value={name}
          onChange={handleNameChange}
          autoFocus
        />
        <Input
          id="key"
          name="key"
          label="Project key"
          placeholder="PROJ"
          required
          value={key}
          onChange={(e) => { setKey(e.target.value.toUpperCase()); setKeyEdited(true) }}
          pattern="^[A-Z][A-Z0-9]{1,9}$"
          title="2–10 uppercase letters/numbers starting with a letter"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
          Used for issue keys, e.g. {key || 'PROJ'}-1
        </p>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
            Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="description"
            className="h-20 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 resize-none"
            placeholder="What is this project about?"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>Create project</Button>
        </div>
      </form>
    </Modal>
  )
}
