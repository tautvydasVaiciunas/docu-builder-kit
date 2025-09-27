
# Lovable Prompts — Purchase Order Suite
Use step-by-step prompts. Do NOT paste everything at once. After each step, run and validate.

## Prompt 0 — Project scaffold
Create a Next.js (App Router) + TypeScript project with Tailwind and shadcn/ui. 
Add routes: /, /purchase-order-generator, /purchase-order-pdf, /po-number-generator, /purchase-order-vs-invoice, /purchase-order-template-word, /purchase-order-template-google-docs, /purchase-order-template-excel, /templates/[industry].
Create components: DocumentForm, DocumentPreview, PaywallGuard, NumberingBadge, TemplatePicker, EmailDialog.
Add utilities: currency list, tax calc, formatters; SEO helpers (next-seo config, schema builders for SoftwareApplication, HowTo, FAQ); routes for sitemap.xml and robots.txt.
Style: minimal, rounded-2xl, soft shadows.

## Prompt 1 — Global layout & design system
Implement RootLayout, Header (brand + nav + CTA), Footer. Configure shadcn/ui (Button, Input, Card, Dialog, Accordion, Tooltip, Tabs, Table).
Add a responsive container (max-w-screen-xl) and grid utilities.

## Prompt 2 — Main generator page
Implement /purchase-order-generator with a two-column hero: left <DocumentForm />, right <DocumentPreview /> (print-accurate HTML preview; A4/Letter). 
Include Fill with sample data, Export PDF, Export DOCX, Email to vendor buttons.
Below hero add Feature Highlights, How it works, Pricing (Free vs Pro), FAQ with FAQ schema.

## Prompt 3 — Export pipeline
Create API routes: 
- POST /api/documents (create/update in memory for now)
- POST /api/documents/:id/export?format=pdf|docx
Implement HTML→PDF via Playwright (print CSS) and DOCX via 'docx' npm. 
Free exports include a subtle watermark.

## Prompt 4 — Supabase & persistence
Connect Supabase (Auth + Postgres). Create tables from /schema.sql. 
Wire CRUD for vendors and documents (buyer_json/vendor_json/line_items/totals_json). 
Persist history per org.

## Prompt 5 — Paywall & Stripe
Implement PaywallGuard to enforce 3 free documents/month. 
Add /api/billing/create-checkout-session and /api/billing/webhook (Stripe). 
Unlock Pro features: remove watermark, logo upload, history, auto-numbering, team seats.

## Prompt 6 — Numbering sequences
Add number_sequences table and /api/sequence/next to return and increment the next code (prefix + zero padding) per type (PO|PROFORMA|PACKING|CREDIT). Show NumberingBadge preview in the form.

## Prompt 7 — Email document
Implement /api/documents/:id/email using Resend/Sendgrid. Attach PDF, record in emails_sent. 
Footer in email and PDF: "Generated with <brand>" (link).

## Prompt 8 — Support pages + schema
Build /purchase-order-pdf, /po-number-generator, /purchase-order-vs-invoice, /purchase-order-template-word, /...-google-docs, /...-excel. 
Each page: intro, mini DocumentForm (embedded), 3–5 FAQs with FAQ schema, CTAs back to generator.

## Prompt 9 — Templates hub
Create /templates/[industry] dynamic route with content blocks (hero, preset fields, compliance notes, FAQ). Add TemplatePicker presets for construction, restaurant, agency.

## Prompt 10 — Analytics & performance
Integrate Plausible and PostHog. Track events: form_started, lineitem_added, export_pdf, export_docx, email_sent, signup, pro_shown, pro_started, pro_paid, document_count, time_to_pdf.
Ensure LCP < 2.5 s, no layout shift on preview, proper focus/aria.

## Prompt 11 — SEO polish & deploy
Add canonical, open graph, twitter cards. Validate schema JSON-LD. Generate sitemap from routes. 
Provide .env.example with SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, EMAIL_PROVIDER_KEY, APP_URL. 
Prepare Vercel config and deploy instructions.

### Micro-prompts for refinement
- Replace client preview with a server component for print-accurate HTML; add print.css.
- Implement Watermark toggle based on plan and paywall logic.
- Build TemplatePicker UI with 3 presets and an "Apply" handler that overwrites current form state.
- Add NumberingBadge with live preview from /api/sequence/next.
- Implement EmailDialog with validation and success/failure states.
