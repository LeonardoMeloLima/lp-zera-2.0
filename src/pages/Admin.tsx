import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Loader2, LogOut, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
const ADMIN_AUTH_KEY = "admin_auth";
const VALID_PIN = "ZERA2025";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === VALID_PIN) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Acesso Restrito — Zera Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pin" className="text-sm font-medium text-muted-foreground">PIN de Acesso</label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="Digite o PIN"
                autoFocus
              />
              {error && <p className="text-sm text-destructive">PIN incorreto. Acesso negado.</p>}
            </div>
            <Button type="submit" className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem(ADMIN_AUTH_KEY) === "true");
  const [b2bLeads, setB2bLeads] = useState<any[]>([]);
  const [investorLeads, setInvestorLeads] = useState<any[]>([]);
  const [ongLeads, setOngLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const [b2bResult, investorResult, ongResult] = await Promise.all([
        supabase.functions.invoke("admin-leads", { body: { table: "b2b_leads" } }),
        supabase.functions.invoke("admin-leads", { body: { table: "investor_leads" } }),
        supabase.functions.invoke("admin-leads", { body: { table: "ong_leads" } }),
      ]);

      if (b2bResult.error) throw b2bResult.error;
      if (investorResult.error) throw investorResult.error;
      if (ongResult.error) throw ongResult.error;

      setB2bLeads(Array.isArray(b2bResult.data) ? b2bResult.data : []);
      setInvestorLeads(Array.isArray(investorResult.data) ? investorResult.data : []);
      setOngLeads(Array.isArray(ongResult.data) ? ongResult.data : []);
    } catch (e) {
      console.error("Error fetching leads:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated, fetchLeads]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setAuthenticated(false);
    setB2bLeads([]);
    setInvestorLeads([]);
    setOngLeads([]);
  };

  if (!authenticated) {
    return <LoginScreen onAuth={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Zera Admin — Gestão de Leads</h1>
          <div className="flex items-center gap-2">
            <Button onClick={fetchLeads} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Atualizar Dados
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="b2b">
          <TabsList>
            <TabsTrigger value="b2b">Leads B2B (Demo)</TabsTrigger>
            <TabsTrigger value="investors">Investidores</TabsTrigger>
            <TabsTrigger value="ongs">ONGs Cadastradas</TabsTrigger>
          </TabsList>

          <TabsContent value="b2b">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : b2bLeads.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">Nenhum lead encontrado.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Volume de Lojas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {b2bLeads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="whitespace-nowrap">{formatDate(l.created_at)}</TableCell>
                      <TableCell>{l.nome_completo}</TableCell>
                      <TableCell>{l.nome_empresa}</TableCell>
                      <TableCell>{l.cargo}</TableCell>
                      <TableCell>{l.email_corporativo}</TableCell>
                      <TableCell>{l.volume_lojas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="investors">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : investorLeads.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">Nenhum lead encontrado.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Mensagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investorLeads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="whitespace-nowrap">{formatDate(l.created_at)}</TableCell>
                      <TableCell>{l.nome}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>
                        {l.linkedin ? <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary underline">{l.linkedin}</a> : "—"}
                      </TableCell>
                      <TableCell>{l.perfil || "—"}</TableCell>
                      <TableCell className="max-w-xs truncate">{l.mensagem || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="ongs">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : ongLeads.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">Nenhuma ONG cadastrada.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome da ONG</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ongLeads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="whitespace-nowrap">{formatDate(l.created_at)}</TableCell>
                      <TableCell>{l.nome_ong}</TableCell>
                      <TableCell>{l.cnpj}</TableCell>
                      <TableCell>{l.nome_responsavel}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>{l.telefone || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
