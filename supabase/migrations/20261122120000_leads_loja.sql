-- Leads do Zera novo (formulário "Quero testar").
-- RLS ligado e nenhuma policy: só a service role (edge functions) lê e grava.
create table public.leads_loja (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  whatsapp text not null check (whatsapp ~ '^55[0-9]{10,11}$'),
  cidade text not null check (char_length(cidade) between 2 and 80),
  nome_comercio text not null check (char_length(nome_comercio) between 2 and 120),
  sistema_caixa text not null check (sistema_caixa in ('VR System', 'Hiper', 'Outro', 'Não sei')),
  mensagem text check (mensagem is null or char_length(mensagem) <= 1000)
);

alter table public.leads_loja enable row level security;

-- O projeto não concede privilégios automáticos em tabelas novas.
grant select, insert on public.leads_loja to service_role;
