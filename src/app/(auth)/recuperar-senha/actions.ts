"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/auth/form";
import { normalizeEmail, validateEmail } from "@/lib/auth/validation";

const NEUTRAL_NOTICE =
  "Se houver uma conta com este e-mail, enviamos um link para redefinir a senha.";

export async function requestReset(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = normalizeEmail(formData.get("email"));
  const emailError = validateEmail(email);
  if (emailError) return { fieldErrors: { email: emailError }, values: { email } };

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const origin = `${proto}://${host}`;

  const supabase = await createClient();
  // Ignore the result on purpose: the response is always neutral so we never
  // reveal whether the email is registered.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/redefinir-senha`,
  });

  return { notice: NEUTRAL_NOTICE };
}
