'use client'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 12px' }}>Simple pricing</h1>
        <p style={{ color: '#666', fontSize: 16 }}>Start free. Upgrade when you need more.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Free */}
        <div style={{ border: '1px solid #eee', borderRadius: 16, padding: 28 }}>
          <p style={{ fontWeight: 600, fontSize: 18, margin: '0 0 4px' }}>Free</p>
          <p style={{ fontSize: 36, fontWeight: 700, margin: '12px 0' }}>$0</p>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>No credit card required</p>
          {['3 ad generations/month', '3 variants per generation', 'All 6 platforms', 'All tone options'].map(f => (
            <p key={f} style={{ fontSize: 14, color: '#444', margin: '8px 0', display: 'flex', gap: 8 }}>
              <span style={{ color: '#16a34a' }}>✓</span> {f}
            </p>
          ))}
          <Link href="/auth" style={{ display: 'block', textAlign: 'center', marginTop: 24, padding: '12px', borderRadius: 10, border: '1px solid #ddd', textDecoration: 'none', color: '#333', fontSize: 14 }}>
            Get started free
          </Link>
        </div>

        {/* Pro */}
        <div style={{ border: '2px solid #111', borderRadius: 16, padding: 28, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', fontSize: 11, padding: '3px 12px', borderRadius: 99 }}>
            Most popular
          </div>
          <p style={{ fontWeight: 600, fontSize: 18, margin: '0 0 4px' }}>Pro</p>
          <p style={{ fontSize: 36, fontWeight: 700, margin: '12px 0' }}>$29<span style={{ fontSize: 16, fontWeight: 400, color: '#666' }}>/mo</span></p>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Cancel anytime</p>
          {['Unlimited ad generations', '3 variants per generation', 'All 6 platforms', 'All tone options', 'Saved ad history', 'Priority support'].map(f => (
            <p key={f} style={{ fontSize: 14, color: '#444', margin: '8px 0', display: 'flex', gap: 8 }}>
              <span style={{ color: '#16a34a' }}>✓</span> {f}
            </p>
          ))}
          <Link href="/auth?plan=pro" style={{ display: 'block', textAlign: 'center', marginTop: 24, padding: '12px', borderRadius: 10, background: '#111', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            Start Pro — $29/mo
          </Link>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#999', fontSize: 13, marginTop: 32 }}>
        Prices in USD. Billing via Stripe. Cancel anytime from your account settings.
      </p>
    </main>
  )
}
