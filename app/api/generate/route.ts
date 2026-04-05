import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { product, benefit, audience, cta, platform, tone, variants } = await req.json()

    const prompt = `You are a world-class advertising copywriter who has worked at top agencies like Ogilvy, BBDO, and Wieden+Kennedy. You write ads that stop people mid-scroll and make them take action.

Create ${variants} completely different, high-converting ad variant(s) for:

Product: ${product}
Key benefit: ${benefit}
Target audience: ${audience || 'general audience'}
Call to action: ${cta || 'Learn more'}
Platform: ${platform}
Tone: ${tone}

Platform-specific rules:
- Facebook/Instagram: Hook in first line, conversational, emojis ok, 125 chars for body, punch CTA
- Google Search: Keyword-rich headline max 30 chars, benefit-focused description max 90 chars, clear CTA
- LinkedIn: Professional, lead with insight or stat, speak to business outcomes
- TikTok: Extremely casual, trending language, FOMO-driven, short punchy sentences
- Twitter/X: Witty or bold, under 280 chars total, conversation-starting
- Email: Compelling subject line, personalized opener, clear single CTA

Rules for great copy:
- Open with a hook that speaks directly to a pain point or desire
- Use specific numbers and details when possible (not "save time" but "save 3 hours a day")
- Create urgency or FOMO naturally
- Speak TO the audience, not AT them
- Every word must earn its place — cut anything weak
- Make each variant feel completely different in angle and approach

Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation. Format:
[{"variant":1,"headline":"...","body":"...","cta":"..."}]`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
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
