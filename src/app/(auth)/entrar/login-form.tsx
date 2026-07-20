"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions";
import { emptyState } from "@/lib/auth/form";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/submit-button";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(login, emptyState);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="next" value={next} />

      {state.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      ) : null}

      <FormField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
        required
      />
      <FormField
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        error={state.fieldErrors?.password}
        required
      />

      <div className="text-right">
        <Link
          href="/recuperar-senha"
          className="text-sm text-zinc-600 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Esqueci minha senha
        </Link>
      </div>

      <SubmitButton>Entrar</SubmitButton>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Não tem conta?{" "}
        <Link
          href="/cadastro"
          className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
