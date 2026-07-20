"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EMAIL_TAKEN, signupErrorMessage } from "@/lib/auth/messages";
import type { ActionState } from "@/lib/auth/form";
import {
  asString,
  normalizeEmail,
  validateBusinessName,
  validateEmail,
  validatePassword,
} from "@/lib/auth/validation";

export async function signup(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = normalizeEmail(formData.get("email"));
  const password = asString(formData.get("password"));
  const businessName = asString(formData.get("business_name")).trim();
  const values = { email, business_name: businessName };

  const fieldErrors: Record<string, string> = {};
  const businessError = validateBusinessName(businessName);
  if (businessError) fieldErrors.business_name = businessError;
  const emailError = validateEmail(email);
  if (emailError) fieldErrors.email = emailError;
  const passwordError = validatePassword(password);
  if (passwordError) fieldErrors.password = passwordError;
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, values };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { business_name: businessName } },
  });

  if (error) {
    const message = signupErrorMessage(error);
    if (message === EMAIL_TAKEN) {
      return { fieldErrors: { email: EMAIL_TAKEN }, values };
    }
    return { error: message, values };
  }

  // Email confirmation is disabled, so signUp returns an active session.
  redirect("/painel");
}
