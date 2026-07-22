# Scope: Fundação do projeto

| Field | Value |
|---|---|
| **Status** | In Progress |
| **Date** | 2026-07-15 |
| **Author** | Luiz |
| **Related ADRs** | [ADR-001: Stack e infraestrutura](../adr/ADR-2026-15-07-stack-e-infraestrutura.md), [ADR-002: Entrega da proposta](../adr/ADR-2026-15-07-entrega-da-proposta-link-e-print-css.md), [ADR-003: Estratégia de geração com LLM](../adr/ADR-2026-15-07-estrategia-de-geracao-com-llm.md) |
| **Target branch** | main (bootstrap do repositório) |

## Problema

O propofy não existe ainda. Antes de qualquer feature de produto, é preciso sair do zero até uma plataforma deployada em produção, com autenticação funcionando, o esqueleto do modelo de dados que sustenta o freemium e uma landing page que converte visitante em usuário — a base sobre a qual os scopes de feature serão construídos.

## Resultado desejado

Um visitante acessa propofy.app, entende o que o produto faz, cria uma conta e chega autenticado a um dashboard vazio, com sua cota freemium inicial atribuída — tudo em produção, com deploy contínuo funcionando.

## Non-goals

- Criação, geração ou edição de propostas/orçamentos (SCOPE-002).
- Página pública de proposta e print CSS (scope da feature de entrega).
- Pagamento, upgrade de plano ou qualquer fluxo de cobrança.
- Login social (Google OAuth) — decisão de v1: apenas e-mail e senha.
- Confirmação de e-mail no cadastro — decisão deliberada de redução de fricção, não omissão (ver Riscos).
- Logo e cores do negócio no perfil — apenas o nome do negócio entra neste scope.

## Feature: Fundação e primeiro acesso

### S1 — Visitante entende e converte

- **Given** um visitante sem conta
- **When** acessa propofy.app
- **Then** vê a proposta de valor em PT-BR, mobile-first, com um único CTA primário levando ao cadastro

### S2 — Cadastro cria conta com cota

- **Given** um visitante na tela de cadastro
- **When** submete e-mail, senha e nome do negócio válidos
- **Then** a conta é criada, a cota freemium inicial (3 gerações, valor configurável) é atribuída atomicamente junto ao perfil, e o usuário entra autenticado no dashboard vazio com orientação do próximo passo

### S3 — Login

- **Given** um usuário cadastrado e deslogado
- **When** submete credenciais corretas
- **Then** entra autenticado no dashboard; credenciais incorretas exibem erro claro sem revelar qual campo falhou

### S4 — Logout

- **Given** um usuário autenticado
- **When** aciona sair
- **Then** a sessão é encerrada e rotas protegidas deixam de ser acessíveis

### S5 — Recuperação de senha

- **Given** um usuário cadastrado que esqueceu a senha
- **When** solicita recuperação informando seu e-mail
- **Then** recebe link de redefinição por e-mail e consegue definir nova senha e entrar

### S6 — E-mail já cadastrado

- **Given** um visitante na tela de cadastro
- **When** submete um e-mail já existente
- **Then** vê mensagem clara de que a conta já existe, com caminho para login e recuperação de senha

### S7 — Rota protegida sem sessão

- **Given** um visitante sem sessão ativa
- **When** acessa diretamente uma URL protegida (ex.: dashboard)
- **Then** é redirecionado ao login e, após autenticar, retorna à URL originalmente solicitada

### S8 — PWA instalável

- **Given** um usuário em browser compatível (Chrome/Android como referência)
- **When** acessa o app
- **Then** o app é instalável: manifest válido, ícones corretos e nome/descrição adequados no prompt de instalação

### S9 — Deploy contínuo

- **Given** o repositório configurado na Vercel
- **When** um merge chega à main
- **Then** a produção em propofy.app é atualizada automaticamente, com preview deploys em branches

## Constraints e contexto

