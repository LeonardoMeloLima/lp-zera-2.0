import { createClient } from "npm:@supabase/supabase-js@2";
import { type LeadLoja, validarLead } from "../_shared/validarLead.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const REMETENTE = "Zera Leads <zera@avisos.connectideia.com.br>";

const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapar = (valor: string) =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function enviarAviso(lead: LeadLoja) {
  const chave = Deno.env.get("RESEND_API_KEY");
  const destinatario = Deno.env.get("LEADS_EMAIL_TO")?.trim();
  if (!chave || !destinatario) {
    console.error("RESEND_API_KEY ou LEADS_EMAIL_TO ausente; e-mail não enviado.");
    return;
  }
  const linhas: [string, string][] = [
    ["Nome", lead.nome],
    ["WhatsApp", lead.whatsapp],
    ["Cidade", lead.cidade],
    ["Comércio", lead.nome_comercio],
    ["Sistema de caixa", lead.sistema_caixa],
    ["O que mais incomoda", lead.mensagem ?? "(não informado)"],
  ];
  const html =
    "<h2>Novo lead do Zera</h2><table>" +
    linhas
      .map(([rotulo, valor]) => `<tr><td><strong>${rotulo}</strong></td><td>${escapar(valor)}</td></tr>`)
      .join("") +
    "</table>";

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMETENTE,
      to: [destinatario],
      subject: `Novo lead Zera: ${lead.nome_comercio}`,
      html,
    }),
  });
  if (!resposta.ok) {
    console.error("Resend falhou:", resposta.status, await resposta.text());
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);

  try {
    const corpo = await req.json().catch(() => null);
    const resultado = validarLead(corpo);
    if (!resultado.ok) return json({ error: resultado.erro }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error } = await supabase.from("leads_loja").insert(resultado.lead);
    if (error) throw error;

    // Falha no e-mail não desfaz a gravação; só loga.
    try {
      await enviarAviso(resultado.lead);
    } catch (erroEmail) {
      console.error("Erro ao enviar e-mail:", erroEmail);
    }

    return json({ success: true });
  } catch (erro) {
    console.error("capture-lead-loja:", erro);
    return json({ error: "Erro interno." }, 500);
  }
});
