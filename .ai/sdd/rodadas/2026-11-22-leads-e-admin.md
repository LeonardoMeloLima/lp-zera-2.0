# Rodada: leads do Zera novo e /admin seguro (2026-11-22)

> Nível: N2, fatia 1 de 1 (spec: `.ai/sdd/specs/001-leads-e-admin/`, exige `.status = tasks:approved`)
> Branch: `feat/leads-admin`, criada a partir de `feat/lp-conteudo-camadas` | PR em rascunho
> Leia `AGENTS.md`, `.ai/steering/*.md` e os três arquivos da spec antes de começar.

## Antes de codar
- Confira o `.status`. Se não for `tasks:approved`, pare.
- Projetos: staging `tirrqshgbpoxxvzcofvf` (use este), produção `flkjwrnjvwstgvpkhhpo` (não toque), legado `asfrbhtvnopwnwjcyjii` (não toque).
- Confirme que `.env.local` aponta para o staging. Se não existir, pare e peça a URL e a anon key ao Leonardo.

## Execute T1 a T7 do `tasks.md`, em ordem, um commit por task, push ao fim de cada uma.

## Paradas
Pare SOMENTE se: decisão de produto não escrita na spec; algo exigir tocar produção; CI vermelho fora do esperado; ambiguidade não coberta. Nunca aplique migração, secret ou deploy em produção: isso é a T7, feita pelo Leonardo.

## Relatório final
Bloco Alegação / Comando / Exit code / Resumo / Veredito por task, URL do preview e o passo a passo da T7.

## Confirme antes de construir
Reformule os requisitos em 5 linhas e pergunte o que estiver ambíguo antes de qualquer código.
