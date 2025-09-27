
# Purchase Order Suite — UX Skeleton

## Global
- **Design language:** clean, minimal, Tailwind + shadcn/ui. Rounded-2xl, soft shadows, ample whitespace.
- **Layout:** max-w-screen-xl container, responsive grid (lg: 12-col), prefers-reduced-motion respected.
- **Header/Nav:** brand (logo), nav links {Generator, Templates, Pricing, FAQ}, CTA button "Create PO (free)".
- **Footer:** links (Privacy, Terms, Contact), small print, locale switcher (en → future locales).

## Page 1 — /purchase-order-generator (Primary BOFU)
### Sections (top-to-bottom)
1. **Hero Builder (above the fold)**
   - Left: `DocumentForm` (accordion: Buyer, Vendor, Line items, Taxes & Currency, Notes).
   - Right: `DocumentPreview` (live PDF-like preview with zoom; print CSS).
   - Inline helpers: sample data fill, template picker, currency/tax quick set.
2. **Feature Highlights**
   - Tiles: Auto-numbering • Templates by industry • Send to vendor • Print‑ready PDF/DOCX.
3. **How it works**
   - 1) Fill form → 2) Export PDF/DOCX → 3) (Pro) Save & auto-number → 4) Email vendor.
4. **Templates gallery (programmatic SEO)**
   - Cards linking to /templates/purchase-order-for-{industry} (construction, restaurant, agency, etc.).
5. **Pricing strip**
   - Free vs Pro: Free = 3 docs/mo with watermark; Pro = remove watermark, history, logo, auto-numbering.
6. **FAQ**
   - What is a PO? • PO vs Invoice • How numbering works • Are documents legally binding? (disclaimer).
7. **Trust & compliance**
   - GDPR-friendly note, data storage explanation, contact.

### Key UX rules
- Time‑to‑PDF < 60 s (sample data button).
- Export always available (free adds watermark).
- Upgrade modal triggers: 4th document, remove watermark, add logo, team seats.

## Support Pages (mid/long‑tail)
- **/purchase-order-pdf** — mini-form + deep dive on exporting, FAQ, CTAs back to generator.
- **/po-number-generator** — explains numbering presets and sequences, shows `NumberingBadge` demo.
- **/purchase-order-vs-invoice** — comparison table + CTAs to PO and Proforma.
- **/purchase-order-template-word** — Word‑focused how‑to + download sample .docx (generated on the fly).
- **/purchase-order-template-google-docs**, **/purchase-order-template-excel** — similar structure.
- All support pages: HowTo + FAQ schema, internal links to the main generator.

## Templates Hub
- **/templates/purchase-order-for-{industry}**
  - Hero (industry icon), prefilled fields examples, compliance notes, call‑to‑action.
  - Auto‑generated content blocks (benefits, do's/don'ts, FAQ).

## Secondary Products (staged after MVP)
- **/proforma-invoice-generator** — same layout as PO.
- **/packing-slip-generator** — simplified form (no prices).
- **/credit-note-generator** — supports negative lines & reference to original invoice/PO.

## Components (with responsibilities & key props/events)
- `DocumentForm`
  - Props: `value`, `onChange(value)`, `templates`, `currencyList`.
  - Sub‑components: `BuyerBlock`, `VendorBlock`, `LineItems`, `TaxCurrency`, `Notes`, `LogoUpload`.
  - Events: `onAddLineItem`, `onRemoveLineItem`, `onTemplateApply`, `onSampleData`.
- `DocumentPreview`
  - Props: `document`, `onExport(format)`, `watermark`, `zoom`.
  - Renders: server component for print‑accurate HTML; supports A4/Letter.
- `PaywallGuard`
  - Props: `documentCount`, `plan`.
  - Blocks actions with modal; routes to Checkout.
- `NumberingBadge`
  - Props: `sequence`, `prefix` (e.g., "PO-"), `nextNumber` (e.g., 42).
- `TemplatePicker`
  - Props: `type`, `industryList`; shows presets; emits `onApply(template)`.
- `EmailDialog`
  - Props: `documentId`, `to`, `subject`, `message`, `attachmentType` (pdf|docx).
  - Validates email, shows preview, sends via API, records audit log.

## Accessibility & i18n
- Form labels/aria, focus states, keyboard navigation for line items, color‑contrast AA.
- Copy centralized for future locales; dates/numbers/amounts formatted via Intl.
