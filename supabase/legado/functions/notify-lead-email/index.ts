import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = "re_7Qhuf4q3_HCUCdqAkRN5pbFg95bcv2tfM";
const DESTINATION_EMAIL = "atendimento@zera.eco.br";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        console.log("Webhook received payload:", payload);

        const { table, record, type } = payload;

        // Only handle INSERT
        if (type !== "INSERT") {
            return new Response(JSON.stringify({ message: "Not an insert, skipping" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        let subject = "🚀 Novo Lead Capturado - Zera LP";
        let leadDetails = "";

        if (table === "b2b_leads") {
            subject = "🏢 Novo Lead B2B - Zera LP";
            leadDetails = `
        Nome: ${record.nome_completo}
        E-mail: ${record.email_corporativo}
        Empresa: ${record.nome_empresa}
        Cargo: ${record.cargo}
        Volume de Lojas: ${record.volume_lojas}
        Mensagem: ${record.mensagem || "Nenhuma"}
      `;
        } else if (table === "investor_leads") {
            subject = "💰 Novo Lead Investidor - Zera LP";
            leadDetails = `
        Nome: ${record.nome}
        E-mail: ${record.email}
        LinkedIn: ${record.linkedin || "Não informado"}
        Perfil: ${record.perfil || "Não informado"}
        Mensagem: ${record.mensagem || "Nenhuma"}
      `;
        } else if (table === "ong_leads") {
            subject = "🌿 Novo Cadastro de ONG - Zera LP";
            leadDetails = `
        ONG: ${record.nome_ong}
        CNPJ: ${record.cnpj}
        Responsável: ${record.nome_responsavel}
        E-mail: ${record.email}
        Telefone: ${record.telefone || "Não informado"}
      `;
        }

        const emailBody = `
      Olá, Zera Team!
      
      Um novo lead acaba de ser capturado através da Landing Page.
      
      Detalhes do Lead:
      -----------------------
      ${leadDetails}
      -----------------------
      
      Data: ${new Date().toLocaleString("pt-BR")}
      
      Ver todos no Admin: https://zera-landing-page.vercel.app/admin
    `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Zera Leads <onboarding@resend.dev>",
                to: DESTINATION_EMAIL,
                subject: subject,
                text: emailBody,
            }),
        });

        const resData = await res.json();
        console.log("Resend API response:", resData);

        return new Response(JSON.stringify(resData), {
            status: res.ok ? 200 : 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in notify-lead-email function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
