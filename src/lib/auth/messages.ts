import type { AuthError } from "@supabase/supabase-js";

// Maps Supabase auth errors to PT-BR, user-facing messages. Login errors stay
// deliberately generic so they never reveal which field was wrong (S3).

export const GENERIC_LOGIN_ERROR = "E-mail ou senha incorretos.";

// Signal used by the signup form to render the "account already exists" state
// with links to login and password recovery (S6).
export const EMAIL_TAKEN = "EMAIL_TAKEN";

export function loginErrorMessage(): string {
  return GENERIC_LOGIN_ERROR;
}

export function signupErrorMessage(error: AuthError): string {
  // Supabase returns "User already registered" (422 / user_already_exists)
  // when email confirmations are disabled and the email is taken.
  if (
    error.code === "user_already_exists" ||
    error.code === "email_exists" ||
    /already registered|already been registered/i.test(error.message)
  ) {
    return EMAIL_TAKEN;
  }
  if (error.code === "weak_password") {
    return "Senha muito fraca. Use ao menos 8 caracteres.";
  }
  return "Não foi possível criar a conta. Tente novamente.";
}
