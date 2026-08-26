-- ============================================================
-- CROM — Esquema completo de Supabase
-- Reconstruido desde el código fuente de la aplicación.
-- Ejecutar en: Dashboard del proyecto nuevo -> SQL Editor -> Run
-- ============================================================

-- ------------------------------------------------------------
-- 1. TABLAS
-- ------------------------------------------------------------

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  code        text not null,
  name        text not null,
  category    text,
  is_active   boolean not null default true,
  image_url   text,
  features    text[] not null default '{}'
);

create index if not exists products_active_created_idx
  on public.products (is_active, created_at desc);
create index if not exists products_category_idx
  on public.products (category);

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  is_active   boolean not null default true,
  image_url   text
);

-- Formulario de contacto de la página /contacto
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  company     text,
  email       text not null,
  type        text,
  phone       text,
  country     text,
  message     text
);

create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);

-- Formulario de contacto antiguo (componente Contact/Contact.jsx)
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  message     text
);

-- Configuración del admin (upsert por 'key', debe ser la primary key)
create table if not exists public.admin_settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz not null default now()
);

-- Analítica simple de visitas
create table if not exists public.page_views (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  page_path   text not null
);

create index if not exists page_views_created_idx
  on public.page_views (created_at desc);

-- ------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
-- ------------------------------------------------------------

alter table public.products            enable row level security;
alter table public.categories          enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.contacts            enable row level security;
alter table public.admin_settings      enable row level security;
alter table public.page_views          enable row level security;

-- Catálogo: lectura pública, escritura solo autenticados
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write"
  on public.products for all
  to authenticated
  using (true) with check (true);

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write"
  on public.categories for all
  to authenticated
  using (true) with check (true);

-- Contacto: cualquiera puede enviar, solo el admin puede leer
drop policy if exists "contact_submissions_public_insert" on public.contact_submissions;
create policy "contact_submissions_public_insert"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "contact_submissions_admin_read" on public.contact_submissions;
create policy "contact_submissions_admin_read"
  on public.contact_submissions for select
  to authenticated
  using (true);

drop policy if exists "contacts_public_insert" on public.contacts;
create policy "contacts_public_insert"
  on public.contacts for insert
  to anon, authenticated
  with check (true);

drop policy if exists "contacts_admin_read" on public.contacts;
create policy "contacts_admin_read"
  on public.contacts for select
  to authenticated
  using (true);

-- Visitas: cualquiera registra, solo el admin consulta
drop policy if exists "page_views_public_insert" on public.page_views;
create policy "page_views_public_insert"
  on public.page_views for insert
  to anon, authenticated
  with check (true);

drop policy if exists "page_views_admin_read" on public.page_views;
create policy "page_views_admin_read"
  on public.page_views for select
  to authenticated
  using (true);

-- Configuración: solo autenticados
drop policy if exists "admin_settings_admin_all" on public.admin_settings;
create policy "admin_settings_admin_all"
  on public.admin_settings for all
  to authenticated
  using (true) with check (true);

-- ------------------------------------------------------------
-- 3. STORAGE
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('product-images',  'product-images',  true),
       ('category-images', 'category-images', true)
on conflict (id) do update set public = true;

drop policy if exists "images_public_read" on storage.objects;
create policy "images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('product-images', 'category-images'));

drop policy if exists "images_admin_write" on storage.objects;
create policy "images_admin_write"
  on storage.objects for all
  to authenticated
  using (bucket_id in ('product-images', 'category-images'))
  with check (bucket_id in ('product-images', 'category-images'));

-- ------------------------------------------------------------
-- 4. DATOS INICIALES
-- ------------------------------------------------------------

insert into public.admin_settings (key, value)
values ('contact_notification_email', 'ventas@hamzisa.com')
on conflict (key) do nothing;

-- Categorías fijas que usa el selector de ProductForm.jsx
insert into public.categories (name, is_active) values
  ('Mochilas escolares', true),
  ('Bolsos de viaje',    true),
  ('Cartucheras',        true),
  ('Mochilas',           true),
  ('Loncheras',          true),
  ('Maletas de viaje',   true)
on conflict do nothing;

-- ------------------------------------------------------------
-- 5. USUARIO ADMINISTRADOR
-- ------------------------------------------------------------
-- Se inserta directo en auth.users porque el endpoint publico de signup
-- rechaza "admin@gmail.com" (Gmail exige 6-30 caracteres de usuario, y
-- "admin" tiene 5, asi que la direccion no es registrable en Gmail).
-- El SQL Editor corre con privilegios completos y omite esa validacion.
--
-- Credenciales: admin@gmail.com / 123456789
-- Cambiar la contrasena desde el panel cuando el sitio este en produccion.

do $$
declare
  new_user_id uuid := gen_random_uuid();
begin
  if exists (select 1 from auth.users where email = 'admin@gmail.com') then
    raise notice 'El usuario admin@gmail.com ya existe, no se crea de nuevo.';
    return;
  end if;

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    'admin@gmail.com',
    extensions.crypt('123456789', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(), now(),
    '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(),
    new_user_id,
    new_user_id::text,
    jsonb_build_object('sub', new_user_id::text, 'email', 'admin@gmail.com', 'email_verified', true),
    'email',
    now(), now(), now()
  );

  raise notice 'Usuario admin@gmail.com creado correctamente.';
end $$;
