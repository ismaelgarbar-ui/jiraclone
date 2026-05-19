import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-9 w-full rounded-md border bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition-[border-color,box-shadow] duration-150',
            'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
            'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
            error
              ? 'border-red-400 focus:ring-red-500 dark:border-red-600'
              : 'border-gray-200 dark:border-gray-700',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
