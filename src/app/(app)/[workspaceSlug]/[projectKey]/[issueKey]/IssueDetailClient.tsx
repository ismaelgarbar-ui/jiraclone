'use client'

import { useState } from 'react'
import { updateIssue, deleteIssue, addComment } from '@/lib/actions/issues'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatRelativeDate } from '@/lib/utils'
import type { Issue, IssueStatus, IssueComment } from '@/types'

interface Props {
  issue: Issue & { status: IssueStatus }
  statuses: IssueStatus[]
  comments: IssueComment[]
  workspaceSlug: string
  projectKey: string
  currentUserId: string
}

export function IssueDetailClient({ issue, statuses, comments, workspaceSlug, projectKey, currentUserId }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(issue.title)
  const [description, setDescription] = useState(issue.description || '')
  const [statusId, setStatusId] = useState(issue.status_id)
  const [priority, setPriority] = useState(issue.priority)
  const [dueDate, setDueDate] = useState(issue.due_date || '')
  const [saving, setSaving] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const sortedStatuses = [...statuses].sort((a, b) => a.position - b.position)

  async function handleSave() {
    setSaving(true)
    await updateIssue(issue.id, { title, description: description || null, status_id: statusId, priority, due_date: dueDate || null }, workspaceSlug, projectKey)
    setSaving(false)
    setEditing(false)
  }

  async function handleDelete() {
    if (!confirm('Delete this issue?')) return
    setDeleting(true)
    await deleteIssue(issue.id, workspaceSlug, projectKey)
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmittingComment(true)
    await addComment(issue.id, commentText, workspaceSlug, projectKey, issue.key)
    setCommentText('')
    setSubmittingComment(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-8">
        {/* Main */}
        <div className="space-y-6 min-w-0">
          {/* Title */}
          {editing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base font-semibold"
            />
          ) : (
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">{issue.title}</h1>
          )}

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Description</p>
            {editing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-36 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-[border-color,box-shadow] duration-150"
                placeholder="Add a description..."
              />
            ) : (
              <div
                className="text-sm text-gray-600 dark:text-gray-400 min-h-[56px] rounded-lg bg-gray-50 dark:bg-gray-900/50 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setEditing(true)}
              >
                {description || <span className="text-gray-400 dark:text-gray-500 italic text-xs">Click to add description</span>}
              </div>
            )}
          </div>

          {/* Actions */}
          {editing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} loading={saving} size="sm">Save</Button>
              <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>Edit</Button>
              <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete}>Delete</Button>
            </div>
          )}

          {/* Comments */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Comments {comments.length > 0 && <span className="normal-case font-normal">({comments.length})</span>}
            </p>

            <div className="space-y-2 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="rounded-lg bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {comment.author_id === currentUserId ? 'You' : 'Member'}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formatRelativeDate(comment.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500">No comments yet</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                aria-label="Comment text"
                className="flex-1 h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 transition-[border-color,box-shadow] duration-150"
              />
              <Button type="submit" size="sm" loading={submittingComment} disabled={!commentText.trim()}>
                Post
              </Button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-1">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Status */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Status</p>
              <select
                value={statusId}
                onChange={async (e) => {
                  setStatusId(e.target.value)
                  await updateIssue(issue.id, { status_id: e.target.value }, workspaceSlug, projectKey)
                }}
                className="w-full h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                {sortedStatuses.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Priority</p>
              <select
                value={priority}
                onChange={async (e) => {
                  const val = e.target.value as typeof priority
                  setPriority(val)
                  await updateIssue(issue.id, { priority: val }, workspaceSlug, projectKey)
                }}
                className="w-full h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="lowest">↓ Lowest</option>
                <option value="low">↙ Low</option>
                <option value="medium">→ Medium</option>
                <option value="high">↗ High</option>
                <option value="highest">↑ Highest</option>
              </select>
            </div>

            {/* Due date */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Due date</p>
              <input
                type="date"
                value={dueDate}
                onChange={async (e) => {
                  setDueDate(e.target.value)
                  await updateIssue(issue.id, { due_date: e.target.value || null }, workspaceSlug, projectKey)
                }}
                className="w-full h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Meta */}
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 dark:text-gray-500">Created</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{formatRelativeDate(issue.created_at)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 dark:text-gray-500">Updated</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{formatRelativeDate(issue.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
