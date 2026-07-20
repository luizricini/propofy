"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "./actions";
import { emptyState } from "@/lib/auth/form";
import { EMAIL_TAKEN } from "@/lib/auth/messages";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/submit-button";

export function SignupForm() {
  const [state, formAction] = useActionState(signup, emptyState);
  const emailTaken = state.fieldErrors?.email === EMAIL_TAKEN;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      ) : null}

      {emailTaken ? (
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          Esta conta já existe.{" "}
          <Link href="/entrar" className="font-medium underline underline-offset-2">
            Entrar
          </Link>{" "}
          ou{" "}
          <Link
            href="/recuperar-senha"
            className="font-medium underline underline-offset-2"
          >
            recuperar a senha
          </Link>
          .
        </div>
      ) : null}

      <FormField
        label="Nome do negócio"
        name="business_name"
        autoComplete="organization"
        defaultValue={state.values?.business_name}
        error={state.fieldErrors?.business_name}
        required
      />
      <FormField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={emailTaken ? undefined : state.fieldErrors?.email}
        required
      />
      <FormField
        label="Senha"
        name="password"
        type="password"
        autoComplete="new-password"
        hint="Ao menos 8 caracteres."
        error={state.fieldErrors?.password}
        required
      />

      <SubmitButton>Criar conta</SubmitButton>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Já tem conta?{" "}
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
