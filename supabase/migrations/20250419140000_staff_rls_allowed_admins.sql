-- Upgrade: staff tables, updated_at, and strict write RLS.
-- Apply if an older copy of 20250419120000_init_products.sql was already recorded as applied.
-- Safe to run after the revised init migration (idempotent drops/recreates).

create table if not exists public.allowed_admins (
  email text primary key check (email = lower(email))
);

comment on table public.allowed_admins is
  'Lowercase staff emails. insert into public.allowed_admins (email) values (''you@example.com'');';

alter table public.allowed_admins enable row level security;
revoke all on table public.allowed_admins from anon, authenticated;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role = 'admin')
);

comment on table public.admin_profiles is
  'Optional staff by user id. insert into public.admin_profiles (user_id) values (''<auth user uuid>'');';

alter table public.admin_profiles enable row level security;
revoke all on table public.admin_profiles from anon, authenticated;

alter table public.products
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.products_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.products_set_updated_at();

create or replace function public.is_staff_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    exists (
      select 1
      from public.allowed_admins a
      where a.email = lower(nullif(trim(coalesce(auth.jwt() ->> 'email', '')), ''))
    )
    or exists (
      select 1
      from public.admin_profiles p
      where p.user_id = auth.uid()
    );
$$;

revoke all on function public.is_staff_user() from public;
grant execute on function public.is_staff_user() to authenticated;

drop policy if exists "products_select_public" on public.products;
drop policy if exists "products_insert_authenticated" on public.products;
drop policy if exists "products_update_authenticated" on public.products;
drop policy if exists "products_delete_authenticated" on public.products;
drop policy if exists "products_insert_staff" on public.products;
drop policy if exists "products_update_staff" on public.products;
drop policy if exists "products_delete_staff" on public.products;

create policy "products_select_public"
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy "products_insert_staff"
  on public.products
  for insert
  to authenticated
  with check (public.is_staff_user());

create policy "products_update_staff"
  on public.products
  for update
  to authenticated
  using (public.is_staff_user())
  with check (public.is_staff_user());

create policy "products_delete_staff"
  on public.products
  for delete
  to authenticated
  using (public.is_staff_user());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_select_public" on storage.objects;
drop policy if exists "product_images_insert_authenticated" on storage.objects;
drop policy if exists "product_images_update_authenticated" on storage.objects;
drop policy if exists "product_images_delete_authenticated" on storage.objects;
drop policy if exists "product_images_insert_staff" on storage.objects;
drop policy if exists "product_images_update_staff" on storage.objects;
drop policy if exists "product_images_delete_staff" on storage.objects;

create policy "product_images_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy "product_images_insert_staff"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images' and public.is_staff_user());

create policy "product_images_update_staff"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images' and public.is_staff_user())
  with check (bucket_id = 'product-images' and public.is_staff_user());

create policy "product_images_delete_staff"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images' and public.is_staff_user());
