import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase-server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const FREE_LIMIT = 3

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('users').select('is_pro, usage_count').eq('id', user.id).single()
  const isPro = profile?.is_pro || false
  const usageCount = profile?.usage_count || 0

  if (!isPro && usageCount >= FREE_LIMIT) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 403 })
  }

  const { product, benefit, audience, cta, platform, tone, variants } = await req.json()

  const prompt = `You are an expert advertising copywriter. Create ${variants} distinct ad variant(s):

Product: ${product}
Key benefit: ${benefit}
Target audience: ${audience || 'general audience'}
Call to action: ${cta || 'Learn more'}
Platform: ${platform}
Tone: ${tone}

Respond ONLY with a valid JSON array. No markdown, no explanation. Format:
[{"variant":1,"headline":"...","body":"...","cta":"..."}]`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    const raw = message.content.map((b: any) => b.text || '').join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const ads = JSON.parse(clean)

    await supabase.from('users').upsert({ id: user.id, usage_count: usageCount + 1 })

    return NextResponse.json({ ads })
  } catch (e) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
