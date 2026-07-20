import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Painel — propofy" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already guards this route; this is defense in depth.
  if (!user) redirect("/entrar?next=/painel");

  const { data: profile } = await supabase
    .from("profiles")
    .select("business_name, generation_quota")
    .eq("id", user.id)
    .single();

  const businessName = profile?.business_name?.trim() || "seu negócio";
  const quota = profile?.generation_quota ?? 0;

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <span className="text-lg font-semibold tracking-tight">propofy</span>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-zinc-600 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Sair
          </button>
        </form>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Olá, {businessName}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Você tem{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            {quota} {quota === 1 ? "geração" : "gerações"}
          </strong>{" "}
          gratuitas disponíveis.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <h2 className="text-lg font-medium">Crie sua primeira proposta</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            Preencha os dados do cliente e os itens, e a IA escreve o texto para
            você revisar e publicar como link.
          </p>
          <button
            type="button"
            disabled
            className="mt-6 cursor-not-allowed rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white opacity-50 dark:bg-white dark:text-zinc-900"
          >
            Criar proposta (em breve)
          </button>
        </div>
      </main>
    </div>
  );
}
