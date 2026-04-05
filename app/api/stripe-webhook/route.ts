import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Response<Stripe.Checkout.Session>
    const userId = session.metadata?.user_id
    if (userId) {
      await supabase.from('users').upsert({ id: userId, is_pro: true, stripe_customer_id: session.customer as string })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    const { data } = await supabase.from('users').select('id').eq('stripe_customer_id', sub.customer).single()
    if (data) {
      await supabase.from('users').update({ is_pro: false }).eq('id', data.id)
    }
  }

  return NextResponse.json({ received: true })
}
