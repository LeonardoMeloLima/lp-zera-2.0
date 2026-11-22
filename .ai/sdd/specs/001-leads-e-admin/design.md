# Design: leads do Zera novo e /admin seguro

| FR | Onde |
|---|---|
| FR-001, FR-002, FR-003 | D1, D3 |
| FR-004 | D5 (configuração) |
| FR-005, FR-006 | D2, D4 |
| FR-007 | D2, D3, D5 |
| FR-008 | D0, D5 |
| FR-009 | D3 |

## D0. Projeto novo
- `.env.local` aponta para `zera-staging`; `supabase/config.toml` com `project_id = "tirrqshgbpoxxvzcofvf"` durante a rodada. Produção (`flkjwrnjvwstgvpkhhpo`) só na T7, pelo Leonardo.
- As 4 migrações antigas e as funções `public-lead-capture` e `notify-lead-email` vão para `supabase/legado/` (mover com `git mv`, não apagar), para não serem aplicadas no projeto novo. `src/integrations/supabase/types.ts` regenerado do staging.

## D1. Banco (projeto novo, do zero)
Tabela `public.leads_loja`: `id uuid pk default gen_random_uuid()`, `created_at timestamptz not null default now()`, `nome text not null`, `whatsapp text not null`, `cidade text not null`, `nome_comercio text not null`, `sistema_caixa text not null check (sistema_caixa in ('VR System','Hiper','Outro','Não sei'))`, `mensagem text`, com checks de tamanho iguais aos do requirements. RLS ligado e NENHUMA policy para anon ou authenticated: só a service role (edge functions) lê e grava.

## D2. Função `capture-lead-loja` (nova, `verify_jwt = false`)
Recebe POST JSON, valida com uma função pura `validarLead` (arquivo próprio, testada com Deno test ou Vitest importando o mesmo módulo), normaliza o WhatsApp, grava com service role e envia o e-mail pela Resend com `Deno.env.get("RESEND_API_KEY")`, de `Zera Leads <zera@avisos.connectideia.com.br>` (domínio já verificado na Resend) para o endereço do secret `LEADS_EMAIL_TO` (nenhum destinatário no código; `atendimento@zera.eco.br` não recebe e-mail). Sem `RESEND_API_KEY` ou `LEADS_EMAIL_TO`, a função grava o lead e só loga. Falha no e-mail não desfaz a gravação; só loga. Respostas: 200 `{success:true}`, 400 `{error:"<mensagem>"}`, 500 `{error:"Erro interno."}`.

## D3. Função `admin-leads` (reescrita) e tela /admin
- A função lê o header `Authorization: Bearer <jwt>`, valida com `supabase.auth.getUser(jwt)` e confere o e-mail, em minúsculas, contra o secret `ADMIN_EMAILS` (lista separada por vírgula). Sem token ou token inválido: 401. Fora da lista: 403. Única tabela lida: `leads_loja` (sem parâmetro de tabela).
- `Admin.tsx`: remove PIN e localStorage. Tela de login com e-mail e senha (`supabase.auth.signInWithPassword`), sessão pelo cliente Supabase, botão Sair com `signOut`. Uma tabela só, "Leads Zera" (colunas: Data, Nome, Comércio, Cidade, WhatsApp, Sistema de caixa, Mensagem). Saem as abas de B2B, investidores e ONGs. Resposta 403 mostra "Este e-mail não tem acesso."

## D4. Modal de contato (`DemoModal.tsx`)
Mesma estrutura e classes. Troca textos e nomes dos campos conforme o requirements, chama `capture-lead-loja` por `supabase.functions.invoke`, mostra a mensagem de erro que o servidor devolver. Título: "Quero testar o Zera". Botão: "Enviar". Sucesso: "Recebido! Vamos te chamar no WhatsApp." Erro genérico: "Não deu para enviar. Tente de novo." Campo WhatsApp com `type="tel"` e `inputMode="tel"`.

## D5. Configuração (feita pelo Leonardo, o agente lista o passo a passo no relatório)
- Staging `zera-staging` já criado. O Leonardo passa a URL e a anon key para o `.env.local`; a service role nunca vai para o front.
- Em staging e produção: secrets `RESEND_API_KEY`, `ADMIN_EMAILS` e `LEADS_EMAIL_TO` (destino do aviso de lead; hoje `leonardo.informatica@gmail.com`); Auth com cadastro público desligado; usuários do /admin criados no painel.
- Resend: gerar chave nova e revogar a antiga (ela está no histórico do git).
- Projeto antigo: o Leonardo desliga a função `admin-leads` (ou pausa o projeto) depois de exportar o que quiser guardar.
