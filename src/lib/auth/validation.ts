// Lightweight, server-side form validation for the auth flows. Kept manual
// (no schema lib) — a second use case would justify reaching for one.

export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export function validateEmail(email: string): string | null {
  if (!email) return "Informe seu e-mail.";
  if (!EMAIL_RE.test(email)) return "Informe um e-mail válido.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Informe uma senha.";
  if (password.length < MIN_PASSWORD_LENGTH)
    return `A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  return null;
}

export function validateBusinessName(name: string): string | null {
  if (!name.trim()) return "Informe o nome do seu negócio.";
  return null;
}

// Only allow redirects to internal paths, never to absolute/external URLs (S7).
export function safeNextPath(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/painel";
}
