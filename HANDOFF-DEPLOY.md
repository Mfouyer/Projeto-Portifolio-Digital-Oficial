# Handoff de Deploy — Portfolio Marcos Fouyer

> Preparado pela Aura (análise + build validado). Executor: **Forge**.
> Data: 2026-06-01. Estado: **aguarda 2 decisões do Marcos** (ver fim).

---

## 1. O que é

Portfolio pessoal — SPA **React 19 + Vite 7 + TypeScript** (framer-motion, react-router-dom 7).
Frontend **client-side puro**: o browser do visitante fala **diretamente** com o PocketBase.
Não há servidor/proxy intermédio. Isto é o facto que define todo o deploy (ver §4).

- **Fonte:** `~/.claude/deliverables/portfolio-resgatado/`
- **Backend:** PocketBase já LIVE em `http://192.168.x.x:8091` (container PocketBase, porta host 8091→8080). Saudável ✓.
- **Coleções:** `skills` (read público ✓), `projects` (read público ✓), `messages` (create público ✓ — formulário de contacto), `users` + admin auth para o painel `/admin`.

## 2. Build canónico (VALIDADO pela Aura)

```bash
cd <fonte>
npm install
VITE_PB_URL="<URL_PUBLICO_DO_BACKEND>" npm run build   # gera dist/
```

- Node v24, npm 11. `npm install` → 190 pkgs. Build `tsc -b && vite build` ✓ em ~3s.
- Output: `dist/` (~988 KB; um chunk JS de 983 KB — só warning, não bloqueia).
- **Provado:** o `VITE_PB_URL` é injetado no build. Build de teste com `https://pb.erik-lapadula.com` → o URL ficou no bundle e o IP local **desapareceu**.

### Alterações de código feitas pela Aura (já aplicadas na fonte)
1. `src/lib/pocketbase.ts` — URL deixou de ser hardcoded; agora `import.meta.env.VITE_PB_URL || 'http://localhost:8091'`.
2. `src/lib/pocketbase.ts` — removidos params não usados num callback (bloqueavam o `tsc` estrito).
3. Adicionado `.env.example` a documentar `VITE_PB_URL`.

## 3. Tipo de deploy

**Site estático** (dist/ servido por nginx/static), **NÃO** Nixpacks/Node.
Padrão do ecossistema = container liga a `127.0.0.1:PORT` e o **Cloudflare Tunnel** (container `cloudflare`, token mode) expõe publicamente. Mesmo molde do `ab730-web` (127.0.0.1:3000).

⚠️ **SPA fallback obrigatório:** usa `createBrowserRouter` com rotas `/admin`, `/login`, `/profile`, etc. O servidor estático tem de fazer **fallback de todas as rotas → `index.html`** (try_files). Sem isto, refresh em `/admin` dá 404.

- Porta local sugerida: **`127.0.0.1:3001`** (3000 já é do ab730). Confirmar livre.
- Healthcheck: `GET /` → 200 com o HTML; e a home deve listar skills/projects (prova que o backend público responde).

## 4. ⚠️ PONTO CRÍTICO — o backend tem de ser público

Como é SPA client-side, o browser do visitante chama o `VITE_PB_URL` diretamente.
Um IP de LAN (`192.168.x.x:8091`) **só funciona dentro de casa**. Para um portfolio
público na internet, o **PocketBase também precisa de um URL público** — senão skills/projects
aparecem vazios e o formulário de contacto falha para qualquer visitante externo.

**Caminho recomendado (Opção A):**
- Frontend: `portfolio.erik-lapadula.com` → tunnel → `127.0.0.1:3001`
- Backend: `pb.erik-lapadula.com` → tunnel → `127.0.0.1:8091` (ou localhost:8091)
- Build com `VITE_PB_URL=https://pb.erik-lapadula.com`

Ambos os hostnames adicionam-se no **Cloudflare Zero Trust → Tunnels → (este tunnel) → Public Hostnames** (tunnel é token-mode, config remota no dashboard; +DNS CNAME). Isto é trabalho Cloudflare do Forge/Marcos.

**Notas de segurança ao expor o PocketBase:**
- O painel admin do PocketBase (`/_/`) e o `/admin` do portfolio ficam internet-facing → garantir password de admin forte.
- Confirmar regras de API: read público em skills/projects ✓, create público em messages ✓, resto autenticado. (Já verificado pela Aura.)
- Verificar CORS do PocketBase para aceitar a origem `https://portfolio.erik-lapadula.com`.
- Apagar registo de probe deixado pelo teste: coleção `messages`, id `wgujwvrzfjeezk2` (nome `__probe__`).

## 5. Resumo do handoff (campos canónicos)

| Campo | Valor |
|---|---|
| Repo/fonte | `~/.claude/deliverables/portfolio-resgatado/` |
| Tipo | Site estático (Vite → `dist/`) |
| Build | `npm install && VITE_PB_URL=<backend> npm run build` |
| Artefacto | `dist/` |
| Porta local | `127.0.0.1:3001` (confirmar livre) |
| SPA fallback | SIM — todas as rotas → `index.html` |
| Env build-time | `VITE_PB_URL` (= URL público do backend) |
| Domínio frontend | `portfolio.erik-lapadula.com` *(sugerido — confirmar)* |
| Domínio backend | `pb.erik-lapadula.com` *(necessário se público — confirmar)* |
| Exposição | Cloudflare Tunnel (token-mode, hostnames no dashboard ZT) |
| Healthcheck | `GET /` → 200 + home lista skills/projects |

## 6. Decisões pendentes do Marcos

1. **Público ou só LAN?** Se público (provável, é um portfolio) → backend tem de ir a `pb.erik-lapadula.com`. Se só LAN → mantém-se o IP e nada disto é preciso.
2. **Domínio do frontend** — confirmar `portfolio.erik-lapadula.com` ou outro.
