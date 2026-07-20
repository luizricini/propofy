"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestReset } from "./actions";
import { emptyState } from "@/lib/auth/form";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/submit-button";

export function ResetForm() {
  const [state, formAction] = useActionState(requestReset, emptyState);

  if (state.notice) {
    return (
      <div className="flex flex-col gap-4">
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          {state.notice}
        </p>
        <Link
          href="/entrar"
          className="text-center text-sm font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
        >
          Voltar para entrar
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <FormField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
        required
      />
      <SubmitButton>Enviar link de redefinição</SubmitButton>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Lembrou a senha?{" "}
        <Link
          href="/entrar"
          className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
