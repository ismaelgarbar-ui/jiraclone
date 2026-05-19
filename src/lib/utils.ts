import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { IssuePriority } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function generateProjectKey(name: string): string {
  const words = name.toUpperCase().replace(/[^A-Z0-9\s]/g, '').split(/\s+/)
  if (words.length >= 2) {
    return words.map((w) => w[0]).join('').slice(0, 5)
  }
  return words[0].slice(0, 5)
}

export function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeDate(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export const priorityConfig: Record<IssuePriority, { label: string; color: string; icon: string }> = {
  lowest: { label: 'Lowest', color: 'text-gray-400 dark:text-gray-500', icon: '↓' },
  low: { label: 'Low', color: 'text-sky-600 dark:text-sky-500', icon: '↙' },
  medium: { label: 'Medium', color: 'text-amber-600 dark:text-amber-500', icon: '→' },
  high: { label: 'High', color: 'text-orange-600 dark:text-orange-500', icon: '↗' },
  highest: { label: 'Highest', color: 'text-red-600 dark:text-red-500', icon: '↑' },
}

export function getUserInitials(name?: string, email?: string): string {
  if (name) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  }
  if (email) return email[0].toUpperCase()
  return '?'
}
