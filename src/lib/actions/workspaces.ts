'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import type { Workspace, WorkspaceMember } from '@/types'

export async function createWorkspace(formData: FormData): Promise<{ error: string } | undefined> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const slug = slugify(name)

  const { data, error } = await supabase
    .rpc('create_workspace', { p_name: name, p_slug: slug, p_owner_id: user.id })

  if (error) {
    if (error.code === '23505') return { error: 'A workspace with that name already exists.' }
    return { error: error.message }
  }

  revalidatePath('/workspaces')
  redirect(`/${(data as Workspace).slug}`)
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('workspaces')
    .select('*')
    .order('created_at', { ascending: true })

  return (data as Workspace[]) ?? []
}

export async function getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workspaces')
    .select('*')
    .eq('slug', slug)
    .single()

  return data as Workspace | null
}

export async function getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workspace_members')
    .select('*')
    .eq('workspace_id', workspaceId)

  return (data as WorkspaceMember[]) ?? []
}

export async function deleteWorkspace(workspaceId: string): Promise<{ error: string } | undefined> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('workspaces')
    .delete()
    .eq('id', workspaceId)
    .eq('owner_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/workspaces')
  redirect('/workspaces')
}
