# AdCreator AI — Deployment Guide

## What you have
A full Next.js SaaS with:
- Landing page + pricing page
- Supabase auth (sign up / sign in)
- Free tier (3 generations/month) + Pro ($29/mo)
- Stripe subscription checkout + webhook
- Claude-powered ad generation API
- Dashboard with usage gating

---

## Step 1 — Create your accounts (15 min)

1. **Supabase** — supabase.com → New project → copy URL + anon key + service role key
2. **Stripe** — stripe.com → Create product "AdCreator Pro" → $29/month → copy price ID
3. **Anthropic** — console.anthropic.com → API Keys → create key
4. **Vercel** — vercel.com → connect your GitHub account

---

## Step 2 — Set up Supabase database (5 min)

1. Go to your Supabase project → SQL Editor
2. Paste the contents of `supabase-schema.sql` and run it
3. This creates the users table and auto-creates user rows on signup

---

## Step 3 — Deploy to Vercel (10 min)

1. Push this folder to a new GitHub repo
2. Go to vercel.com → New Project → import your repo
3. Add environment variables from `.env.example` (fill in your real values)
4. Deploy — you'll get a live URL instantly

---

## Step 4 — Set up Stripe webhook (5 min)

1. Stripe dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://yourdomain.vercel.app/api/stripe-webhook`
3. Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`
4. Copy the webhook signing secret → add as `STRIPE_WEBHOOK_SECRET` in Vercel env vars
5. Redeploy Vercel so it picks up the new env var

---

## Step 5 — Add your domain (optional, 10 min)

1. Buy a domain on Namecheap (~$12/yr) — e.g. adcreatorai.com
2. Vercel → your project → Settings → Domains → add your domain
3. Follow Vercel's DNS instructions (takes ~10 min to propagate)

---

## Pricing you can charge

| Plan   | Price    | Monthly at 50 users | Monthly at 200 users |
|--------|----------|--------------------|--------------------|
| Free   | $0       | —                  | —                  |
| Pro    | $29/mo   | $1,450             | $5,800             |

Your costs: Supabase free tier handles ~50k users. Anthropic API ~$0.01/generation. Vercel free tier covers hosting.

**Gross margin at scale: ~95%**

---

## Getting your first users

1. Post on Reddit: r/entrepreneur, r/smallbusiness, r/digital_marketing, r/PPC
2. LinkedIn post: "I built an AI ad writer in a weekend — try it free"
3. Product Hunt launch (free) — submit at producthunt.com
4. Offer first 20 users 50% off forever using a Stripe coupon

---

## Questions?
Use Claude to help you debug, add features, or modify any part of this codebase.
