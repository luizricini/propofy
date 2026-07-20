import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = { title: "Criar conta — propofy" };

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Criar conta</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Comece grátis com 3 gerações de propostas.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
