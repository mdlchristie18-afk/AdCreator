'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0a', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.15s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.45s forwards; opacity: 0; }
        .fade-up-5 { animation: fadeUp 0.7s ease 0.6s forwards; opacity: 0; }
        .gradient-text { background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #60a5fa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gradient-btn { background: linear-gradient(135deg, #7c3aed, #3b82f6); transition: all 0.3s; }
        .gradient-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(124,58,237,0.4); }
        .card-hover { transition: all 0.3s; border: 1px solid rgba(255,255,255,0.08); }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05) !important; }
        .nav-blur { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glow { box-shadow: 0 0 60px rgba(124,58,237,0.15); }
        .platform-tag { transition: all 0.2s; }
        .platform-tag:hover { background: rgba(124,58,237,0.2) !important; border-color: rgba(124,58,237,0.4) !important; }
        .float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.3s' }} className="nav-blur">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>A</div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>AdCreator AI</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/pricing" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 16px', transition: 'color 0.2s' }}>Pricing</Link>
          <Link href="/auth" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 16px', transition: 'color 0.2s' }}>Sign in</Link>
          <Link href="/auth" className="gradient-btn" style={{ fontSize: 14, color: '#fff', textDecoration: 'none', padding: '9px 20px', borderRadius: 10, fontWeight: 500 }}>Get started free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 13, color: '#a78bfa', fontWeight: 500 }}>Powered by Claude AI</span>
        </div>

        <h1 className="fade-up-2" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-2px', maxWidth: 900 }}>
          Write ads that actually<br /><span className="gradient-text">make people buy</span>
        </h1>

        <p className="fade-up-3" style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Generate professional, high-converting ad copy for any platform in seconds. Stop staring at a blank page.
        </p>

        <div className="fade-up-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" className="gradient-btn" style={{ padding: '14px 32px', borderRadius: 12, color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 600, letterSpacing: '-0.2px' }}>
            Start for free
          </Link>
          <Link href="/pricing" style={{ padding: '14px 32px', borderRadius: 12, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 16, border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s', background: 'rgba(255,255,255,0.04)' }}>
            See pricing →
          </Link>
        </div>

        <div className="fade-up-5" style={{ marginTop: 60, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Facebook', 'Instagram', 'Google', 'LinkedIn', 'TikTok', 'Twitter/X', 'Email'].map(p => (
            <span key={p} className="platform-tag" style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.03)', cursor: 'default' }}>{p}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-1px' }}>Everything you need to<br /><span className="gradient-text">run better ads</span></h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 16, marginBottom: 56 }}>Built for marketers, founders, and agencies who want results — not busywork.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {[
            { icon: '⚡', title: 'Generate in seconds', desc: 'Fill in your product details and get polished, platform-optimized ad copy instantly. No prompting experience needed.' },
            { icon: '🎯', title: '6 platforms, 1 tool', desc: 'Facebook, Google, LinkedIn, TikTok, Twitter, Email — each with copy tailored to that platform\'s format and audience.' },
            { icon: '🔀', title: 'A/B test ready', desc: 'Get 3 completely different variants per generation so you always have options to test and optimize.' },
            { icon: '🎨', title: '6 tone modes', desc: 'Conversational, professional, urgent, witty, inspirational, bold — match your brand voice exactly.' },
            { icon: '✍️', title: 'Long-form copy', desc: 'Not just taglines — full ad copy with headlines, story-driven body text, and punchy CTAs that convert.' },
            { icon: '📋', title: 'One-click copy', desc: 'Copy individual sections or the entire ad with one click. Paste straight into Ads Manager.' },
          ].map(f => (
            <div key={f.title} className="card-hover" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: '28px' }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <p style={{ fontWeight: 600, fontSize: 16, margin: '0 0 8px', letterSpacing: '-0.2px' }}>{f.title}</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { stat: '10x', label: 'Faster than writing by hand' },
            { stat: '6', label: 'Ad platforms supported' },
            { stat: '95%', label: 'Gross margin for you' },
          ].map(s => (
            <div key={s.stat} style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 16, padding: '32px 24px' }}>
              <p style={{ fontSize: 48, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-2px' }} className="gradient-text">{s.stat}</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px 120px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 24, padding: '60px 40px' }} className="glow">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-1px' }}>Ready to write better ads?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, margin: '0 0 32px' }}>Start free — 3 ads included, no credit card required.</p>
          <Link href="/auth" className="gradient-btn" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 12, color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 600 }}>
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
        © 2025 AdCreator AI · <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.25)' }}>Pricing</Link> · <Link href="/auth" style={{ color: 'rgba(255,255,255,0.25)' }}>Sign in</Link>
      </footer>
    </main>
  )
}
