import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
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

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    const raw = message.content.map((b: any) => b.text || '').join('')
    const clean = raw.replace(/```json|```/g, '').trim()
    const ads = JSON.parse(clean)

    return NextResponse.json({ ads })
  } catch (e: any) {
    console.error('Generate error:', e?.message || e)
    return NextResponse.json({ error: e?.message || 'Generation failed' }, { status: 500 })
  }
}