- Interface integralmente em PT-BR e mobile-first (o público-alvo opera primariamente pelo celular/WhatsApp).
- Operação dentro dos planos free de Vercel e Supabase (ADR-001).
- Supabase gerenciado via CLI, com migrations versionadas no repositório desde a primeira tabela.
- O schema criado aqui limita-se a: perfil do usuário (com nome do negócio) e controle de cota de gerações. O modelo do documento (proposta/orçamento) pertence ao SCOPE-002, mas deve nascer compatível com o débito atômico de cota definido na ADR-003.

## Dependências

- **DNS do domínio propofy.app:** o domínio pertence a terceiro (Santz) e será apontado para a Vercel ao final do desenvolvimento — combinado feito, sem bloqueio para o trabalho. Até lá, o deploy roda no subdomínio da Vercel; o scenario S9 considera-se satisfeito no subdomínio e revalidado no domínio final.

## Riscos conhecidos

- **Renovação de cota via contas descartáveis:** sem confirmação de e-mail, criar nova conta para obter novas gerações gratuitas é trivial. Risco aceito no v1 (custo de 3 gerações é desprezível e a prioridade é fricção mínima na validação). Mitigações futuras se houver abuso: confirmação de e-mail, rate limit por origem, fingerprint de dispositivo.

## Milestones

### M1 — Bootstrap e pipeline ✅

Repositório, projeto Next.js (App Router), projeto na Vercel com deploy contínuo e preview deploys. Satisfaz: S9.

Concluído em 2026-07-20. Produção em propofy-five.vercel.app (S9 satisfeito no subdomínio da Vercel, conforme a dependência de DNS); preview deploys ativos por branch, protegidos por Vercel Authentication (padrão da plataforma).

### M2 — Banco e schema base ✅

Projeto Supabase provisionado via CLI, migrations versionadas, tabelas de perfil e cota. Pré-requisito de S2; nenhum scenario de UI satisfeito diretamente.

Concluído em 2026-07-20. Projeto Supabase em org dedicada, região sa-east-1 (São Paulo). Tabela `profiles` (1:1 com `auth.users`) com `business_name` e `generation_quota` (default 3), RLS com cota não-gravável pelo cliente, e trigger `handle_new_user` criando o perfil + cota atomicamente no signup — pronto para o débito atômico da ADR-003 (função de débito e tabela de gerações ficam no SCOPE-002). Migrations versionadas em `supabase/migrations/`.

### M3 — Autenticação completa ✅

Cadastro com atribuição atômica de cota, login, logout, recuperação de senha, proteção de rotas. Satisfaz: S2, S3, S4, S5, S6, S7.

Concluído em 2026-07-21. Auth por e-mail + senha sobre Supabase Auth (`@supabase/ssr`, sessão em cookie), sem confirmação de e-mail. Rotas em PT-BR: `/cadastro`, `/entrar`, `/recuperar-senha`, `/redefinir-senha` (fluxo PKCE via `/auth/callback`) e `/painel` protegido. Proteção de rota via `src/proxy.ts` (convenção do Next 16), com retorno à URL original após login. Config de auth (site_url, redirect allowlist, senha mín. 8, confirmações off) versionada em `supabase/config.toml` e aplicada via `supabase config push`. Env vars da Supabase configuradas na Vercel (produção). Verificado contra o projeto remoto: signup+trigger+cota, cota não-gravável pelo cliente, e-mail duplicado, login certo/errado e ciclo completo de recuperação; produção no ar com páginas e proteção de rota confirmadas por HTTP. Pendente apenas o passe visual no navegador (extensão do Chrome indisponível na sessão).

### M4 — Landing page ✅

Página inicial com proposta de valor e CTA para o cadastro. Satisfaz: S1.

Concluído em 2026-07-22. Landing enxuta, mobile-first, PT-BR: hero com proposta de valor e CTA primário único para `/cadastro`, "como funciona" em 3 passos, CTA final e rodapé. Destaque em verde esmeralda sobre base neutra. Copy voltada ao prestador de serviço (dor real, benefício concreto, sinais de confiança honestos — grátis para começar, sem cartão). Metadata de marketing + Open Graph (pt_BR), indexável. Em produção em `propofy-five.vercel.app`.

### M5 — Shell PWA

Manifest, ícones e metadados de instalação. Satisfaz: S8.
