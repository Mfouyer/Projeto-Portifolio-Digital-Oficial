# Deploy & Manutenção — Portfolio (site vivo)

Como publicar a página e, depois, evoluí-la ao longo do tempo com o mínimo de
atrito. Feito sob medida para o teu stack: **SPA Vite/React → estático**,
**PocketBase** separado, exposto por **Cloudflare Tunnel**, orquestrado no
**Coolify**.

---

## Visão geral do ciclo

```
        VOCÊ                         GITHUB                 COOLIFY                 CLOUDFLARE
  ┌───────────────┐            ┌──────────────┐        ┌───────────────┐        ┌──────────────┐
  │ edita código  │  git push  │  repo (main) │ webhook│ build (Docker)│        │  Tunnel       │
  │ (você + eu)   │ ─────────► │              │ ─────► │  npm run build│ ─────► │  portfolio.…  │
  └───────────────┘            └──────────────┘        │  nginx (dist) │        │  pb.…         │
                                                        └───────────────┘        └──────────────┘
                                                                                        ▲
  ┌───────────────┐                                                                     │
  │ edita CONTEÚDO│  ── grava direto no PocketBase ─────────────────────────────────────┘
  │ pelo /admin   │      (skills, projects, messages) — SEM build, SEM deploy
  └───────────────┘
```

**Duas vias de mudança, dois fluxos:**

| Tipo de mudança | Onde | Precisa de deploy? | Quem faz |
|---|---|---|---|
| Projetos, skills, ler mensagens | Painel `/admin` (PocketBase) | ❌ Não — ao vivo | Você, sozinho |
| Layout, textos fixos, seções, cores, páginas novas | Código (repo) | ✅ Sim (automático) | Você + eu |

---

## Parte A — Setup inicial (uma vez só)

### 1. Subir o projeto no GitHub
- Crie um repositório (privado serve) e faça push do projeto **com os ficheiros
  da integração já aplicados** (ver `INTEGRATION.md`) e a pasta `deploy/` deste guia.
- `main` é a branch de produção: o que entra na `main` vai pro ar.

### 2. Backend público (obrigatório para site público)
O front é client-side: o **browser do visitante** chama o PocketBase direto.
Um IP de LAN (`192.168.x.x:8091`) só funciona em casa. Então:
- Exponha o PocketBase num hostname público, ex.: `pb.seu-dominio.com`
  (Cloudflare Zero Trust → Tunnels → Public Hostnames → aponta para `localhost:8091`).
- No **CORS do PocketBase**, libere a origem do front, ex.: `https://portfolio.seu-dominio.com`.
- Confirme as regras de API: **read público** em `skills` e `projects`,
  **create público** em `messages`, resto autenticado.
- Senha de admin forte (o painel `/_/` fica exposto à internet).

### 3. App no Coolify (build por Docker)
- Novo recurso → **Application** → fonte = o repo do GitHub.
- Build pack: **Dockerfile** (use o `deploy/Dockerfile` deste guia — já faz
  build do Vite + serve com nginx + SPA fallback).
- **Build argument:** `VITE_PB_URL = https://pb.seu-dominio.com`
  *(crítico — o Vite "assa" essa URL no bundle no momento do build).*
- Porta interna: **80** (o container nginx). Mapeie para a porta local livre
  que você usa no tunnel (ex.: `127.0.0.1:3001`).

### 4. Domínio do front via Cloudflare Tunnel
- Adicione `portfolio.seu-dominio.com` → tunnel → a porta local do app.
- Healthcheck: `GET /` → 200, e a home deve listar skills/projects
  (prova que o backend público está a responder).

---

## Parte B — Auto-deploy (o "redondo")

No Coolify, na aplicação:
1. Conecte o GitHub (GitHub App do Coolify) ou use o **Webhook** de deploy.
2. Ative **"Deploy on push"** para a branch `main`.

A partir daí: **todo push na `main` dispara build + deploy sozinho.** Você não
toca em servidor — só aprova o código e ele sobe.

> Dica: trabalhe em branches (`feat/...`) e abra Pull Request. O merge na `main`
> é o "botão publicar". Mantém histórico e permite reverter fácil.

---

## Parte C — Fluxo do dia a dia

### Mudar conteúdo (você, sozinho, instantâneo)
1. Entre em `/admin`.
2. Adicione/edite **Projects** ou **Skills** (marque "Destacar" para aparecer na home).
3. Salve. A página pública reflete no próximo carregamento. **Sem deploy.**
4. Mensagens do formulário chegam em `/admin/messages`.

### Mudar código/design (você + eu)
1. Você me diz o que quer ("muda a cor de destaque", "adiciona uma página de blog", etc.).
2. Eu edito e te mostro o preview aqui.
3. Você aprova.
4. O código vai pra `main` (ver as duas opções abaixo) → Coolify republica sozinho.

**Como o código chega na `main`:**
- **Opção 1 — eu conectado ao teu GitHub (recomendado):** eu edito direto sobre
  o teu repositório; você dá merge do PR → deploy automático. Ciclo mais curto.
- **Opção 2 — manual:** eu te entrego os ficheiros aqui, você copia pro repo,
  commita e dá push. Mais passos, mas zero dependências.

---

## Checklist de publicação (primeira vez)

- [ ] Repo no GitHub, `main` com integração + pasta `deploy/` aplicadas
- [ ] PocketBase público (`pb.seu-dominio.com`) + CORS liberado para o front
- [ ] Regras de API conferidas (read skills/projects, create messages)
- [ ] App no Coolify via `deploy/Dockerfile`, build arg `VITE_PB_URL` setado
- [ ] Domínio do front no tunnel (`portfolio.seu-dominio.com`)
- [ ] "Deploy on push" ligado na `main`
- [ ] Healthcheck: home lista skills/projects reais; formulário grava mensagem
- [ ] Senha forte no admin do PocketBase

---

## Notas

- **Quando preciso de redeploy?** Só em mudança de *código*. Conteúdo (admin) é ao vivo.
- **Trocar a URL do backend?** É build-time (`VITE_PB_URL`): mude no Coolify e
  redeploy — não basta editar em runtime.
- **Reverter uma mudança ruim?** Como tudo passa por git, dá pra voltar a um
  commit anterior e o Coolify republica a versão boa.
- O `Dockerfile` e o `nginx.conf` em `deploy/` substituem a necessidade de
  configurar build/SPA-fallback à mão — é o mesmo molde do teu `nginx-lan.conf`.
