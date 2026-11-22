# Stack

- Vite + React 18 + TypeScript: projeto nasceu no Lovable; manter a base, sem migrar para Next.
- Tailwind + shadcn/ui + framer-motion: toda a identidade visual vive em `src/index.css` (tokens como `--zera-emerald`) e em classes utilitárias (`glass-premium`, `btn-zera-emerald`, `text-gradient-genesis`).
- Supabase: edge functions `public-lead-capture`, `notify-lead-email`, `admin-leads`; tabelas `b2b_leads`, `investor_leads`, `ong_leads`.
- Vercel: deploy da LP (projeto `zera-landing-page`).
- Testes: Vitest (`npm test`). Gerenciador: npm (`package-lock.json`). O `bun.lockb` é resto do Lovable.

Verificação padrão: `npm run build`, `npm run lint`, `npm test`.
