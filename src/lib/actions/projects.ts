'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Project, ProjectWithStatuses } from '@/types'

const DEFAULT_STATUSES = [
  { name: 'To Do', color: '#6B7280', position: 0 },
  { name: 'In Progress', color: '#3B82F6', position: 1 },
  { name: 'In Review', color: '#F59E0B', position: 2 },
  { name: 'Done', color: '#10B981', position: 3 },
]

export async function createProject(
  formData: FormData,
  workspaceId: string,
  workspaceSlug: string
): Promise<{ error: string } | undefined> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const key = (formData.get('key') as string).toUpperCase()
  const description = (formData.get('description') as string) || null

  const { data: project, error } = await supabase
    .from('projects')
    .insert({ name, key, description, workspace_id: workspaceId, created_by: user.id })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return { error: 'A project with that key already exists in this workspace.' }
    return { error: error.message }
  }

  const p = project as Project
  await supabase.from('issue_statuses').insert(
    DEFAULT_STATUSES.map((s) => ({ ...s, project_id: p.id }))
  )

  revalidatePath(`/${workspaceSlug}`)
  redirect(`/${workspaceSlug}/${p.key}`)
}

export async function getProjects(workspaceId: string): Promise<Project[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: true })

  return (data as Project[]) ?? []
}

export async function getProjectByKey(workspaceId: string, key: string): Promise<ProjectWithStatuses | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('projects')
    .select('*, issue_statuses(*)')
    .eq('workspace_id', workspaceId)
    .eq('key', key.toUpperCase())
    .single()

  return data as ProjectWithStatuses | null
}

export async function updateProject(
  projectId: string,
  updates: { name?: string; description?: string }
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)

  if (error) return { error: error.message }
  return { success: true }
}
