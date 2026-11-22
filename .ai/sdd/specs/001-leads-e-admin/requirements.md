# Requisitos: leads do Zera novo e /admin seguro

> Status no `.status`. Decisões do Leonardo em 22/11/2026: login por e-mail e senha; tabela nova para os leads; o Zera novo começa do zero em uma conta Supabase nova (organização Zera App), com dois projetos: `zera-prod` (`flkjwrnjvwstgvpkhhpo`) e `zera-staging` (`tirrqshgbpoxxvzcofvf`), ambos em sa-east-1. O projeto antigo (`asfrbhtvnopwnwjcyjii`) é legado e será desligado pelo Leonardo.

## Problema
1. A função `admin-leads` devolve todos os leads para qualquer pessoa que a chamar. O PIN do /admin fica no código do site e não protege os dados.
2. A chave da Resend está escrita no código de `notify-lead-email` e no histórico do git.
3. O formulário de contato ainda é o do conceito antigo (e-mail corporativo, cargo, volume de lojas).

## Requisitos funcionais
- FR-001 (Must): QUANDO alguém chamar a função de leitura de leads sem sessão válida de um e-mail autorizado, O SISTEMA DEVE responder 401 (sem sessão) ou 403 (e-mail fora da lista) e não devolver nenhum dado.
- FR-002 (Must): QUANDO um e-mail da lista de administradores entrar com e-mail e senha no /admin, O SISTEMA DEVE mostrar os leads.
- FR-003 (Must): O SISTEMA DEVE não ter PIN, senha ou lista de e-mails no código do front-end.
- FR-004 (Must): Ninguém consegue criar conta sozinho. Usuários do /admin são criados pelo Leonardo no painel do Supabase.
- FR-005 (Must): QUANDO o visitante enviar o formulário "Quero testar" com os campos válidos, O SISTEMA DEVE gravar o lead na tabela nova e mandar e-mail de aviso para atendimento@zera.eco.br.
- FR-006 (Must): SE algum campo obrigatório faltar ou for inválido, O SISTEMA DEVE recusar no servidor com mensagem em português e não gravar nada.
- FR-007 (Must): Nenhuma chave secreta (Resend, service role) no código. Só em secrets do Supabase.
- FR-008 (Must): A LP passa a usar o projeto Supabase novo. Nada do projeto antigo é usado, migrado ou alterado pelo agente.
- FR-009 (Must): O /admin mostra só os leads do Zera novo.

## Campos do formulário
| Campo | Obrigatório | Regra |
|---|---|---|
| Seu nome | sim | 2 a 120 caracteres |
| WhatsApp (com DDD) | sim | ver tabela abaixo |
| Cidade | sim | 2 a 80 caracteres |
| Nome do comércio | sim | 2 a 120 caracteres |
| Sistema de caixa | sim | VR System, Hiper, Outro, Não sei |
| O que mais te incomoda na gestão da loja? | não | até 1000 caracteres |

| WhatsApp digitado | Resultado |
|---|---|
| (19) 99876-5432 | grava 5519998765432 |
| +55 19 99876-5432 | grava 5519998765432 |
| 19 3875-1234 | grava 551938751234 |
| 999 | recusa: "Informe o WhatsApp com DDD." |
| (vazio) | recusa: "Informe o WhatsApp com DDD." |

## Fora do escopo
- Rate limit e captcha no formulário.
- Migrar dados do projeto antigo.
- Qualquer mudança visual na LP (o modal mantém a mesma estrutura; muda só o texto dos campos e das mensagens).
- Recuperação de senha pelo /admin (o Leonardo redefine pelo painel do Supabase).

## Critérios de aceite
- [ ] `curl` na função de leitura sem token: 401. Com token de e-mail fora da lista: 403. Com token de admin: 200.
- [ ] `grep -rn "ZERA2025\|re_[A-Za-z0-9]" src supabase` sem resultado
- [ ] Formulário válido grava em `leads_loja` no staging e o e-mail chega
- [ ] Os 5 casos de WhatsApp da tabela passam em teste automatizado
- [ ] Nenhuma referência a `asfrbhtvnopwnwjcyjii` no código ativo
