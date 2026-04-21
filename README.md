# CoListable — Cross-Listing Platform for Watch Dealers

The cross-listing platform that lets watch dealers manage inventory in one place, publish to marketplaces and forums, and delist everywhere with one click.

**Live product:** [colistable.com](https://colistable.com)
**Chrome extension:** [CoListable for Forums](https://chromewebstore.google.com/detail/colistable-for-forums/)
**Video walkthrough:** [https://www.loom.com/share/7a535dd9da314a9685d2d36ad4354302]

---

## Problem Statement

Wrist watch resellers waste a tremendous amount of time manually listing their inventory across multiple marketplaces. I experienced this pain firsthand when I listed my watch for sale on multiple marketplaces: eBay, Chrono24, and Reddit's r/watchexchange. When it sold on Reddit, I forgot to take down the eBay listing. A second buyer purchased it on eBay before I could react — I had to cancel the order, deal with an angry buyer, and eBay penalized my seller account with a defect and a fine. I'm a casual seller who did this once. Watch dealers do it 30 to 50 times a month for their real businesses.

Through 70+ customer discovery interviews with watch dealers across the U.S., this pain point was unanimous: cross-listing is the #1 operational pain point in the business. Dealers spend 6–8 hours per week creating duplicate listings across 5–8 platforms (eBay, Chrono24, WatchUSeek, Rolex Forums, Reddit r/watchexchange, Facebook Groups, Shopify, Bezel) — each with different formats, fields, and audiences. When a watch sells on one platform, they manually log into every other platform to delist. One missed delist means canceled orders, refund disputes, platform penalties, and reputational damage in tight-knit communities where trust is everything.

**Who is most affected:** Independent watch dealers managing 20–200 watches across multiple platforms. This is the gray market — not authorized dealers, but professional resellers who rely on forum reputation and marketplace ratings to build their business.

**What success looks like:** A dealer adds a watch once, publishes to all their platforms in under 2 minutes, and delists everywhere with one click when it sells. CoListable reduces that 6–8 hours per week to under 1 hour. They have higher sell-through rates, maintain high seller reputations, and increase their revenue.

---

## Solution Overview

CoListable is a full-stack SaaS platform with three core components:

**1. Web application** — centralized inventory management with a dashboard (KPIs, sync status, activity feed), a template engine with 40+ variables for platform-specific listing generation, one-click delist across all platforms, and a built-in sold-inventory archive.

**2. API integrations** — direct OAuth integrations with eBay (Trading API, Account API v2) and Chrono24 for publishing, syncing, and delisting. Shopify and Bezel integrations are in testing.

**3. Chrome extension ("CoListable for Forums")** — a browser extension that injects a sidebar into watch forum post composers (WatchUSeek, Rolex Forums, Reddit, Facebook Groups). The dealer picks a watch from their inventory, and the extension fills the entire post — title, body, photos, and signature — formatted for that specific platform.

### Where AI fits

AI plays two distinct roles:

**Product-level AI (core functionality):**
- Listing description generation — given a watch's specs and condition, AI generates platform-optimized copy. Forum posts get conversational language; eBay listings get structured item specifics; Reddit posts get Markdown formatting.
- Watch identification from photos — upload a photo, AI identifies the brand, model, and reference number.
- Template variable resolution — AI assists in normalizing free-text condition notes into structured data.

**Development-level AI (how it was built):**
- The entire product was built using AI-assisted development tools: Lovable (full-stack app generation), Cursor (code editing and refactoring), and Claude Code (architecture decisions, debugging, multi-file changes).
- AI tools are the reason a non-technical founder could ship 91,000 lines of production code with OAuth integrations and a Chrome extension.

AI makes this solution meaningfully better than a non-AI approach because the template engine handles structure, but AI handles the creative and variable content (descriptions, titles, watch identification) that would otherwise require manual writing per platform per watch.

---

## AI Integration

**LLMs, models, and APIs used:**
- Claude (Anthropic) — primary LLM for listing description generation, watch identification, and development assistance via Claude Code CLI
- Lovable — AI-powered full-stack development platform (React/TypeScript/Supabase code generation)
- Cursor — AI-assisted code editor for refactoring, debugging, and rapid iteration

**Patterns and techniques used:**
- **Structured output generation** — AI generates listing content that must conform to platform-specific formats (BBCode for forums, Markdown for Reddit, HTML for eBay) with strict variable substitution. The template engine renders `{brand}`, `{model}`, `{reference_number}`, `{price_formatted}`, `{condition}`, `{signature}`, and 35+ other variables per platform.
- **Template-based prompting** — dealer-controlled templates with AI-filled variables, not free-form generation. This gives dealers control over their voice while automating the tedious parts.
- **Multi-modal input** — the watch identification feature accepts photos and returns structured data (brand, model, reference) using vision capabilities.
- **Safety guardrails** — the Chrome extension has strict rules: never fall back to hardcoded brand-name generation if the template engine fails, never post a malformed listing to a forum where reputation matters. The extension shows an error state rather than guessing.

**Tradeoffs considered:**
- **Cost vs. quality:** Using Claude for description generation adds per-listing cost (~$0.01-0.03/listing). Mitigated by caching generated descriptions and only regenerating when specs change.
- **Latency:** AI generation adds 2–4 seconds to the listing creation flow. Acceptable because the alternative (manual writing) takes 10–15 minutes.
- **Accuracy:** AI occasionally generates incorrect specs (e.g., wrong case size, confusing similar references like 116610LN vs. 116610LV). Mitigated by using template variables for factual specs and AI only for descriptive prose. The dealer always reviews before publishing.
- **Reliability:** Edge functions wrap all AI calls in try/catch with structured error responses. If the AI service is unavailable, the template engine still works — it just leaves the AI-generated fields blank for the dealer to fill manually.

**Where AI exceeded expectations:** Development speed. 68,000+ lines of frontend code, 18,000+ lines of edge functions, a Chrome extension, and 111 database migrations — shipped in months by a solo non-technical founder. That would not have been possible without AI coding tools.

**Where AI fell short:** Watch-specific domain knowledge. AI doesn't reliably know the difference between a Rolex 116610LN and 116610LV (black vs. green dial). It doesn't know that "LNIB" means "like new in box" or that "full set" means box, papers, and warranty card. Domain-specific vocabulary had to be manually built into templates and validation logic rather than relying on AI to infer it.

---

## Architecture / Design Decisions

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend                                │
│         React · TypeScript · Vite · Tailwind · shadcn/ui     │
│                                                              │
│  Pages: Dashboard, Inventory, Templates, Integrations,       │
│         Analytics, Catalog, Settings, Admin                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│                                                              │
│  ┌────────────┐  ┌───────────┐  ┌─────────────────────────┐│
│  │  Postgres   │  │   Auth    │  │    78 Edge Functions     ││
│  │  (111       │  │  (OAuth,  │  │                         ││
│  │  migrations)│  │   RLS)    │  │  • eBay CRUD + sync     ││
│  └────────────┘  └───────────┘  │  • Chrono24 feed        ││
│                                  │  • Shopify webhooks     ││
│                                  │  • Listing generation   ││
│                                  │  • Watch identification ││
│                                  │  • Price lookup         ││
│                                  │  • Beta/billing flows   ││
│                                  └─────────────────────────┘│
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┼────────────┬──────────────┐
              ▼            ▼            ▼              ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  eBay    │ │ Chrono24 │ │ Shopify  │ │ ImageKit │
        │  APIs    │ │   API    │ │   API    │ │   CDN    │
        └──────────┘ └──────────┘ └──────────┘ └──────────┘

┌─────────────────────────────────────────────────────────────┐
│              Chrome Extension (Manifest V3)                  │
│                                                              │
│  ┌─────────────────┐     ┌────────────────────────────────┐ │
│  │ Content Scripts  │◄───►│  postMessage Bridge            │ │
│  │ (per-forum       │     │  (communicates with web app)   │ │
│  │  injection)      │     └────────────────────────────────┘ │
│  └────────┬────────┘                                         │
│           ▼                                                  │
│  ┌─────────────────────────────────────────┐                │
│  │ Forum Composer Fill                      │                │
│  │ WatchUSeek · Rolex Forums · Reddit       │                │
│  │ Facebook Groups · r/watchexchange        │                │
│  └─────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**1. Bridge-first Chrome extension architecture.**
The extension communicates with the web app via a postMessage bridge, not direct API calls. This avoids CORS issues and means the extension doesn't need its own auth flow — it piggybacks on the user's existing CoListable session. The content script injects into forum pages and scopes its DOM manipulation to the post composer.

**2. eBay OAuth with bi-directional sync.**
eBay integration uses OAuth 2.0 with the Trading API for listings and Account API v2 for payout method verification (required before publishing). A `sync_log` table handles conflict resolution when the same item is modified on both eBay and CoListable. Webhooks detect incoming sale events to trigger cross-platform delist.

**3. Template engine over pure AI generation.**
Dealers want control over their listing voice. Rather than fully AI-generated listings, CoListable uses a template engine with 40+ variables (`{brand}`, `{model}`, `{reference_number}`, `{price_formatted}`, `{condition}`, `{box_and_papers_summary}`, `{signature}`, `{photo_links}`, etc.) and per-platform rendering (BBCode for forums, Markdown for Reddit, HTML for eBay). AI fills the creative variables; the dealer controls the structure.

**4. Strict dialog scoping for Facebook Groups.**
The Chrome extension fills Facebook Group post composers by scoping DOM queries to `div[role="dialog"]` to avoid accidentally filling other input fields on the page. This was a hard-won lesson from testing — Facebook's DOM has many text inputs and the extension must only touch the composer.

**5. `refetchQueries` over `invalidateQueries` for user-triggered actions.**
For actions where the user expects immediate feedback (publishing, delisting), the app uses React Query's `refetchQueries` to guarantee fresh data on screen. Background syncs use `invalidateQueries` for eventual consistency. This pattern was established as an explicit rule in AI-assisted development because the AI would default to `invalidateQueries` everywhere.

**6. `bulkCapable` flag for channel gating.**
Platform publishing is gated by a `bulkCapable` flag that distinguishes between API-integrated platforms (eBay, Chrono24, Shopify — can publish programmatically) and extension-based platforms (forums, Reddit, Facebook — require the Chrome extension for posting). This prevents the UI from offering "one-click publish" for platforms that physically can't support it.

---

## What Did AI Help You Do Faster, and Where Did It Get in Your Way?

**What AI accelerated:**
- **Full-stack scaffolding:** Lovable generated the initial React/TypeScript/Supabase app structure in hours. Database schemas, auth flows, and CRUD operations came essentially free.
- **OAuth integration:** Claude helped navigate eBay's complex API documentation (Trading API, Inventory API, Account API v2) and generate the edge functions for token exchange, refresh, and API calls. Without AI, the eBay integration alone would have taken 2–3x longer.
- **Chrome extension:** The postMessage bridge pattern, content script injection, manifest v3 configuration, and per-forum DOM selectors were all AI-assisted. This was my first Chrome extension.
- **UI/UX:** shadcn/ui + Tailwind + AI-assisted component generation meant I could build a polished, responsive UI without a designer. The design system (Inter + Plus Jakarta Sans, cerulean #0091D2, navy #0A1F3F) was maintained consistently across 50+ pages and components.
- **Iteration speed:** I could describe a feature in natural language and have working code in minutes. The template engine, bulk publishing flow, and admin dashboard were all built this way.

**Where AI got in my way:**
- **Architecture drift:** AI-generated code doesn't always follow the patterns you've established. I had to create explicit rules (like `refetchQueries` over `invalidateQueries`, strict dialog scoping, `bulkCapable` gating) and enforce them in every prompt because the AI would default to its own conventions.
- **Stale context:** Long coding sessions would sometimes produce code that conflicted with earlier changes in the same session. I learned to keep prompts focused, reference specific files, and break large changes into sequential steps.
- **False confidence:** AI coding tools can generate plausible-looking code that silently fails. The Facebook Groups composer fill worked perfectly on the first attempt — until I tested it on a page with multiple dialogs open. Debugging AI-generated code requires reading every line, not just trusting the output, and iterating on my prompting.
- **Domain knowledge gaps:** AI doesn't know watch industry conventions. "LNIB" means "like new in box." "Full set" means box, papers, warranty card. "39mm" should never be written as "thirty-nine millimeters." I had to manually build the domain vocabulary into templates and validation rather than relying on AI to know it.

**How it changed my approach:** I now treat AI tools as a very fast junior developer. They can scaffold, iterate, and handle boilerplate, but I make every architecture decision and review every critical path. The best results came from extremely specific prompts with explicit constraints — never open-ended "build me X" requests.

---

## Getting Started / Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- Supabase account (for backend)
- eBay Developer Account (optional, for eBay integration)

### Local Development

```bash
git clone https://github.com/your-username/colistable.git
cd colistable

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase URL and anon key (minimum required)

# Start development server
npm run dev
```

### Chrome Extension (local development)

```bash
cd extension

# Load unpacked extension in Chrome:
# 1. Navigate to chrome://extensions
# 2. Enable "Developer Mode" (top right)
# 3. Click "Load unpacked"
# 4. Select the extension/ folder
```

### Edge Functions (Supabase)

Edge functions are deployed to Supabase and run serverside. They require the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-id

# Deploy all functions
supabase functions deploy
```

### Environment Variables

See `.env.example` for the full list. At minimum, you need:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

For full functionality (eBay publishing, email, AI features), configure the additional variables documented in `.env.example`.

---

## Demo

**Live product:** [colistable.com](https://colistable.com)

To explore with sample data, use the demo account:
- Visit [colistable.com](https://colistable.com) and click "Sign In"
- Email: demo@colistable.com
- Password: colistable

The demo account is pre-seeded with watch inventory and simulated platform connections. A `reset-demo-account` edge function restores it to default state after each session.

**Key flows to explore:**
1. **Dashboard** — KPIs (total watches, value, posted/draft counts), connected platform status, recent activity feed
2. **Inventory** — browse watches, view per-platform posting status, filter by brand/status/platform
3. **Add Watch** — create a new listing with specs, photos (via ImageKit CDN), and AI-generated descriptions
4. **Templates** — view per-platform templates with variable highlighting and live preview
5. **Integrations** — see connected vs. available platforms, OAuth connection flows

---

## Testing / Error Handling

**Error handling patterns implemented:**
- **OAuth token refresh:** exponential backoff for eBay API rate limits, automatic token refresh before expiration
- **Sync conflict resolution:** `sync_log` table tracks per-platform modifications; last-write-wins with audit trail for manual review
- **Chrome extension graceful degradation:** if the template engine fails, the extension shows an error state rather than posting a malformed listing. It never falls back to hardcoded or guessed content.
- **Edge function error boundaries:** every Supabase edge function wraps API calls in try/catch with structured JSON error responses
- **Optimistic UI with rollback:** inventory actions use React Query's optimistic updates with automatic rollback on failure

**Edge cases considered:**
- Dealer has the same watch listed on eBay and Chrono24 at different prices — the sync engine tracks per-platform pricing independently
- Forum post composer has changed DOM structure after a site update — the extension uses multiple selector strategies with fallback chains
- eBay OAuth token expires mid-sync — refresh token flow with retry logic and user notification if refresh also fails
- Dealer uploads 20+ photos — ImageKit CDN handles resizing and optimization; the app enforces per-platform photo limits (eBay: 24, forums: typically 10)
- Double-sell scenario (the problem that started this whole project) — sale event detection triggers cross-platform delist queue with confirmation

---

## Future Improvements / Stretch Goals

1. **AI-powered pricing agent** — RAG-based system that embeds sold listings from eBay and Chrono24, then suggests competitive pricing for a given watch based on condition, completeness, and recent market data. This would be an agentic workflow: scrape → embed → retrieve → recommend.

2. **MCP server integration** — expose CoListable's inventory and listing APIs as MCP (Model Context Protocol) tools so AI assistants can manage watch inventory conversationally.

3. **Multi-dealer marketplace analytics** — aggregate anonymized listing data across CoListable dealers to provide market intelligence: average days to sell by brand/model, price trends by condition, platform performance comparisons.

4. **Conversational listing creation** — instead of form fields, let dealers describe a watch in natural language ("Rolex Sub, 2019, full set, 9/10 condition, asking $12,400") and have AI extract structured data with dealer confirmation before publishing.

5. **Automated forum post scheduling** — queue forum posts and publish at optimal times based on forum traffic patterns and timezone-aware scheduling.

---

## Codebase Overview

| Area | Files | Lines | Description |
|------|-------|-------|-------------|
| Frontend | `src/` | ~68,000 | React/TypeScript app with 50+ pages and components |
| Edge Functions | `supabase/functions/` | ~18,000 | 78 serverless functions (eBay, Chrono24, Shopify, billing, AI) |
| Chrome Extension | `extension/` | ~1,800 | Manifest V3 extension with content scripts for 5 forum platforms |
| Migrations | `supabase/migrations/` | ~3,600 | 111 database migrations defining the full schema |
| **Total** | **549 files** | **~91,000** | |

---

## Links

- **Live product:** [colistable.com](https://colistable.com)
- **Chrome extension:** [Chrome Web Store](https://chromewebstore.google.com/detail/colistable-for-forums/)
- **Video walkthrough:** [Loom link]

---

## Acknowledgments

**Third-party services and libraries:**
- [Supabase](https://supabase.com) — backend (Postgres, auth, edge functions, storage)
- [Lovable](https://lovable.dev) — AI-powered app development platform
- [shadcn/ui](https://ui.shadcn.com) — UI component library
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework
- [React Query / TanStack Query](https://tanstack.com/query) — server state management
- [ImageKit](https://imagekit.io) — image CDN and optimization
- [Resend](https://resend.com) — transactional email
- [PostHog](https://posthog.com) — product analytics
- [Stripe](https://stripe.com) — billing and payments
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) — bot protection

**Third-party APIs:**
- [eBay Trading API / Inventory API / Account API v2](https://developer.ebay.com)
- [Chrono24 Dealer API](https://www.chrono24.com)
- [Shopify Admin API](https://shopify.dev)
- [Firecrawl](https://firecrawl.dev) — web scraping for price lookup

**AI tools used in development:**
- [Claude](https://anthropic.com) (Anthropic) — primary LLM for development assistance and in-product AI features
- [Lovable](https://lovable.dev) — AI-powered full-stack code generation
- [Cursor](https://cursor.com) — AI-assisted code editing
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — CLI agentic coding tool
