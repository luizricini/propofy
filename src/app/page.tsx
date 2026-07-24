import Link from "next/link";

/* ---------- inline icons (no external assets, CSP-safe) ---------- */

type IconProps = { className?: string };
const base = "h-5 w-5";

function IconCheck({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconSparkles({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
      <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </svg>
  );
}

function IconPhone({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}

function IconDocument({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

function IconChat({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function IconClock({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ---------- shared bits ---------- */

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

const trust = [
  "Grátis para começar",
  "Sem cartão de crédito",
  "Pronto para o WhatsApp",
  "Seu cliente salva em PDF",
];

const steps = [
  {
    icon: IconDocument,
    title: "Preencha os dados",
    body: "Cliente, itens do serviço com preço e um resumo do que você vai fazer. Rápido, direto do celular.",
  },
  {
    icon: IconSparkles,
    title: "A IA escreve por você",
    body: "Em segundos, uma proposta com texto profissional e persuasivo — no tom certo, sem você travar na frase.",
  },
  {
    icon: IconChat,
    title: "Envie o link no WhatsApp",
    body: "Revise, ajuste o que quiser e publique. Seu cliente abre uma página bonita no celular e aprova na hora.",
  },
];

const benefits = [
  {
    icon: IconSparkles,
    title: "Texto que convence",
    body: "A IA transforma suas anotações soltas em uma proposta clara e persuasiva, no tom do seu serviço.",
  },
  {
    icon: IconDocument,
    title: "Aparência de profissional",
    body: "Cada proposta sai com um visual limpo e padronizado — a mesma imagem de confiança em todo orçamento.",
  },
  {
    icon: IconPhone,
    title: "Tudo pelo celular",
    body: "Monte e envie do lugar onde você trabalha. Nada para instalar, funciona direto no navegador.",
  },
  {
    icon: IconClock,
    title: "Responda na hora",
    body: "Enquanto o concorrente demora dias para mandar o orçamento, você responde o cliente em minutos.",
  },
];

const faqs = [
  {
    q: "Preciso instalar algum programa?",
    a: "Não. O propofy funciona direto no navegador do celular ou do computador. Você pode até instalá-lo como atalho na tela inicial, se quiser.",
  },
  {
    q: "É realmente grátis?",
    a: "Você começa grátis, com 3 propostas para testar, sem precisar de cartão de crédito.",
  },
  {
    q: "Meu cliente precisa criar conta?",
    a: "Não. Você envia um link e o cliente abre a proposta no celular, sem cadastro. Ele ainda pode salvar em PDF.",
  },
  {
    q: "Posso editar o texto que a IA gerou?",
    a: "Sim. A IA escreve o rascunho e você ajusta o que quiser antes de publicar e enviar.",
  },
];

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200/70 bg-background/80 backdrop-blur dark:border-zinc-800/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">propofy</span>
          <div className="flex items-center gap-5">
            <Link
              href="/entrar"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="hidden rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:inline-flex"
            >
              Criar conta grátis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-2 lg:pt-20">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
              <IconSparkles className="h-4 w-4" />
              Feito para autônomos e MEI
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Orçamentos e propostas que fecham negócio, em minutos.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 lg:mx-0 dark:text-zinc-300">
              Preencha os dados do serviço, deixe a IA escrever o texto
              profissional e envie um link pronto pelo WhatsApp. Chega de
              orçamento no bloco de notas.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <CtaButton className="w-full sm:w-auto">
                Criar conta grátis
              </CtaButton>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Leva 1 minuto. Grátis para começar, sem cartão.
              </p>
            </div>
          </div>

          {/* Product preview — illustrative example of what you create */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                <div>
                  <p className="text-base font-bold">Marcenaria Silva</p>
                  <p className="text-xs text-zinc-500">Proposta comercial</p>
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Nº 014
                </span>
              </div>
              <p className="mt-4 text-xs text-zinc-500">Para: Ana Ribeiro</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Olá, Ana! Segue a proposta para a estante planejada da sala,
                feita sob medida em MDF com acabamento amadeirado.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    Projeto e medição
                  </span>
                  <span className="font-medium">R$ 300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    Estante sob medida
                  </span>
                  <span className="font-medium">R$ 2.400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    Instalação
                  </span>
                  <span className="font-medium">R$ 450</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  R$ 3.150
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400">
              Exemplo do que você cria e envia
            </p>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5">
            {trust.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                <IconCheck className="h-4 w-4 text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Do serviço ao link pronto em 3 passos
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              Sem planilha, sem Word, sem começar do zero a cada cliente.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <Icon />
                    </span>
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      Passo {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Benefícios */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Feito para você passar mais confiança e fechar mais
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{b.title}</h3>
                      <p className="mt-1.5 text-zinc-600 dark:text-zinc-300">
                        {b.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Perguntas frequentes
          </h2>
          <div className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="ml-4 text-zinc-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-emerald-600">
          <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Sua próxima proposta pode sair hoje.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-emerald-50">
              Comece grátis com 3 propostas. Sem cartão, sem instalar nada.
            </p>
            <div className="mt-8">
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50"
              >
                Criar conta grátis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            propofy
          </span>
          <span className="text-center">
            Propostas e orçamentos com IA para quem presta serviço.
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
