"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updatePassword } from "./actions";
import { emptyState } from "@/lib/auth/form";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/submit-button";

export function UpdatePasswordForm() {
  const [state, formAction] = useActionState(updatePassword, emptyState);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}{" "}
          <Link
            href="/recuperar-senha"
            className="font-medium underline underline-offset-2"
          >
            Solicitar novo link
          </Link>
        </div>
      ) : null}

      <FormField
        label="Nova senha"
        name="password"
        type="password"
        autoComplete="new-password"
        hint="Ao menos 8 caracteres."
        error={state.fieldErrors?.password}
        required
      />
      <FormField
        label="Confirmar nova senha"
        name="password_confirm"
        type="password"
        autoComplete="new-password"
        error={state.fieldErrors?.password_confirm}
        required
      />

      <SubmitButton>Redefinir senha</SubmitButton>
    </form>
  );
}
