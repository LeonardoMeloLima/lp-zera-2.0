# Zera LP

Landing page do Zera, ecossistema de gestão em camadas em volta do PDV do pequeno comércio. Contexto em `.ai/steering/product.md`.

## Antes de qualquer coisa
- Leia `.ai/steering/tech-stack.md`, `conventions.md` e `principles.md`.
- Trabalho vem de um arquivo em `.ai/sdd/rodadas/` (rodada) ou `.ai/sdd/specs/NNN-nome/` (feature). Leia o arquivo inteiro antes de começar.
- Em `specs/`, leia o `.status` antes de implementar. Nenhum código antes de `tasks:approved`.

## Regras que valem em toda sessão
- O DESIGN DA LP É INTOCÁVEL. Nenhuma mudança de classe, cor, espaçamento, animação, layout, ordem ou quantidade de elementos sem pedido explícito na rodada.
- NUNCA escreva em produção (Supabase de produção, Vercel, env de produção) sem autorização explícita para aquela operação.
- NUNCA crie arquivo por cima de outro existente. Leia e acrescente; `.bak` antes de reescrever.
- Migrations só no staging. Produção só com OK do Leonardo.
- Commite documentos que alterar (`.ai/`, docs).
- Branch nova por rodada, PR em rascunho, um commit por task, TDD onde houver lógica, typecheck antes de cada commit.
- Ambiguidade não coberta pela rodada nem pelo steering: pare e pergunte.
- Nenhuma task fecha sem evidência: comando, exit code, veredito.
