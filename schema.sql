
-- Purchase Order Suite — Database Schema (PostgreSQL / Supabase-compatible)

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references users(id) on delete set null,
  name text not null,
  plan text not null default 'free', -- free | pro | team
  seats int not null default 1,
  created_at timestamptz default now()
);

create table if not exists org_members (
  org_id uuid references orgs(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text not null default 'member', -- owner | admin | member
  primary key (org_id, user_id)
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  tax_id text,
  address_json jsonb, -- {street, city, region, postal, country}
  meta jsonb,
  created_at timestamptz default now()
);

-- Document types: PO | PROFORMA | PACKING | CREDIT
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  type text not null,
  number text, -- e.g. PO-000123 (nullable for drafts)
  currency text not null default 'USD',
  tax_config jsonb, -- {rate: 0.21, inclusive: false}
  buyer_json jsonb,  -- {name, address, vat, ...}
  vendor_json jsonb, -- {vendor_id, name, address, vat, ...}
  line_items jsonb,  -- [{description, qty, unit_price, tax, total}]
  totals_json jsonb, -- {subtotal, tax, shipping, discount, grand_total}
  notes text,
  logo_asset_id uuid,
  status text not null default 'draft', -- draft | finalized | emailed
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_documents_org on documents(org_id);
create index if not exists idx_documents_type on documents(type);

create table if not exists number_sequences (
  org_id uuid references orgs(id) on delete cascade,
  type text not null, -- PO | PROFORMA | PACKING | CREDIT
  prefix text not null default 'PO-',
  next_number bigint not null default 1,
  padding int not null default 4, -- e.g., 0001
  primary key (org_id, type)
);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  type text not null,
  name text not null,   -- e.g., "Construction PO"
  payload_json jsonb not null, -- prefilled form structure
  is_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  org_id uuid references orgs(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'free', -- free | pro | team
  status text not null default 'inactive', -- active | past_due | canceled | trialing | inactive
  current_period_end timestamptz,
  updated_at timestamptz default now(),
  primary key (org_id)
);

create table if not exists emails_sent (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  document_id uuid references documents(id) on delete cascade,
  to_email text not null,
  subject text not null,
  provider_message_id text,
  status text not null default 'queued', -- queued | sent | failed
  error text,
  created_at timestamptz default now()
);

create table if not exists file_assets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  path text not null,
  mime text,
  size_bytes bigint,
  created_at timestamptz default now()
);

-- Helpful computed view example (optional)
create or replace view org_document_counts as
  select org_id, count(*) as total_docs
  from documents
  group by org_id;
