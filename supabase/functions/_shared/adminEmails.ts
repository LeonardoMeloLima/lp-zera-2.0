// Confere um e-mail contra o secret ADMIN_EMAILS (lista separada por vírgula).
// Sem APIs do Deno: é importada pela edge function e pelo Vitest.
export function emailAutorizado(email: string | null | undefined, lista: string | null | undefined): boolean {
  const alvo = (email ?? "").trim().toLowerCase();
  if (!alvo) return false;
  return (lista ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(alvo);
}
