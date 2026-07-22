import Link from "next/link";

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/cadastro"
      className={`inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${className}`}
    >
      {children}
    </Link>
  );
}

const steps = [
  {
    title: "Preencha os dados",
    body: "Cliente, itens do serviço com preço e um resumo do que você vai fazer. Rápido, direto do celular.",
  },
  {
    title: "A IA escreve por você",
    body: "Em segundos, uma proposta com texto profissional e persuasivo — no tom certo, sem você travar na frase.",
  },
  {
    title: "Envie o link no WhatsApp",
    body: "Revise, ajuste o que quiser e publique. Seu cliente abre uma página bonita no celular e pode salvar em PDF.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-bold tracking-tight">propofy</span>
        <Link
          href="/entrar"
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Entrar
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-3xl px-6 pb-16 pt-10 text-center sm:pt-20">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Para eletricista, diarista, designer, personal e todo autônomo
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Orçamentos e propostas que fecham negócio, em minutos.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
            Preencha os dados do serviço, deixe a IA escrever o texto
            profissional e envie um link pronto pelo WhatsApp. Chega de
            orçamento no bloco de notas.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton className="w-full sm:w-auto">
              Criar conta grátis
            </CtaButton>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Leva 1 minuto. Grátis para começar, sem cartão.
            </p>
          </div>
        </section>

        {/* Como funciona */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Do serviço ao link pronto em 3 passos
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="flex flex-col">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sua próxima proposta pode sair hoje.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-300">
            Comece grátis com 3 propostas. Sem cartão, sem instalar nada.
          </p>
          <div className="mt-8">
            <CtaButton className="w-full sm:w-auto">
              Criar conta grátis
            </CtaButton>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Já tem conta?{" "}
            <Link
              href="/entrar"
              className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
            >
              Entrar
            </Link>
          </p>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            propofy
          </span>
          <span>Propostas e orçamentos com IA para quem presta serviço.</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
