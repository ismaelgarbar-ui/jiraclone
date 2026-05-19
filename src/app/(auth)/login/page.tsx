'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from '@/lib/actions/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await signIn(new FormData(e.currentTarget))
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0.5">Sign in</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter your credentials to continue</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        {error && (
          <p className="rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading} className="w-full mt-1">
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
        No account?{' '}
        <Link href="/signup" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  )
}
