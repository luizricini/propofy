import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { safeNextPath } from "@/lib/auth/validation";

export const metadata: Metadata = { title: "Entrar — propofy" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Entrar</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Acesse sua conta para criar propostas.
        </p>
      </div>
      <LoginForm next={safeNextPath(next ?? null)} />
    </div>
  );
}
