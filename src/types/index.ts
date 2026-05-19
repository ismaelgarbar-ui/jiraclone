export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type IssuePriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest'
export type UserRole = 'owner' | 'admin' | 'member'

// Raw DB rows
export interface Workspace {
  id: string
  name: string
  slug: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface WorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  role: UserRole
  created_at: string
}

export interface Project {
  id: string
  workspace_id: string
  name: string
  key: string
  description: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface IssueStatus {
  id: string
  project_id: string
  name: string
  color: string
  position: number
  created_at: string
}

export interface Issue {
  id: string
  project_id: string
  key: string
  title: string
  description: string | null
  status_id: string
  assignee_id: string | null
  reporter_id: string
  priority: IssuePriority
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface IssueComment {
  id: string
  issue_id: string
  author_id: string
  content: string
  created_at: string
  updated_at: string
}

// Extended join types
export interface IssueWithStatus extends Issue {
  status: IssueStatus
}

export interface IssueWithDetails extends Issue {
  status: IssueStatus
  assignee?: { id: string; email: string; user_metadata: Record<string, string> } | null
}

export interface ProjectWithStatuses extends Project {
  issue_statuses: IssueStatus[]
}

export interface AppUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

// Supabase Database type — drives generic type inference for createBrowserClient/createServerClient
export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: Workspace
        Insert: {
          name: string
          slug: string
          owner_id: string
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Workspace, 'id' | 'created_at'>>
      }
      workspace_members: {
        Row: WorkspaceMember
        Insert: {
          workspace_id: string
          user_id: string
          role?: UserRole
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<WorkspaceMember, 'id' | 'created_at'>>
      }
      projects: {
        Row: Project
        Insert: {
          workspace_id: string
          name: string
          key: string
          created_by: string
          description?: string | null
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Project, 'id' | 'created_at'>>
      }
      issue_statuses: {
        Row: IssueStatus
        Insert: {
          project_id: string
          name: string
          color?: string
          position?: number
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<IssueStatus, 'id' | 'created_at'>>
      }
      issues: {
        Row: Issue
        Insert: {
          project_id: string
          title: string
          status_id: string
          reporter_id: string
          description?: string | null
          assignee_id?: string | null
          priority?: IssuePriority
          due_date?: string | null
          key?: string
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Issue, 'id' | 'created_at'>>
      }
      issue_comments: {
        Row: IssueComment
        Insert: {
          issue_id: string
          author_id: string
          content: string
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<IssueComment, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
