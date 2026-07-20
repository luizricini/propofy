-- Base schema for the freemium foundation (SCOPE-001 / M2).
-- One profile row per auth user, holding the business name and the
-- generation quota. Quota is the cost barrier of the freemium model, so it is
-- never client-writable: debits come from a security-definer function added
-- with the document flow (SCOPE-002 / ADR-003). See ADR-004 for the data model.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  business_name text not null,
  generation_quota integer not null default 3 check (generation_quota >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'User profile with business name and freemium generation quota (one row per auth user).';
comment on column public.profiles.generation_quota is 'Remaining free generations. Never written by clients; debited via security-definer function (ADR-003). Default is the single source of the initial freemium allowance.';

-- Keep updated_at fresh on every update.
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create the profile atomically with the auth user, so the freemium quota is
-- assigned in the same insert as the profile (S2). business_name comes from the
-- signup metadata; the initial quota comes from the column default.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, business_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'business_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security: users only ever touch their own profile, and can only
-- change business_name. generation_quota stays out of reach of client writes.
alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (business_name) on public.profiles to authenticated;

create policy profiles_select_own
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
