'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signUp } from '@/lib/actions/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    const result = await signUp(new FormData(e.currentTarget))
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(result.success)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0.5">Create account</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Start managing projects today</p>

      {success ? (
        <div className="rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
          {success}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="full_name"
            name="full_name"
            type="text"
            label="Full name"
            placeholder="Jane Doe"
            required
            autoComplete="name"
          />
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
            minLength={6}
            autoComplete="new-password"
          />

          {error && (
            <p className="rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} className="w-full mt-1">
            Create account
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
        Already have an account?{' '}
        <Link href="/login" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
