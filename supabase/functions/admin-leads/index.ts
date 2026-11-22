import { createClient } from "npm:@supabase/supabase-js@2";
import { emailAutorizado } from "../_shared/adminEmails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const cabecalho = req.headers.get("Authorization") ?? "";
    const jwt = cabecalho.startsWith("Bearer ") ? cabecalho.slice(7).trim() : "";
    if (!jwt) return json({ error: "Não autenticado." }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: sessao, error: erroSessao } = await supabase.auth.getUser(jwt);
    if (erroSessao || !sessao?.user) return json({ error: "Não autenticado." }, 401);

    if (!emailAutorizado(sessao.user.email, Deno.env.get("ADMIN_EMAILS"))) {
      return json({ error: "Este e-mail não tem acesso." }, 403);
    }

    const { data, error } = await supabase
      .from("leads_loja")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    return json(data);
  } catch (erro) {
    console.error("admin-leads:", erro);
    return json({ error: "Erro interno." }, 500);
  }
});
