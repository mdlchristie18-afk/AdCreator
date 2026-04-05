'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

const PLATFORMS = ['Facebook/Instagram','Google Search','LinkedIn','TikTok','Twitter/X','Email']
const TONES = ['Conversational','Professional','Urgent','Witty','Inspirational','Bold']
const FREE_LIMIT = 3

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [product, setProduct] = useState('')
  const [benefit, setBenefit] = useState('')
  const [audience, setAudience] = useState('')
  const [cta, setCta] = useState('')
  const [platform, setPlatform] = useState('Facebook/Instagram')
  const [tone, setTone] = useState('Conversational')
  const [variants, setVariants] = useState(3)
  const [loading, setLoading] = useState(false)
  const [ads, setAds] = useState<any[]>([])
  const [activeVariant, setActiveVariant] = useState(0)
  const [copied, setCopied] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      setUser(user)
      const { data } = await supabase.from('users').select('is_pro, usage_count').eq('id', user.id).single()
      if (data) { setIsPro(data.is_pro); setUsageCount(data.usage_count || 0) }
    }
    load()
  }, [])

  async function generate() {
    if (!product || !benefit) return
    if (!isPro && usageCount >= FREE_LIMIT) { router.push('/pricing'); return }
    setLoading(true); setAds([])

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, benefit, audience, cta, platform, tone, variants })
    })
    const data = await res.json()
    if (data.ads) {
      setAds(data.ads); setActiveVariant(0)
      setUsageCount(c => c + 1)
    }
    setLoading(false)
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const atLimit = !isPro && usageCount >= FREE_LIMIT

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <span style={{ fontWeight: 600, fontSize: 16 }}>AdCreator AI</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {!isPro && (
            <span style={{ fontSize: 13, color: '#666' }}>
              {FREE_LIMIT - usageCount} free {FREE_LIMIT - usageCount === 1 ? 'generation' : 'generations'} left
            </span>
          )}
          {isPro && <span style={{ fontSize: 12, background: '#f0fdf4', color: '#166534', padding: '3px 10px', borderRadius: 99 }}>Pro</span>}
          <button onClick={() => { supabase.auth.signOut(); router.push('/') }} style={{ fontSize: 13, color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', gap: 24 }}>
        {/* Left: inputs */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 20, height: 'fit-content' }}>
          <p style={{ fontWeight: 600, margin: '0 0 16px', fontSize: 15 }}>Your product</p>

          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Product name</label>
          <input value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. QuickBooks, Nike Air Max..."
            style={{ width: '100%', padding: '9px 11px', borderRadius: 7, border: '1px solid #e5e5e5', fontSize: 13, marginBottom: 12, boxSizing: 'border-box', outline: 'none' }} />

          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Key benefit</label>
          <textarea value={benefit} onChange={e => setBenefit(e.target.value)} placeholder="What does it do / why buy it?"
            style={{ width: '100%', padding: '9px 11px', borderRadius: 7, border: '1px solid #e5e5e5', fontSize: 13, marginBottom: 12, minHeight: 72, boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />

          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Target audience</label>
          <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Freelancers, gym-goers..."
            style={{ width: '100%', padding: '9px 11px', borderRadius: 7, border: '1px solid #e5e5e5', fontSize: 13, marginBottom: 12, boxSizing: 'border-box', outline: 'none' }} />

          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Call to action</label>
          <input value={cta} onChange={e => setCta(e.target.value)} placeholder="e.g. Try free, Shop now..."
            style={{ width: '100%', padding: '9px 11px', borderRadius: 7, border: '1px solid #e5e5e5', fontSize: 13, marginBottom: 16, boxSizing: 'border-box', outline: 'none' }} />

          <p style={{ fontWeight: 600, margin: '0 0 10px', fontSize: 15 }}>Platform</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 16 }}>
            {PLATFORMS.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                style={{ fontSize: 11, padding: '6px 4px', borderRadius: 7, border: `1px solid ${platform === p ? '#111' : '#e5e5e5'}`, background: platform === p ? '#111' : '#fff', color: platform === p ? '#fff' : '#555', cursor: 'pointer' }}>
                {p.split('/')[0]}
              </button>
            ))}
          </div>

          <p style={{ fontWeight: 600, margin: '0 0 10px', fontSize: 15 }}>Tone</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: 16 }}>
            {TONES.map(t => (
              <button key={t} onClick={() => setTone(t)}
                style={{ fontSize: 11, padding: '6px 8px', borderRadius: 7, border: `1px solid ${tone === t ? '#111' : '#e5e5e5'}`, background: tone === t ? '#111' : '#fff', color: tone === t ? '#fff' : '#555', cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>

          <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Variants</label>
          <select value={variants} onChange={e => setVariants(Number(e.target.value))}
            style={{ width: '100%', padding: '9px 11px', borderRadius: 7, border: '1px solid #e5e5e5', fontSize: 13, marginBottom: 16, outline: 'none' }}>
            <option value={1}>1 variant</option>
            <option value={2}>2 variants</option>
            <option value={3}>3 variants</option>
          </select>

          {atLimit ? (
            <button onClick={() => router.push('/pricing')}
              style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#16a34a', color: '#fff', border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Upgrade to Pro — $29/mo
            </button>
          ) : (
            <button onClick={generate} disabled={loading || !product || !benefit}
              style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#111', color: '#fff', border: 'none', fontSize: 14, fontWeight: 500, cursor: loading || !product || !benefit ? 'not-allowed' : 'pointer', opacity: loading || !product || !benefit ? 0.5 : 1 }}>
              {loading ? 'Generating...' : 'Generate ads'}
            </button>
          )}
        </div>

        {/* Right: output */}
        <div>
          {!ads.length && !loading && (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 48, textAlign: 'center', color: '#999' }}>
              <p style={{ fontSize: 15, margin: 0 }}>Fill in your product details and hit generate</p>
            </div>
          )}

          {loading && (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 48, textAlign: 'center', color: '#999' }}>
              <p style={{ fontSize: 15, margin: 0 }}>Writing your ads...</p>
            </div>
          )}

          {ads.length > 0 && (
            <div>
              {ads.length > 1 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  {ads.map((_, i) => (
                    <button key={i} onClick={() => setActiveVariant(i)}
                      style={{ fontSize: 13, padding: '6px 14px', borderRadius: 99, border: '1px solid #ddd', background: activeVariant === i ? '#111' : '#fff', color: activeVariant === i ? '#fff' : '#555', cursor: 'pointer' }}>
                      Variant {i + 1}
                    </button>
                  ))}
                </div>
              )}

              {[
                { label: 'Headline', key: 'headline', value: ads[activeVariant]?.headline },
                { label: 'Body copy', key: 'body', value: ads[activeVariant]?.body },
                { label: 'Call to action', key: 'cta', value: ads[activeVariant]?.cta },
              ].map(({ label, key, value }) => (
                <div key={key} style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 20, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999' }}>{label}</span>
                    <button onClick={() => copyText(value, key)}
                      style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, border: '1px solid #e5e5e5', background: '#fff', cursor: 'pointer', color: copied === key ? '#16a34a' : '#555' }}>
                      {copied === key ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ fontSize: 14, color: '#333', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{value}</p>
                </div>
              ))}

              <button onClick={() => copyText(`Headline: ${ads[activeVariant]?.headline}\n\nBody: ${ads[activeVariant]?.body}\n\nCTA: ${ads[activeVariant]?.cta}`, 'all')}
                style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: copied === 'all' ? '#16a34a' : '#555' }}>
                {copied === 'all' ? 'Copied all!' : 'Copy all'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
