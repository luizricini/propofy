import type { Metadata } from "next";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = { title: "Recuperar senha — propofy" };

export default function RecoverPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Recuperar senha</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Informe seu e-mail e enviaremos um link para redefinir a senha.
        </p>
      </div>
      <ResetForm />
    </div>
  );
}
