import type { Metadata } from "next";
import { UpdatePasswordForm } from "./update-password-form";

export const metadata: Metadata = { title: "Redefinir senha — propofy" };

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Redefinir senha</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Escolha uma nova senha para sua conta.
        </p>
      </div>
      <UpdatePasswordForm />
    </div>
  );
}
