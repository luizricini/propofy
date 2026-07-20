"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginErrorMessage } from "@/lib/auth/messages";
import type { ActionState } from "@/lib/auth/form";
import {
  asString,
  normalizeEmail,
  safeNextPath,
  validateEmail,
} from "@/lib/auth/validation";

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = normalizeEmail(formData.get("email"));
  const password = asString(formData.get("password"));
  const next = safeNextPath(asString(formData.get("next")) || null);
  const values = { email };

  const fieldErrors: Record<string, string> = {};
  const emailError = validateEmail(email);
  if (emailError) fieldErrors.email = emailError;
  if (!password) fieldErrors.password = "Informe sua senha.";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, values };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: loginErrorMessage(), values };

  redirect(next);
}
