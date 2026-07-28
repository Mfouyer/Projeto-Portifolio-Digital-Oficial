/* ─────────────────────────────────────────────
   i18n — PT / EN / ES dictionary
   Literal copy of the approved mockup (i18n.js).
   Do NOT invent or paraphrase text — keep it in sync
   with the design source of truth.
   ───────────────────────────────────────────── */

export type Lang = 'pt' | 'en' | 'es';

export interface Dict {
  [key: string]: string | string[];
  _typed: string[];
}

export const I18N: Record<Lang, Dict> = {
  /* ───────── PORTUGUÊS (PT) ───────── */
  pt: {
    'meta.title': 'Erik Fouyer — AI Transformation Lead',
    'meta.desc':
      'Construo, governo e opero sistemas multi-agente de IA em produção. AI Transformation Lead baseado em Lisboa, ajudo organizações a transformar processos com IA e a gerar resultados mensuráveis.',

    'nav.about': 'Sobre',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Projetos',
    'nav.capabilities': 'Competências',
    'nav.credentials': 'Credenciais',
    'nav.cta': 'Entrar em Contacto',

    'hero.badge': 'PORTFÓLIO DIGITAL — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'Construo, governo e opero',
    'hero.services': [
      'Construção de Agentes',
      'Sites',
      'Micro-SaaS',
      'Automatização de Processos',
      'Análise de Viabilidade',
      'Consultoria em Processos com IA',
    ],
    'hero.btn.projects': 'Explorar Projetos',
    'hero.btn.skills': 'Explorar Competências',
    'hero.stat1.label': 'Anos em operações enterprise',
    'hero.stat2.label': 'Agentes de IA em produção',
    'hero.stat3.label': 'Sistemas a correr autonomamente',
    'hero.scroll': 'scroll',

    'about.label': 'Sobre',
    'about.h2.line1': 'Três atos.',
    'about.h2.line2': 'Uma direção clara.',
    'about.photo.note': 'Placeholder — adicione a sua foto',
    'about.photo.replace': 'Substituir pela foto real',
    'about.act1.label': 'Ato I — O Operador',
    'about.act1.h3': 'Construído para escalar desde o primeiro dia.',
    'about.act1.p':
      'Mais de 15 anos em operações de IT e gestão de serviços à escala empresarial — os últimos na MEO, uma das maiores operadoras de telecomunicações de Portugal, onde lidero qualidade e a transformação de processos manuais com IA e Power Platform. Antes, no Brasil, geri equipas de mais de 500 profissionais e contratos de alta complexidade para clientes como Petrobras, Telefónica, BNP Paribas, Bank of America, AIG, Dell, Lenovo e Airbus, entre outros. Domino a complexidade das operações de grande escala, compreendo as reais necessidades do negócio e sei alinhar equipas multifuncionais em torno de objetivos comuns — uma disciplina operacional que constitui o alicerce de tudo o que construo hoje.',

    'about.quals.h3': 'Habilitações & Credenciais',
    'about.quals.p':
      'Formação multidisciplinar que cruza tecnologia, negócio e desenvolvimento humano: licenciatura em Ciência da Computação, formação em Marketing e MBA (pós-graduação) em Negócios e Coaching. Certificado em Inteligência Artificial pela Microsoft — AI Business Professional (AB-730) e AI Transformation Leader (AB-731) — e em governança e gestão de serviços: ITIL, COBIT e Scrum Master. Utilizador avançado de Inteligência Artificial Generativa e Construção de Agentes. Esta combinação de habilitações dá uma visão tática e estratégica do negócio, permitindo aumentar a eficiência operacional através da adoção da Inteligência Artificial.',

    'about.act2.label': 'Ato II — O Construtor',
    'about.act2.h3': 'De usar ferramentas de IA a operar sistemas de IA.',
    'about.act2.p':
      'Não comecei apenas a usar IA — construí uma infraestrutura para ela. O OpenClaude é o meu próprio sistema multi-agente de IA: seis agentes especializados coordenados por uma camada de orquestração, a correr 24/7 num servidor self-hosted. Produção real. Orquestração real. Problemas reais resolvidos. Essa passagem de consumidor a arquiteto mudou a forma como vejo o que é possível.',
    'about.act3.label': 'Ato III — O Consultor',
    'about.act3.h3': 'Pronto para levar este playbook à sua organização.',
    'about.act3.p':
      'Estou agora disponível para levar a minha experiência em gestão de processos e projetos, potenciada pela adoção de IA, a organizações que procuram aumentar a eficiência, eliminar desperdícios e ligar o negócio à operação — gerando resultados mensuráveis e alcançáveis. Ajudo equipas a desenhar arquiteturas de agentes, implementar frameworks de governança e construir sistemas que não apenas impressionam numa demo, mas funcionam de forma fiável em produção.',

    'oc.label': 'Projeto Principal',
    'oc.h2.line1': 'OpenClaude — Um Sistema Multi-Agente',
    'oc.h2.line2': 'de IA em Produção',
    'oc.lead':
      'Uma framework de orquestração totalmente self-hosted construída de raiz. Seis agentes de IA especializados, uma camada de memória persistente, comunicação multicanal e execução autónoma de tarefas — a correr continuamente num único servidor Ubuntu.',
    'oc.tag1': 'Orquestração multi-agente',
    'oc.tag2': 'Self-hosted',
    'oc.tag3': 'Produção 24/7',
    'oc.tag4': 'Claude API',
    'oc.tag5': 'Integração Telegram',
    'oc.tag6': 'Memória persistente',
    'oc.diagram.title': 'OpenClaude — Arquitetura do Sistema',
    'oc.card1.h4': 'Agentes Especializados, Papéis Claros',
    'oc.card1.p':
      'Cada agente é dono de um domínio — infraestrutura, engenharia, estratégia, psicologia, inteligência. Sem confusão de responsabilidades. Cada agente conhece a sua fronteira e faz o handoff corretamente.',
    'oc.card2.h4': 'Camada de Memória Persistente',
    'oc.card2.p':
      'Os agentes mantêm contexto entre sessões através de memória estruturada baseada em ficheiros. Decisões tomadas numa conversa informam a seguinte — o sistema fica mais inteligente com o tempo, não apenas mais rápido.',
    'oc.card3.h4': 'Nível de Produção, Não uma Demo',
    'oc.card3.p':
      'A correr num servidor Ubuntu self-hosted com orquestração Coolify, acesso Tailscale, integrações reais (Telegram, GitHub, Obsidian) e uso operacional diário — não uma prova de conceito.',

    'proj.label': 'Outros Projetos',
    'proj.h2.line1': 'Automações, ferramentas',
    'proj.h2.line2': 'e experiências aplicadas.',
    'proj.lead':
      'Coisas construídas fora do OpenClaude — ferramentas para problemas reais, automações que correm diariamente e ideias transformadas em sistemas funcionais.',
    'proj.status.live': 'Ativo',
    'proj.status.soon': 'Em breve',
    'proj.empty':
      'Nenhum projeto destacado no momento. Adicione projetos pelo painel admin e marque “Destacar”.',

    'stack.eyebrow': 'COMO CONSTRUO',
    'stack.subtitle': 'O stack por trás das entregas.',
    'stack.group.agentes': 'Agentes & Orquestração',
    'stack.group.rag': 'RAG & Conhecimento',
    'stack.group.governanca': 'Governança & Ops',
    'stack.group.integracao': 'Integração & Cloud',

    'cap.label': 'O Que Entrego',
    'cap.h2': 'Competências — em linguagem de negócio.',
    'cap.lead':
      'Não uma lista de ferramentas. Uma descrição dos problemas que ajudo as organizações a resolver.',
    'cap.empty':
      'Nenhuma especialidade destacada. Adicione skills pelo painel admin e marque “Destacar”.',

    'cred.label': 'Credenciais',
    'cred.h2.line1': 'Conquistadas, em estudo',
    'cred.h2.line2': 'e no roadmap.',
    'cred.certs.title': 'Certificações',
    'cred.certs.groupAi': 'Credenciais AI',
    'cred.certs.groupOther': 'Outras Credenciais',
    'cred.roadmap.title': 'Roadmap de Aprendizagem',
    'cred.status.earned': 'Conquistada',
    'cred.status.studying': 'Em estudo',
    'cred.status.planned': 'Planeada',
    'cred.c1.title': 'Professional Scrum Master I',
    'cred.c1.desc': 'Scrum.org — Metodologia ágil e facilitação de equipas',
    'cred.c2.title': 'IIBA CBAP Pré-requisitos (AB-730/731)',
    'cred.c2.desc': 'Análise de Negócio — requisitos, gestão de stakeholders',
    'cred.c3.title': 'AI-102: Azure AI Engineer Associate',
    'cred.c3.desc': 'Microsoft — Desenho e implementação de soluções de IA',

    'contact.label': 'Entre em contacto',
    'contact.h2.line1': 'Pronto para falar sobre',
    'contact.h2.line2': 'o seu roadmap de IA?',
    'contact.p':
      'Trabalho com organizações que querem passar da curiosidade sobre IA às operações de IA. Uma conversa de 30 minutos é suficiente para saber se há encaixe.',
    'contact.field.name': 'O seu nome',
    'contact.field.email': 'O seu email',
    'contact.field.message': 'Fale-me do seu projeto ou desafio de IA',
    'contact.btn.send': 'Enviar mensagem',
    'contact.btn.sending': 'A enviar…',
    'contact.success.title': 'Mensagem enviada ✦',
    'contact.success.p': 'Obrigado pelo contacto — vou responder o mais breve possível.',
    'contact.success.again': 'Enviar outra mensagem',
    'contact.error': 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
    'contact.divider': 'ou contacte diretamente',

    'footer.logo.suffix': ' — AI Transformation Lead',
    'footer.copy': 'Construído com intenção — Lisboa, 2026',

    'nav.news': 'AI News',
    'nav.cv': 'Download CV',

    'news.meta.title': 'AI News — Marcos Fouyer',
    'news.meta.desc': 'Notícias de IA curadas diariamente pelo radar Córtex do sistema OpenClaude.',
    'news.label': 'AI NEWS — CURADORIA DIÁRIA POR IA',
    'news.cortex': 'Alimentado pelo radar Córtex do OpenClaude — o meu sistema multi-agente de IA que monitoriza, seleciona e resume automaticamente as notícias mais relevantes do ecossistema de inteligência artificial.',
    'news.today': 'Hoje',
    'news.yesterday': 'Ontem',
    'news.load_more': 'Carregar mais',
    'news.loading': 'A carregar notícias…',
    'news.empty': 'O radar ainda não recolheu notícias hoje. Volta mais tarde.',
    'news.back': '← Portfólio',
    'news.ticker_label': 'AO VIVO',
    'news.read_min': 'min de leitura',

    'cv.btn': 'Download CV',
    'cv.modal.title': 'Receber o CV',
    'cv.modal.subtitle': 'Deixa os teus dados e envio-te um link para descarregar o CV. Sem spam — só o link.',
    'cv.field.name': 'O teu nome',
    'cv.field.company': 'Nome da empresa',
    'cv.field.role': 'A tua função',
    'cv.field.email': 'O teu email',
    'cv.role.placeholder': 'Selecionar função',
    'cv.role.recruiter': 'Recrutador',
    'cv.role.client': 'Cliente',
    'cv.role.partner': 'Parceiro',
    'cv.role.enthusiast': 'Entusiasta',
    'cv.role.other': 'Outro',
    'cv.consent': 'Os teus dados são usados apenas para te enviar o link e me avisar do pedido.',
    'cv.btn.submit': 'Enviar',
    'cv.btn.submitting': 'A enviar…',
    'cv.success.title': '✉️ Verifica o teu email',
    'cv.success.body': 'O link do CV já segue para',
    'cv.success.note': 'Podes fechar esta janela.',
    'cv.success.close': 'Fechar',

    'cv.download.loading': 'A validar link…',
    'cv.download.success.title': 'Download iniciado ✦',
    'cv.download.success.body': 'O CV do Marcos Fouyer está a ser descarregado. Obrigado pelo interesse!',
    'cv.download.success.fallback': 'Se o download não iniciou,',
    'cv.download.success.link': 'clica aqui',
    'cv.download.error.title': 'Link inválido ou expirado',
    'cv.download.error.body': 'Este link não é válido ou já expirou. Os links têm validade de 7 dias.',
    'cv.download.error.cta': 'Pedir novo link',
    'cv.download.back': '← Portfólio',

    _typed: [
      'sistemas de agentes de IA em produção, operacionais 24/7.',
      'automações que eliminam o trabalho manual e repetitivo.',
      'a governança que mantém a IA confiável, auditável e sob controlo.',
      'soluções multiplataforma que agregam valor às operações.',
      'IA que entrega resultado e valor de negócio, e não apenas protótipos.',
    ],

    /* ── Live Proof panel ── */
    'lp.title': 'AGENT-RUNTIME',
    'lp.s1.prompt': '"Preciso de um site que converta"',
    'lp.s1.step1': 'Analisar brief e definir design system',
    'lp.s1.step2': 'Build React + Tailwind — Lighthouse 98',
    'lp.s1.step3': 'Deploy Coolify · SSL · domínio configurado',
    'lp.s1.result': 'LIVE em produção',
    'lp.s2.prompt': '"Automatiza este processo repetitivo"',
    'lp.s2.step1': 'Mapear fluxo · identificar pontos de automação',
    'lp.s2.step2': 'API REST + base de dados + billing integrado',
    'lp.s2.step3': 'Deploy · monitoring · alertas configurados',
    'lp.s2.result': 'SaaS a faturar',
    'lp.s3.prompt': '"Quero um agente que trate disto 24/7"',
    'lp.s3.step1': 'Orquestração multi-agente · tools definidas',
    'lp.s3.step2': 'Memória persistente · contexto entre sessões',
    'lp.s3.step3': 'Monitoring · auto-recovery · logs auditáveis',
    'lp.s3.result': 'Agente em produção 24/7',
    'lp.type.site': 'SITE',
    'lp.type.saas': 'MICRO-SAAS',
    'lp.type.agent': 'AGENTE',

    /* ── Credibility ticker ── */
    'ticker.fact1': '14 PROJETOS EM PRODUCAO',
    'ticker.fact2': '2 CERTIFICACOES MICROSOFT AI',
    'ticker.fact3': 'SISTEMAS MULTI-AGENTE EM PRODUCAO',
    'ticker.fact4': 'SITES',
    'ticker.fact5': 'MICRO-SAAS',
    'ticker.fact6': 'AGENTES',
  },

  /* ───────── ENGLISH (EN) ───────── */
  en: {
    'meta.title': 'Erik Fouyer — AI Transformation Lead',
    'meta.desc':
      'I build, govern and operate multi-agent AI systems in production. AI Transformation Lead based in Lisbon, helping organizations transform processes with AI and deliver measurable results.',

    'nav.about': 'About',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Projects',
    'nav.capabilities': 'Capabilities',
    'nav.credentials': 'Credentials',
    'nav.cta': 'Get in Touch',

    'hero.badge': 'DIGITAL PORTFOLIO — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'I build, govern and operate',
    'hero.services': [
      'Agent Development',
      'Websites',
      'Micro-SaaS',
      'Process Automation',
      'Feasibility Analysis',
      'AI Process Consulting',
    ],
    'hero.btn.projects': 'Explore Projects',
    'hero.btn.skills': 'Explore Skills',
    'hero.stat1.label': 'Years in enterprise ops',
    'hero.stat2.label': 'AI agents in production',
    'hero.stat3.label': 'Systems running autonomously',
    'hero.scroll': 'scroll',

    'about.label': 'About',
    'about.h2.line1': 'Three acts.',
    'about.h2.line2': 'One clear direction.',
    'about.photo.note': 'Placeholder — add your photo',
    'about.photo.replace': 'Replace with actual photo',
    'about.act1.label': 'Act I — The Operator',
    'about.act1.h3': 'Built for scale from day one.',
    'about.act1.p':
      "More than 15 years in IT operations and service management at enterprise scale — most recently at MEO, one of Portugal's largest telecoms, where I lead quality and the transformation of manual processes with AI and the Power Platform. Before that, in Brazil, I ran teams of over 500 professionals and high-complexity contracts for clients such as Petrobras, Telefónica, BNP Paribas, Bank of America, AIG, Dell, Lenovo and Airbus, among others. I master the complexity of large-scale operations, understand what the business truly needs, and know how to align cross-functional teams around shared goals — an operational discipline that forms the foundation of everything I build today.",

    'about.quals.h3': 'Qualifications & Credentials',
    'about.quals.p':
      'A multidisciplinary background bridging technology, business and human development: a degree in Computer Science, training in Marketing, and an MBA (postgraduate) in Business and Coaching. Certified in Artificial Intelligence by Microsoft — AI Business Professional (AB-730) and AI Transformation Leader (AB-731) — and in governance and service management: ITIL, COBIT and Scrum Master. Advanced user of Generative Artificial Intelligence and Agent Building. This combination of qualifications provides a tactical and strategic view of the business, enabling operational efficiency gains through the adoption of Artificial Intelligence.',

    'about.act2.label': 'Act II — The Builder',
    'about.act2.h3': 'From using AI tools to running AI systems.',
    'about.act2.p':
      "I didn't just start using AI — I built an infrastructure for it. OpenClaude is my own multi-agent AI system: six specialised agents coordinated by an orchestration layer, running 24/7 on a self-hosted server. Real production. Real orchestration. Real problems solved. That shift from consumer to architect changed how I see what's possible.",
    'about.act3.label': 'Act III — The Consultant',
    'about.act3.h3': 'Ready to bring this playbook to your organisation.',
    'about.act3.p':
      "I'm now available to bring my expertise in process and project management, powered by AI adoption, to organizations looking to increase efficiency, eliminate waste, and connect the business to its operations — delivering measurable, attainable results. I help teams design agent architectures, implement governance frameworks, and build systems that don't just demo well, but run reliably in production.",

    'oc.label': 'Flagship Project',
    'oc.h2.line1': 'OpenClaude — A Multi-Agent',
    'oc.h2.line2': 'AI System in Production',
    'oc.lead':
      'A fully self-hosted orchestration framework built from scratch. Six specialised AI agents, a persistent memory layer, multi-channel communication, and autonomous task execution — running continuously on a single Ubuntu server.',
    'oc.tag1': 'Multi-agent orchestration',
    'oc.tag2': 'Self-hosted',
    'oc.tag3': '24/7 production',
    'oc.tag4': 'Claude API',
    'oc.tag5': 'Telegram integration',
    'oc.tag6': 'Persistent memory',
    'oc.diagram.title': 'OpenClaude — System Architecture',
    'oc.card1.h4': 'Specialised Agents, Clear Roles',
    'oc.card1.p':
      'Each agent owns a domain — infrastructure, engineering, strategy, psychology, intelligence. No blurring of responsibilities. Every agent knows its boundary and hands off correctly.',
    'oc.card2.h4': 'Persistent Memory Layer',
    'oc.card2.p':
      'Agents maintain context across sessions via structured file-based memory. Decisions made in one conversation inform the next — the system gets smarter over time, not just faster.',
    'oc.card3.h4': 'Production-Grade, Not a Demo',
    'oc.card3.p':
      'Running on a self-hosted Ubuntu server with Coolify orchestration, Tailscale access, real integrations (Telegram, GitHub, Obsidian) and daily operational use — not a proof of concept.',

    'proj.label': 'Other Projects',
    'proj.h2.line1': 'Automations, tools',
    'proj.h2.line2': 'and applied experiments.',
    'proj.lead':
      'Things built outside of OpenClaude — tools for real problems, automations that run daily, and ideas turned into working systems.',
    'proj.status.live': 'Live',
    'proj.status.soon': 'Coming soon',
    'proj.empty':
      'No highlighted projects at the moment. Add projects from the admin panel and mark them as “Highlight”.',

    'stack.eyebrow': 'HOW I BUILD',
    'stack.subtitle': 'The stack behind the deliverables.',
    'stack.group.agentes': 'Agents & Orchestration',
    'stack.group.rag': 'RAG & Knowledge',
    'stack.group.governanca': 'Governance & Ops',
    'stack.group.integracao': 'Integration & Cloud',

    'cap.label': 'What I Deliver',
    'cap.h2': 'Capabilities — in business language.',
    'cap.lead':
      'Not a list of tools. A description of the problems I help organisations solve.',
    'cap.empty':
      'No highlighted capabilities. Add skills from the admin panel and mark them as “Highlight”.',

    'cred.label': 'Credentials',
    'cred.h2.line1': 'Earned, studying,',
    'cred.h2.line2': 'and on the roadmap.',
    'cred.certs.title': 'Certifications',
    'cred.certs.groupAi': 'AI Credentials',
    'cred.certs.groupOther': 'Other Credentials',
    'cred.roadmap.title': 'Learning Roadmap',
    'cred.status.earned': 'Earned',
    'cred.status.studying': 'Studying',
    'cred.status.planned': 'Planned',
    'cred.c1.title': 'Professional Scrum Master I',
    'cred.c1.desc': 'Scrum.org — Agile methodology and team facilitation',
    'cred.c2.title': 'IIBA CBAP Prerequisites (AB-730/731)',
    'cred.c2.desc': 'Business Analysis — requirements, stakeholder management',
    'cred.c3.title': 'AI-102: Azure AI Engineer Associate',
    'cred.c3.desc': 'Microsoft — AI solution design and implementation',

    'contact.label': 'Get in touch',
    'contact.h2.line1': 'Ready to talk about',
    'contact.h2.line2': 'your AI roadmap?',
    'contact.p':
      "I work with organizations that want to move from AI curiosity to AI operations. A 30-minute conversation is enough to know if there's a fit.",
    'contact.field.name': 'Your name',
    'contact.field.email': 'Your email',
    'contact.field.message': 'Tell me about your project or AI challenge',
    'contact.btn.send': 'Send message',
    'contact.btn.sending': 'Sending…',
    'contact.success.title': 'Message sent ✦',
    'contact.success.p': "Thanks for reaching out — I'll reply as soon as possible.",
    'contact.success.again': 'Send another message',
    'contact.error': 'An error occurred while sending the message. Please try again.',
    'contact.divider': 'or reach out directly',

    'footer.logo.suffix': ' — AI Transformation Lead',
    'footer.copy': 'Built with intention — Lisbon, 2026',

    'nav.news': 'AI News',
    'nav.cv': 'Download CV',

    'news.meta.title': 'AI News — Marcos Fouyer',
    'news.meta.desc': 'Daily AI news curated by the Córtex radar of the OpenClaude system.',
    'news.label': 'AI NEWS — AI-CURATED DAILY',
    'news.cortex': 'Powered by the Córtex radar of OpenClaude — my multi-agent AI system that automatically monitors, selects and summarises the most relevant news from the artificial intelligence ecosystem.',
    'news.today': 'Today',
    'news.yesterday': 'Yesterday',
    'news.load_more': 'Load more',
    'news.loading': 'Loading news…',
    'news.empty': "The radar hasn't collected any news today yet. Check back later.",
    'news.back': '← Portfolio',
    'news.ticker_label': 'LIVE',
    'news.read_min': 'min read',

    'cv.btn': 'Download CV',
    'cv.modal.title': 'Get the CV',
    'cv.modal.subtitle': "Leave your details and I'll send you a link to download the CV. No spam — just the link.",
    'cv.field.name': 'Your name',
    'cv.field.company': 'Company name',
    'cv.field.role': 'Your role',
    'cv.field.email': 'Your email',
    'cv.role.placeholder': 'Select role',
    'cv.role.recruiter': 'Recruiter',
    'cv.role.client': 'Client',
    'cv.role.partner': 'Partner',
    'cv.role.enthusiast': 'Enthusiast',
    'cv.role.other': 'Other',
    'cv.consent': 'Your data is only used to send you the link and notify me of the request.',
    'cv.btn.submit': 'Submit',
    'cv.btn.submitting': 'Sending…',
    'cv.success.title': '✉️ Check your email',
    'cv.success.body': 'The CV link is on its way to',
    'cv.success.note': 'You can close this window.',
    'cv.success.close': 'Close',

    'cv.download.loading': 'Validating link…',
    'cv.download.success.title': 'Download started ✦',
    'cv.download.success.body': "Marcos Fouyer's CV is being downloaded. Thanks for your interest!",
    'cv.download.success.fallback': "If the download didn't start,",
    'cv.download.success.link': 'click here',
    'cv.download.error.title': 'Invalid or expired link',
    'cv.download.error.body': 'This link is not valid or has expired. Links are valid for 7 days.',
    'cv.download.error.cta': 'Request new link',
    'cv.download.back': '← Portfolio',

    _typed: [
      'AI agent systems in production, operational 24/7.',
      'automations that eliminate manual, repetitive work.',
      'the governance that keeps AI reliable, auditable and under control.',
      'cross-platform solutions that add value to operations.',
      'AI that delivers results and business value, not just prototypes.',
    ],

    /* ── Live Proof panel ── */
    'lp.title': 'AGENT-RUNTIME',
    'lp.s1.prompt': '"I need a website that converts"',
    'lp.s1.step1': 'Analyse brief and define design system',
    'lp.s1.step2': 'Build React + Tailwind — Lighthouse 98',
    'lp.s1.step3': 'Deploy Coolify · SSL · domain configured',
    'lp.s1.result': 'LIVE in production',
    'lp.s2.prompt': '"Automate this repetitive process"',
    'lp.s2.step1': 'Map flow · identify automation touchpoints',
    'lp.s2.step2': 'REST API + database + billing integrated',
    'lp.s2.step3': 'Deploy · monitoring · alerts configured',
    'lp.s2.result': 'SaaS billing',
    'lp.s3.prompt': '"I want an agent handling this 24/7"',
    'lp.s3.step1': 'Multi-agent orchestration · tools defined',
    'lp.s3.step2': 'Persistent memory · context across sessions',
    'lp.s3.step3': 'Monitoring · auto-recovery · auditable logs',
    'lp.s3.result': 'Agent live in production 24/7',
    'lp.type.site': 'SITE',
    'lp.type.saas': 'MICRO-SAAS',
    'lp.type.agent': 'AGENT',

    /* ── Credibility ticker ── */
    'ticker.fact1': '14 PROJECTS IN PRODUCTION',
    'ticker.fact2': '2 MICROSOFT AI CERTIFICATIONS',
    'ticker.fact3': 'MULTI-AGENT SYSTEMS IN PRODUCTION',
    'ticker.fact4': 'SITES',
    'ticker.fact5': 'MICRO-SAAS',
    'ticker.fact6': 'AGENTS',
  },

  /* ───────── ESPAÑOL (ES) ───────── */
  es: {
    'meta.title': 'Erik Fouyer — AI Transformation Lead',
    'meta.desc':
      'Construyo, gobierno y opero sistemas multiagente de IA en producción. AI Transformation Lead con base en Lisboa, ayudo a organizaciones a transformar procesos con IA y generar resultados medibles.',

    'nav.about': 'Sobre mí',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Proyectos',
    'nav.capabilities': 'Capacidades',
    'nav.credentials': 'Credenciales',
    'nav.cta': 'Contactar',

    'hero.badge': 'PORTAFOLIO DIGITAL — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'Construyo, gobierno y opero',
    'hero.services': [
      'Desarrollo de Agentes',
      'Sitios Web',
      'Micro-SaaS',
      'Automatizacion de Procesos',
      'Analisis de Viabilidad',
      'Consultoria en Procesos con IA',
    ],
    'hero.btn.projects': 'Explorar Proyectos',
    'hero.btn.skills': 'Explorar Capacidades',
    'hero.stat1.label': 'Años en operaciones enterprise',
    'hero.stat2.label': 'Agentes de IA en producción',
    'hero.stat3.label': 'Sistemas funcionando de forma autónoma',
    'hero.scroll': 'scroll',

    'about.label': 'Sobre mí',
    'about.h2.line1': 'Tres actos.',
    'about.h2.line2': 'Una dirección clara.',
    'about.photo.note': 'Placeholder — añade tu foto',
    'about.photo.replace': 'Sustituir por la foto real',
    'about.act1.label': 'Acto I — El Operador',
    'about.act1.h3': 'Construido para escalar desde el primer día.',
    'about.act1.p':
      'Más de 15 años en operaciones de IT y gestión de servicios a escala empresarial — los últimos en MEO, una de las mayores operadoras de telecomunicaciones de Portugal, donde lidero calidad y la transformación de procesos manuales con IA y Power Platform. Antes, en Brasil, dirigí equipos de más de 500 profesionales y contratos de alta complejidad para clientes como Petrobras, Telefónica, BNP Paribas, Bank of America, AIG, Dell, Lenovo y Airbus, entre otros. Domino la complejidad de las operaciones a gran escala, comprendo las necesidades reales del negocio y sé alinear equipos multifuncionales en torno a objetivos comunes — una disciplina operativa que constituye la base de todo lo que construyo hoy.',

    'about.quals.h3': 'Titulaciones y Credenciales',
    'about.quals.p':
      'Una formación multidisciplinar que une tecnología, negocio y desarrollo humano: licenciatura en Ciencias de la Computación, formación en Marketing y un MBA (posgrado) en Negocios y Coaching. Certificado en Inteligencia Artificial por Microsoft — AI Business Professional (AB-730) y AI Transformation Leader (AB-731) — y en gobernanza y gestión de servicios: ITIL, COBIT y Scrum Master. Usuario avanzado de Inteligencia Artificial Generativa y Construcción de Agentes. Esta combinación de titulaciones aporta una visión táctica y estratégica del negocio, permitiendo aumentar la eficiencia operativa mediante la adopción de la Inteligencia Artificial.',

    'about.act2.label': 'Acto II — El Constructor',
    'about.act2.h3': 'De usar herramientas de IA a operar sistemas de IA.',
    'about.act2.p':
      'No solo empecé a usar IA — construí una infraestructura para ella. OpenClaude es mi propio sistema multiagente de IA: seis agentes especializados coordinados por una capa de orquestación, funcionando 24/7 en un servidor self-hosted. Producción real. Orquestación real. Problemas reales resueltos. Ese paso de consumidor a arquitecto cambió cómo veo lo que es posible.',
    'about.act3.label': 'Acto III — El Consultor',
    'about.act3.h3': 'Listo para llevar este playbook a tu organización.',
    'about.act3.p':
      'Ahora estoy disponible para llevar mi experiencia en gestión de procesos y proyectos, impulsada por la adopción de IA, a organizaciones que buscan aumentar la eficiencia, eliminar desperdicios y conectar el negocio con la operación — generando resultados medibles y alcanzables. Ayudo a equipos a diseñar arquitecturas de agentes, implementar marcos de gobernanza y construir sistemas que no solo lucen bien en una demo, sino que funcionan de forma fiable en producción.',

    'oc.label': 'Proyecto Insignia',
    'oc.h2.line1': 'OpenClaude — Un Sistema Multiagente',
    'oc.h2.line2': 'de IA en Producción',
    'oc.lead':
      'Un marco de orquestación totalmente self-hosted construido desde cero. Seis agentes de IA especializados, una capa de memoria persistente, comunicación multicanal y ejecución autónoma de tareas — funcionando continuamente en un único servidor Ubuntu.',
    'oc.tag1': 'Orquestación multiagente',
    'oc.tag2': 'Self-hosted',
    'oc.tag3': 'Producción 24/7',
    'oc.tag4': 'Claude API',
    'oc.tag5': 'Integración Telegram',
    'oc.tag6': 'Memoria persistente',
    'oc.diagram.title': 'OpenClaude — Arquitectura del Sistema',
    'oc.card1.h4': 'Agentes Especializados, Roles Claros',
    'oc.card1.p':
      'Cada agente es dueño de un dominio — infraestructura, ingeniería, estrategia, psicología, inteligencia. Sin difuminar responsabilidades. Cada agente conoce su frontera y hace el handoff correctamente.',
    'oc.card2.h4': 'Capa de Memoria Persistente',
    'oc.card2.p':
      'Los agentes mantienen contexto entre sesiones mediante memoria estructurada basada en archivos. Las decisiones tomadas en una conversación informan la siguiente — el sistema se vuelve más inteligente con el tiempo, no solo más rápido.',
    'oc.card3.h4': 'Nivel de Producción, No una Demo',
    'oc.card3.p':
      'Funcionando en un servidor Ubuntu self-hosted con orquestación Coolify, acceso Tailscale, integraciones reales (Telegram, GitHub, Obsidian) y uso operativo diario — no una prueba de concepto.',

    'proj.label': 'Otros Proyectos',
    'proj.h2.line1': 'Automatizaciones, herramientas',
    'proj.h2.line2': 'y experimentos aplicados.',
    'proj.lead':
      'Cosas construidas fuera de OpenClaude — herramientas para problemas reales, automatizaciones que funcionan a diario e ideas convertidas en sistemas funcionales.',
    'proj.status.live': 'Activo',
    'proj.status.soon': 'Próximamente',
    'proj.empty':
      'Ningún proyecto destacado por el momento. Añade proyectos desde el panel admin y márcalos como “Destacar”.',

    'stack.eyebrow': 'CÓMO CONSTRUYO',
    'stack.subtitle': 'El stack detrás de las entregas.',
    'stack.group.agentes': 'Agentes y Orquestación',
    'stack.group.rag': 'RAG y Conocimiento',
    'stack.group.governanca': 'Gobernanza y Ops',
    'stack.group.integracao': 'Integración y Cloud',

    'cap.label': 'Lo Que Entrego',
    'cap.h2': 'Capacidades — en lenguaje de negocio.',
    'cap.lead':
      'No una lista de herramientas. Una descripción de los problemas que ayudo a resolver a las organizaciones.',
    'cap.empty':
      'Ninguna capacidad destacada. Añade skills desde el panel admin y márcalas como “Destacar”.',

    'cred.label': 'Credenciales',
    'cred.h2.line1': 'Obtenidas, en estudio',
    'cred.h2.line2': 'y en el roadmap.',
    'cred.certs.title': 'Certificaciones',
    'cred.certs.groupAi': 'Credenciales AI',
    'cred.certs.groupOther': 'Otras Credenciales',
    'cred.roadmap.title': 'Roadmap de Aprendizaje',
    'cred.status.earned': 'Obtenida',
    'cred.status.studying': 'En estudio',
    'cred.status.planned': 'Planeada',
    'cred.c1.title': 'Professional Scrum Master I',
    'cred.c1.desc': 'Scrum.org — Metodología ágil y facilitación de equipos',
    'cred.c2.title': 'IIBA CBAP Prerrequisitos (AB-730/731)',
    'cred.c2.desc': 'Análisis de Negocio — requisitos, gestión de stakeholders',
    'cred.c3.title': 'AI-102: Azure AI Engineer Associate',
    'cred.c3.desc': 'Microsoft — Diseño e implementación de soluciones de IA',

    'contact.label': 'Ponte en contacto',
    'contact.h2.line1': '¿Listo para hablar sobre',
    'contact.h2.line2': 'tu roadmap de IA?',
    'contact.p':
      'Trabajo con organizaciones que quieren pasar de la curiosidad por la IA a las operaciones de IA. Una conversación de 30 minutos es suficiente para saber si hay encaje.',
    'contact.field.name': 'Tu nombre',
    'contact.field.email': 'Tu email',
    'contact.field.message': 'Cuéntame sobre tu proyecto o desafío de IA',
    'contact.btn.send': 'Enviar mensaje',
    'contact.btn.sending': 'Enviando…',
    'contact.success.title': 'Mensaje enviado ✦',
    'contact.success.p': 'Gracias por contactar — responderé lo antes posible.',
    'contact.success.again': 'Enviar otro mensaje',
    'contact.error': 'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    'contact.divider': 'o contacta directamente',

    'footer.logo.suffix': ' — AI Transformation Lead',
    'footer.copy': 'Construido con intención — Lisboa, 2026',

    'nav.news': 'AI News',
    'nav.cv': 'Descargar CV',

    'news.meta.title': 'AI News — Marcos Fouyer',
    'news.meta.desc': 'Noticias de IA curadas diariamente por el radar Córtex del sistema OpenClaude.',
    'news.label': 'AI NEWS — CURADURÍA DIARIA POR IA',
    'news.cortex': 'Impulsado por el radar Córtex de OpenClaude — mi sistema multiagente de IA que monitorea, selecciona y resume automáticamente las noticias más relevantes del ecosistema de inteligencia artificial.',
    'news.today': 'Hoy',
    'news.yesterday': 'Ayer',
    'news.load_more': 'Cargar más',
    'news.loading': 'Cargando noticias…',
    'news.empty': 'El radar todavía no ha recogido noticias hoy. Vuelve más tarde.',
    'news.back': '← Portafolio',
    'news.ticker_label': 'EN VIVO',
    'news.read_min': 'min de lectura',

    'cv.btn': 'Descargar CV',
    'cv.modal.title': 'Obtener el CV',
    'cv.modal.subtitle': 'Deja tus datos y te envío un enlace para descargar el CV. Sin spam — solo el enlace.',
    'cv.field.name': 'Tu nombre',
    'cv.field.company': 'Nombre de la empresa',
    'cv.field.role': 'Tu función',
    'cv.field.email': 'Tu email',
    'cv.role.placeholder': 'Seleccionar función',
    'cv.role.recruiter': 'Reclutador',
    'cv.role.client': 'Cliente',
    'cv.role.partner': 'Socio',
    'cv.role.enthusiast': 'Entusiasta',
    'cv.role.other': 'Otro',
    'cv.consent': 'Tus datos solo se usan para enviarte el enlace y avisarme de la solicitud.',
    'cv.btn.submit': 'Enviar',
    'cv.btn.submitting': 'Enviando…',
    'cv.success.title': '✉️ Revisa tu email',
    'cv.success.body': 'El enlace del CV ya va de camino a',
    'cv.success.note': 'Puedes cerrar esta ventana.',
    'cv.success.close': 'Cerrar',

    'cv.download.loading': 'Validando enlace…',
    'cv.download.success.title': 'Descarga iniciada ✦',
    'cv.download.success.body': 'El CV de Marcos Fouyer se está descargando. ¡Gracias por tu interés!',
    'cv.download.success.fallback': 'Si la descarga no comenzó,',
    'cv.download.success.link': 'haz clic aquí',
    'cv.download.error.title': 'Enlace inválido o caducado',
    'cv.download.error.body': 'Este enlace no es válido o ha caducado. Los enlaces son válidos por 7 días.',
    'cv.download.error.cta': 'Solicitar nuevo enlace',
    'cv.download.back': '← Portafolio',

    _typed: [
      'sistemas de agentes de IA en producción, operativos 24/7.',
      'automatizaciones que eliminan el trabajo manual y repetitivo.',
      'la gobernanza que mantiene la IA fiable, auditable y bajo control.',
      'soluciones multiplataforma que aportan valor a las operaciones.',
      'IA que entrega resultados y valor de negocio, no solo prototipos.',
    ],

    /* ── Live Proof panel ── */
    'lp.title': 'AGENT-RUNTIME',
    'lp.s1.prompt': '"Necesito un sitio web que convierta"',
    'lp.s1.step1': 'Analizar brief y definir design system',
    'lp.s1.step2': 'Build React + Tailwind — Lighthouse 98',
    'lp.s1.step3': 'Deploy Coolify · SSL · dominio configurado',
    'lp.s1.result': 'LIVE en producción',
    'lp.s2.prompt': '"Automatiza este proceso repetitivo"',
    'lp.s2.step1': 'Mapear flujo · identificar puntos de automatización',
    'lp.s2.step2': 'API REST + base de datos + billing integrado',
    'lp.s2.step3': 'Deploy · monitoring · alertas configurados',
    'lp.s2.result': 'SaaS facturando',
    'lp.s3.prompt': '"Quiero un agente que gestione esto 24/7"',
    'lp.s3.step1': 'Orquestación multiagente · tools definidas',
    'lp.s3.step2': 'Memoria persistente · contexto entre sesiones',
    'lp.s3.step3': 'Monitoring · auto-recovery · logs auditables',
    'lp.s3.result': 'Agente en producción 24/7',
    'lp.type.site': 'SITIO',
    'lp.type.saas': 'MICRO-SAAS',
    'lp.type.agent': 'AGENTE',

    /* ── Credibility ticker ── */
    'ticker.fact1': '14 PROYECTOS EN PRODUCCION',
    'ticker.fact2': '2 CERTIFICACIONES MICROSOFT AI',
    'ticker.fact3': 'SISTEMAS MULTIAGENTE EN PRODUCCION',
    'ticker.fact4': 'SITIOS WEB',
    'ticker.fact5': 'MICRO-SAAS',
    'ticker.fact6': 'AGENTES',
  },
};

export const I18N_LANGS: Lang[] = ['pt', 'en', 'es'];
export const I18N_NAMES: Record<Lang, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

/* Flag SVGs — literal copy from the mockup (i18n.js FLAG_SVG). */
export const FLAG_SVG: Record<Lang, string> = {
  pt: '<svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true"><rect width="20" height="14" rx="2" fill="#046A38"/><rect x="7.5" width="12.5" height="14" rx="0" fill="#DA291C"/><rect x="18" y="0" width="2" height="14" fill="#DA291C"/><circle cx="7.5" cy="7" r="2.6" fill="#FFE000" stroke="#fff" stroke-width="0.5"/></svg>',
  en: '<svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true"><rect width="20" height="14" rx="2" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" stroke-width="2.4"/><path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" stroke-width="1.2"/><path d="M10 0V14M0 7H20" stroke="#fff" stroke-width="3.6"/><path d="M10 0V14M0 7H20" stroke="#C8102E" stroke-width="2"/></svg>',
  es: '<svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true"><rect width="20" height="14" rx="2" fill="#C60B1E"/><rect y="3.5" width="20" height="7" fill="#FFC400"/></svg>',
};
