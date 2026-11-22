import { useState, useEffect, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Loader2, LogOut, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type LeadLoja = Database["public"]["Tables"]["leads_loja"]["Row"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function statusDoErro(error: unknown): number | null {
  const contexto = (error as { context?: unknown })?.context;
  return contexto instanceof Response ? contexto.status : null;
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [entrando, setEntrando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEntrando(true);
    setErro(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
    setEntrando(false);
    if (error) setErro("E-mail ou senha incorretos.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Acesso restrito: Zera Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">E-mail</label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErro(null); }}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium text-muted-foreground">Senha</label>
              <Input
                id="senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro(null); }}
                required
              />
              {erro && <p className="text-sm text-destructive">{erro}</p>}
            </div>
            <Button type="submit" disabled={entrando} className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white">
              {entrando && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [leads, setLeads] = useState<LeadLoja[]>([]);
  const [loading, setLoading] = useState(false);
  const [semAcesso, setSemAcesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregandoSessao(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSession(novaSessao);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-leads");
      if (error) {
        const status = statusDoErro(error);
        if (status === 403) {
          setSemAcesso(true);
        } else if (status === 401) {
          await supabase.auth.signOut();
          setSession(null);
        } else {
          setErro("Não deu para carregar os leads. Tente de novo.");
        }
        return;
      }
      setSemAcesso(false);
      setLeads(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Erro ao buscar leads:", e);
      setErro("Não deu para carregar os leads. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const token = session?.access_token;
  useEffect(() => {
    if (token) fetchLeads();
  }, [token, fetchLeads]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
    setSemAcesso(false);
    setErro(null);
  };

  if (carregandoSessao) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Zera Admin: Gestão de Leads</h1>
          <div className="flex items-center gap-2">
            {!semAcesso && (
              <Button onClick={fetchLeads} disabled={loading} variant="outline" size="sm">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Atualizar Dados
              </Button>
            )}
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {semAcesso ? (
          <p className="text-center text-muted-foreground py-16">Este e-mail não tem acesso.</p>
        ) : (
          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads">Leads Zera</TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
              ) : erro ? (
                <p className="text-center text-destructive py-16">{erro}</p>
              ) : leads.length === 0 ? (
                <p className="text-center text-muted-foreground py-16">Nenhum lead encontrado.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Comércio</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Sistema de caixa</TableHead>
                      <TableHead>Mensagem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="whitespace-nowrap">{formatDate(l.created_at)}</TableCell>
                        <TableCell>{l.nome}</TableCell>
                        <TableCell>{l.nome_comercio}</TableCell>
                        <TableCell>{l.cidade}</TableCell>
                        <TableCell className="whitespace-nowrap">{l.whatsapp}</TableCell>
                        <TableCell>{l.sistema_caixa}</TableCell>
                        <TableCell className="max-w-xs truncate">{l.mensagem ?? ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
