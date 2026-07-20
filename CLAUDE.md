# CLAUDE.md — propofy

Micro-SaaS de geração de propostas comerciais e orçamentos com IA para prestadores de serviço brasileiros. O usuário preenche cliente, itens e contexto; a IA gera o texto; ele revisa, edita e publica um link que o cliente final abre no celular (e pode salvar como PDF via print). Freemium com cota de gerações gratuitas. Mercado PT-BR, mobile-first. Desenvolvedor solo.

## Fonte de verdade: `docs/`

Este projeto segue desenvolvimento orientado a documentação. **Antes de implementar qualquer coisa, leia o scope correspondente em `docs/scopes/` e as ADRs relacionadas em `docs/adr/`.** As decisões de arquitetura já foram tomadas e registradas — não as rediscuta silenciosamente durante a implementação.

- `docs/adr/` — decisões de arquitetura (o *porquê* e o *como* estrutural).
- `docs/scopes/` — o que construir, com scenarios BDD (Given/When/Then) que funcionam como critérios de aceite, e milestones ordenados.

Regras de manuseio dos documentos:

- Se a implementação revelar que uma ADR está errada ou incompleta, **pare e sinalize** — a correção é uma nova ADR ou uma revisão explícita, nunca um desvio silencioso no código.
- Mudança de modelo de dados ou contrato de API exige ADR antes do código.
- ADRs: `ADR-YYYY-DD-MM-<slug>.md`, numeradas sequencialmente no heading (`# ADR-NNN: ...`), status Proposed → Accepted. Scopes: `SCOPE-YYYY-DD-MM-<slug>.md`, status Draft → Ready → In Progress → Done. Documentos não contêm código nem estimativas de tempo; diagramas em Mermaid, nunca ASCII art.
- Ao concluir um milestone, atualize o status do scope correspondente.

## Decisões já tomadas (resumo — detalhes nas ADRs)

| Tema | Decisão | ADR |
|---|---|---|
| Stack | Next.js (App Router) full-stack + Supabase (Postgres/Auth/Storage) + Vercel free + PWA | 001 |
| Entrega do documento | Página pública com link + print CSS; **sem** geração de PDF server-side no v1 | 002 |
| Geração com LLM | Claude API (Sonnet, isolado em config), server-side, saída estruturada em JSON validada, sem streaming | 003 |
| Cota freemium | Débito **atômico no banco antes** da chamada à API; estorno em falha; registro em tabela de gerações | 003 |
| Modelo de dados | Entidade única de documento (tipo: proposta \| orçamento), itens relacionados (qtd default 1 × preço), totais sempre derivados, token público não adivinhável | 004 |
| Auth | Supabase Auth, e-mail + senha apenas, sem confirmação de e-mail (risco documentado no SCOPE-001) | — |

## Ordem de trabalho

1. **SCOPE-001 (fundação):** bootstrap/pipeline → schema base (perfil + cota) → auth completo → landing → shell PWA.
2. **SCOPE-002 (fluxo do documento):** modelo de dados → criação + geração → revisão/edição → publicação + página pública → estados de erro e limite.
3. **Pagamento fica por último** (scope futuro). Não implemente nada de cobrança antes dele — a cota esgotada leva a tela de limite com captura de interesse, só isso.

Cada milestone lista os scenarios que satisfaz; trate os scenarios como definição de pronto e escreva testes a partir deles quando aplicável.

## Regras de implementação

- **Idioma:** código, identificadores, commits e nomes de tabela/coluna em inglês; toda UI e todo texto voltado a usuário em PT-BR. Prompts de geração em PT-BR.
- **Mobile-first sempre.** O público-alvo vive no WhatsApp; a página pública do documento é a cara do produto e será aberta majoritariamente em celular.
- **Planos free são restrição de arquitetura:** nada de dependência pesada em serverless (nada de Chromium/Playwright em função), atenção a tamanho de bundle e tempo de execução na Vercel.
- **Chaves de API nunca chegam ao cliente.** Toda chamada de LLM em route handler server-side.
- **Nunca chame o LLM sem débito de cota prévio bem-sucedido.** A verificação no cliente é cortesia de UX, não controle.
- **Migrations via Supabase CLI**, versionadas no repositório desde a primeira tabela. Nada de mudança de schema manual pelo dashboard.
- Totais de documento são sempre calculados a partir dos itens — nunca persistidos como fonte de verdade.
- URLs públicas de documento: não indexáveis (noindex) e com token não sequencial.
- Simplicidade acima de tudo: projeto solo, escopo de v1. Na dúvida entre abstração e código direto, escolha o direto; abstrações só quando o segundo caso de uso concreto existir.

## O que NÃO fazer

- Não adicionar features de scopes futuros (pagamento, tracking de abertura, logo/cores, templates múltiplos, envio por e-mail).
- Não gerar PDF server-side (contraria ADR-002).
- Não usar streaming na geração (contraria ADR-003).
- Não criar tabelas separadas para proposta e orçamento (contraria ADR-004).
- Não trocar decisões de ADR "de passagem" dentro de um PR de feature.
