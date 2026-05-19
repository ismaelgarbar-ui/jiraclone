import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        !color && 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
        className
      )}
      style={color ? {
        backgroundColor: color + '1f',
        color,
      } : undefined}
    >
      {children}
    </span>
  )
}
