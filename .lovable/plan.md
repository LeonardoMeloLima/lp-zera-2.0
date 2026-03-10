
Objetivo: eliminar o flicker dos cards durante o scroll em mobile e desktop com uma abordagem global (não só em uma seção).

Plano de implementação (curto e direto):

1) Remover animação de entrada dos cards (ponto principal)
- `src/components/landing/Features.tsx`: trocar os wrappers dos 4 cards + card wide de `motion.div` para `div`.
- `src/components/landing/ESGPillars.tsx`: trocar os 3 cards de `motion.div` para `div`.
- `src/components/landing/LeadCapture.tsx`: trocar o container principal da calculadora de `motion.div` para `div`.
- Manter animação apenas em títulos/headers de seção (para preservar dinamismo sem afetar cards).

2) Eliminar fontes de repaint pesado em scroll
- `src/components/landing/Features.tsx`: substituir os glows com `blur-[180px]/blur-[140px]` por `radial-gradient` sem `blur/filter`.
- `src/components/landing/ESGPillars.tsx`: remover `filter: "blur(160px)"` do glow e usar radial estático.
- `src/components/landing/LeadCapture.tsx`: substituir o glow com `blur-[180px]` por radial estático.
- `src/components/landing/Hero.tsx`: substituir os 2 glows com blur por radial estático (mesmo visual, sem filtro pesado).

3) Remover efeitos que entram em conflito com scroll + composição
- `src/components/landing/ESGPillars.tsx`: remover `hover:-translate-y-1` e remover `onMouseEnter/onMouseLeave` com mutação inline; usar hover via classes simples de borda/sombra.
- `src/components/landing/Features.tsx`: remover `hover:-translate-y-2` das imagens dos cards (evita piscada sob scroll).
- `src/components/landing/LeadCapture.tsx`: remover dependência de `.glass-card` (que usa backdrop blur no CSS global) e aplicar superfície equivalente sem blur via classes/style local.

4) Estabilização adicional de scroll no topo
- `src/components/landing/Navbar.tsx`: remover `backdrop-blur-xl` no header/mobile menu e manter fundo opaco equivalente para evitar recomposição contínua durante scroll.

5) Validação pós-fix (obrigatória)
- Testar no iPhone (Safari): scroll lento e rápido da Home inteira (Hero → Footer), 3 passagens.
- Testar desktop (Chrome + Safari): repetir scroll contínuo e confirmar que nenhum card “pisca”.
- Confirmar que layout, textos e hierarquia visual dos cards permanecem iguais.

Detalhes técnicos (arquivos impactados):
- `src/components/landing/Features.tsx`
- `src/components/landing/ESGPillars.tsx`
- `src/components/landing/LeadCapture.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/landing/Navbar.tsx`
