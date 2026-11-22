// Validação pura do formulário "Quero testar o Zera".
// Sem APIs do Deno: é importada pela edge function e pelo Vitest.

export const SISTEMAS_CAIXA = ["VR System", "Hiper", "Outro", "Não sei"] as const;
export type SistemaCaixa = (typeof SISTEMAS_CAIXA)[number];

export interface LeadLoja {
  nome: string;
  whatsapp: string;
  cidade: string;
  nome_comercio: string;
  sistema_caixa: SistemaCaixa;
  mensagem: string | null;
}

export type ResultadoValidacao = { ok: true; lead: LeadLoja } | { ok: false; erro: string };

const texto = (valor: unknown): string => (typeof valor === "string" ? valor.trim() : "");

function validarTamanho(
  valor: string,
  min: number,
  max: number,
  erroCurto: string,
  erroLongo: string,
): string | null {
  if (valor.length < min) return erroCurto;
  if (valor.length > max) return erroLongo;
  return null;
}

// Aceita número com ou sem +55, com qualquer pontuação.
// Devolve 55 + DDD + número (12 ou 13 dígitos) ou null.
export function normalizarWhatsapp(valor: unknown): string | null {
  const digitos = texto(valor).replace(/\D/g, "");
  let completo: string;
  if (digitos.length === 10 || digitos.length === 11) {
    completo = `55${digitos}`;
  } else if ((digitos.length === 12 || digitos.length === 13) && digitos.startsWith("55")) {
    completo = digitos;
  } else {
    return null;
  }
  const ddd = completo.slice(2, 4);
  if (ddd[0] === "0" || ddd[1] === "0") return null;
  return completo;
}

export function validarLead(corpo: unknown): ResultadoValidacao {
  if (typeof corpo !== "object" || corpo === null || Array.isArray(corpo)) {
    return { ok: false, erro: "Dados inválidos." };
  }
  const dados = corpo as Record<string, unknown>;

  const nome = texto(dados.nome);
  const erroNome = validarTamanho(
    nome,
    2,
    120,
    "Informe seu nome.",
    "O nome pode ter até 120 caracteres.",
  );
  if (erroNome) return { ok: false, erro: erroNome };

  const whatsapp = normalizarWhatsapp(dados.whatsapp);
  if (!whatsapp) return { ok: false, erro: "Informe o WhatsApp com DDD." };

  const cidade = texto(dados.cidade);
  const erroCidade = validarTamanho(
    cidade,
    2,
    80,
    "Informe a cidade.",
    "A cidade pode ter até 80 caracteres.",
  );
  if (erroCidade) return { ok: false, erro: erroCidade };

  const nomeComercio = texto(dados.nome_comercio);
  const erroComercio = validarTamanho(
    nomeComercio,
    2,
    120,
    "Informe o nome do comércio.",
    "O nome do comércio pode ter até 120 caracteres.",
  );
  if (erroComercio) return { ok: false, erro: erroComercio };

  const sistemaCaixa = texto(dados.sistema_caixa);
  if (!(SISTEMAS_CAIXA as readonly string[]).includes(sistemaCaixa)) {
    return { ok: false, erro: "Escolha o sistema de caixa." };
  }

  const mensagem = texto(dados.mensagem);
  if (mensagem.length > 1000) {
    return { ok: false, erro: "A mensagem pode ter até 1000 caracteres." };
  }

  return {
    ok: true,
    lead: {
      nome,
      whatsapp,
      cidade,
      nome_comercio: nomeComercio,
      sistema_caixa: sistemaCaixa as SistemaCaixa,
      mensagem: mensagem || null,
    },
  };
}
