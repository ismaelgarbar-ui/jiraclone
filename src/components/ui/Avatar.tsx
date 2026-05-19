import { cn, getUserInitials } from '@/lib/utils'

interface AvatarProps {
  name?: string
  email?: string
  avatarUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, email, avatarUrl, size = 'md', className }: AvatarProps) {
  const initials = getUserInitials(name, email)
  const sizeClasses = { sm: 'h-6 w-6 text-xs', md: 'h-8 w-8 text-sm', lg: 'h-10 w-10 text-base' }

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name || email || 'User'}
        className={cn('rounded-full object-cover', sizeClasses[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center font-semibold flex-shrink-0 select-none',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  )
}
