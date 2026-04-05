'use client'
import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter, useSearchParams } from 'next/navigation'

function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setMessage(error.message); setLoading(false); return }
      setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setMessage(error.message); setLoading(false); return }
      router.push(plan === 'pro' ? '/dashboard?upgrade=true' : '/dashboard')
    }
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 400, margin: '80px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ color: '#666', fontSize: 15 }}>
          {mode === 'signup' ? '3 free ads/month — no credit card needed' : 'Sign in to your account'}
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} required
          style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, outline: 'none' }} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, outline: 'none' }} />
        <button type="submit" disabled={loading}
          style={{ padding: '13px', borderRadius: 8, background: '#111', color: '#fff', border: 'none', fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Loading...' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: 16, textAlign: 'center', fontSize: 14, color: message.includes('Check') ? '#16a34a' : '#dc2626' }}>
          {message}
        </p>
      )}
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
        {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          style={{ background: 'none', border: 'none', color: '#111', fontWeight: 500, cursor: 'pointer', fontSize: 14, textDecoration: 'underline' }}>
          {mode === 'signup' ? 'Sign in' : 'Sign up free'}
        </button>
      </p>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ fontFamily: 'system-ui', textAlign: 'center', marginTop: 80, color: '#666' }}>Loading...</div>}>
      <AuthForm />
    </Suspense>
  )
}
