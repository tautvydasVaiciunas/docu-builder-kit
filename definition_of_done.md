
# Definition of Done — Purchase Order Suite MVP

## Functional
- User can open /purchase-order-generator, fill form, and export a print-quality PDF in under 60 s.
- Free plan allows 3 documents/mo with watermark; Pro removes watermark, adds logo, history, auto-numbering.
- Email to vendor works and stores an audit record.
- Templates (3 industries) preload the form.
- Numbering sequences persist per org and increment correctly.

## Technical
- Next.js App Router with SSR/ISR; LCP < 2.5 s on generator and support pages.
- Database schema created and migrations committed.
- OpenAPI contracts match working routes (/api/*).
- Stripe Checkout + Webhooks set plan state; Customer Portal available.
- Supabase Auth (magic link) wired; public routes guarded where needed.
- Sitemaps, robots, canonical, metadata tags, and Schema.org JSON-LD present.
- Plausible + PostHog integrated with listed events.
- Unit tests for numbering and total calculations; e2e smoke test for export.

## Content & SEO
- Pages live: /purchase-order-generator, /purchase-order-pdf, /po-number-generator, /purchase-order-vs-invoice, /purchase-order-template-word, /purchase-order-template-google-docs, /purchase-order-template-excel.
- FAQ sections render and emit valid FAQ schema.
- Internal links between pages and to the generator are present.
- Open Graph/Twitter cards configured.

## Security & Privacy
- Input validation server-side; PDF generation sandboxed.
- PII stored minimally; privacy notice and legal disclaimer shown.
- Environment secrets rotated and documented.

## Analytics & Monitoring
- Key metrics visible: activation rate (export_pdf), signup rate, Pro conversion, time_to_pdf.
- Error logging for export and email routes with alerting.

## Handover
- README with setup instructions, env vars, and deploy steps.
- .env.example committed; seed scripts for templates and sample data.
