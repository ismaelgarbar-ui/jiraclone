'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { IssueComment, IssuePriority, IssueWithStatus } from '@/types'

export async function createIssue(
  formData: FormData,
  projectId: string,
  workspaceSlug: string,
  projectKey: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const status_id = formData.get('status_id') as string
  const priority = (formData.get('priority') as IssuePriority) || 'medium'
  const assignee_id = (formData.get('assignee_id') as string) || null
  const due_date = (formData.get('due_date') as string) || null

  const { error } = await supabase.from('issues').insert({
    title,
    description,
    status_id,
    priority,
    assignee_id,
    due_date,
    project_id: projectId,
    reporter_id: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath(`/${workspaceSlug}/${projectKey}`)
  return { success: true }
}

export async function updateIssue(
  issueId: string,
  updates: Partial<{
    title: string
    description: string | null
    status_id: string
    priority: IssuePriority
    assignee_id: string | null
    due_date: string | null
  }>,
  workspaceSlug: string,
  projectKey: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('issues')
    .update(updates)
    .eq('id', issueId)

  if (error) return { error: error.message }

  revalidatePath(`/${workspaceSlug}/${projectKey}`)
  return { success: true }
}

export async function deleteIssue(issueId: string, workspaceSlug: string, projectKey: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('issues').delete().eq('id', issueId)
  if (error) return { error: error.message }

  revalidatePath(`/${workspaceSlug}/${projectKey}`)
  redirect(`/${workspaceSlug}/${projectKey}`)
}

export async function getIssues(projectId: string): Promise<IssueWithStatus[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('issues')
    .select('*, status:issue_statuses(*)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  return (data as IssueWithStatus[]) ?? []
}

export async function getIssueByKey(projectId: string, issueKey: string): Promise<IssueWithStatus | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('issues')
    .select('*, status:issue_statuses(*)')
    .eq('project_id', projectId)
    .eq('key', issueKey)
    .single()

  return data as IssueWithStatus | null
}

export async function moveIssue(
  issueId: string,
  newStatusId: string,
  workspaceSlug: string,
  projectKey: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('issues')
    .update({ status_id: newStatusId })
    .eq('id', issueId)

  if (error) return { error: error.message }

  revalidatePath(`/${workspaceSlug}/${projectKey}`)
  return { success: true }
}

export async function addComment(
  issueId: string,
  content: string,
  workspaceSlug: string,
  projectKey: string,
  issueKey: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('issue_comments').insert({
    issue_id: issueId,
    author_id: user.id,
    content,
  })

  if (error) return { error: error.message }

  revalidatePath(`/${workspaceSlug}/${projectKey}/${issueKey}`)
  return { success: true }
}

export async function getComments(issueId: string): Promise<IssueComment[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('issue_comments')
    .select('*')
    .eq('issue_id', issueId)
    .order('created_at', { ascending: true })

  return (data as IssueComment[]) ?? []
}
