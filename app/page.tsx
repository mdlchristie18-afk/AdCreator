'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>AdCreator AI</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/auth" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', textDecoration: 'none', color: '#333', fontSize: 14 }}>Sign in</Link>
          <Link href="/pricing" style={{ padding: '8px 16px', borderRadius: 8, background: '#111', color: '#fff', textDecoration: 'none', fontSize: 14 }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#166534', fontSize: 13, padding: '4px 12px', borderRadius: 99, marginBottom: 20 }}>
          Powered by Claude AI
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px', color: '#111' }}>
          Write high-converting ads<br />in seconds
        </h1>
        <p style={{ fontSize: 18, color: '#666', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Generate professional ad copy for Facebook, Google, LinkedIn, TikTok, and more — tailored to your product and audience.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/auth" style={{ padding: '14px 28px', borderRadius: 10, background: '#111', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>
            Try free — 3 ads/month
          </Link>
          <Link href="/pricing" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid #ddd', color: '#333', textDecoration: 'none', fontSize: 16 }}>
            See pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '40px 0 80px' }}>
        {[
          { title: '6 platforms', desc: 'Facebook, Google, LinkedIn, TikTok, Twitter, Email — platform-optimized copy every time.' },
          { title: '3 variants per run', desc: 'Get multiple angles on every ad so you can A/B test and find your winner fast.' },
          { title: 'Any tone', desc: 'Conversational, professional, urgent, witty — match your brand voice exactly.' },
        ].map(f => (
          <div key={f.title} style={{ background: '#fafafa', borderRadius: 12, padding: '24px', border: '1px solid #eee' }}>
            <p style={{ fontWeight: 600, margin: '0 0 8px', color: '#111' }}>{f.title}</p>
            <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #eee', padding: '24px 0', textAlign: 'center', color: '#999', fontSize: 13 }}>
        © 2025 AdCreator AI · <Link href="/pricing" style={{ color: '#999' }}>Pricing</Link> · <Link href="/auth" style={{ color: '#999' }}>Sign in</Link>
      </footer>
    </main>
  )
}
