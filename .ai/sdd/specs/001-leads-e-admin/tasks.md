# Tasks: leads do Zera novo e /admin seguro

> Requer `tasks:approved` no `.status`. Uma fatia só, depois da rodada `2026-11-22-lp-conteudo-camadas`.

| Requisito | Tasks |
|---|---|
| FR-001, FR-002, FR-003 | T3, T5 |
| FR-004 | T7 |
| FR-005, FR-006 | T1, T2, T4 |
| FR-007 | T2, T6 |
| FR-008 | T1 |
| FR-009 | T5 |

### T1: Projeto novo e migração `leads_loja` (staging)
Cobre FR-005, FR-008. D0 e D1. Mover o legado para `supabase/legado/`, apontar config e `.env.local` para o staging, criar a migração e aplicar só no staging, regenerar `types.ts`. Verificação: tabela criada, RLS ligado, `select` como anon retorna erro ou vazio; `grep -rn asfrbhtvnopwnwjcyjii src supabase/config.toml` vazio.

### T2: `validarLead` + função `capture-lead-loja`
Cobre FR-005, FR-006, FR-007. TDD com os 5 casos de WhatsApp e os limites de tamanho. Verificação: testes verdes; `curl` no staging com payload válido grava e devolve 200; inválido devolve 400 com a mensagem.

### T3: `admin-leads` com autenticação
Cobre FR-001. Verificação: os 3 `curl` do critério de aceite (401, 403, 200) no staging.

### T4: Modal de contato
Cobre FR-005, FR-006. Depende de T2. Verificação: envio pela tela do preview grava no staging; diff do `DemoModal.tsx` sem mudança de classe.

### T5: /admin com login
Cobre FR-002, FR-003, FR-009. Depende de T3. Verificação: `grep -rn "ZERA2025" src` vazio; login de admin vê a aba "Leads Zera".

### T6: Nenhum segredo no código
Cobre FR-007. A chave da Resend fica só no secret `RESEND_API_KEY`; o arquivo legado `notify-lead-email` também perde a chave fixa. Verificação: `grep -rn "re_[A-Za-z0-9]" supabase src` vazio.

### T7: Passo a passo de produção
Cobre FR-004. Sem código: o relatório lista, na ordem, o que o Leonardo faz em produção (secrets, auth, usuários, migração, deploy das funções, revogar a chave antiga) antes do merge.
