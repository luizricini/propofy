-- Pin an empty search_path on set_updated_at() to clear the Supabase security
-- advisor "function search path mutable" warning. The function only touches
-- NEW and now(), so behaviour is unchanged; this is defensive hardening.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
