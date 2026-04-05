import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { product, benefit, audience, cta, platform, tone, variants } = await req.json()

    const prompt = `You are a world-class advertising copywriter who has worked at Ogilvy, BBDO, and Wieden+Kennedy. You write long-form, high-converting ads that tell a story, build desire, and drive action.

Create ${variants} completely different, detailed, long-form ad variant(s) for:

Product: ${product}
Key benefit: ${benefit}
Target audience: ${audience || 'general audience'}
Call to action: ${cta || 'Learn more'}
Platform: ${platform}
Tone: ${tone}

Requirements for each ad:
- Headline: Bold, attention-grabbing, 10-15 words
- Body: LONG and detailed — minimum 150 words. Tell a story. Paint a picture of life before and after using this product. Address objections. Build desire. Use specific details, vivid language, and emotional triggers. Include social proof language. Make the reader feel something.
- CTA: Strong, urgent, specific

Platform tone guide:
- Facebook/Instagram: Storytelling, relatable, emotional, conversational
- Google Search: Benefit-stacked, specific, trust-building
- LinkedIn: Data-driven, professional, ROI-focused, thought leadership angle
- TikTok: Raw, authentic, trending, FOMO-heavy, youth culture
- Twitter/X: Bold takes, punchy, polarizing, share-worthy
- Email: Personal, warm, detailed, like a letter from a friend

Make each variant take a completely different angle — different emotion, different hook, different story.

Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation. Format:
[{"variant":1,"headline":"...","body":"...","cta":"..."}]`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
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
