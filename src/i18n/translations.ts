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
      'Construo, governo e opero sistemas multi-agente de IA em produção. AI Transformation Lead baseado em Lisboa, consultor para empresas australianas.',

    'nav.about': 'Sobre',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Projetos',
    'nav.capabilities': 'Competências',
    'nav.credentials': 'Credenciais',
    'nav.cta': 'Agendar Chamada',

    'hero.badge': 'PORTFÓLIO DIGITAL — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'Construo, governo e opero',
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
      'Ao longo de mais de 15 anos na MEO — uma das maiores operadoras de telecomunicações de Portugal — geri governança Scrum e operações de serviço à escala empresarial. Sei o que quebra em volume, o que o negócio realmente precisa e como pôr equipas multifuncionais a remar na mesma direção. Essa disciplina operacional é a base sobre a qual tudo o resto assenta.',
    'about.act2.label': 'Ato II — O Construtor',
    'about.act2.h3': 'De usar ferramentas de IA a operar sistemas de IA.',
    'about.act2.p':
      'Não comecei apenas a usar IA — construí uma infraestrutura para ela. O OpenClaude é o meu próprio sistema multi-agente de IA: seis agentes especializados coordenados por uma camada de orquestração, a correr 24/7 num servidor self-hosted. Produção real. Orquestração real. Problemas reais resolvidos. Essa passagem de consumidor a arquiteto mudou a forma como vejo o que é possível.',
    'about.act3.label': 'Ato III — O Consultor',
    'about.act3.h3': 'Pronto para levar este playbook à sua organização.',
    'about.act3.p':
      'Estou agora disponível para empresas australianas que querem passar de experiências com IA a operações de IA. Ajudo equipas a desenhar arquiteturas de agentes, implementar frameworks de governança e construir sistemas que não apenas impressionam numa demo — funcionam de forma fiável em produção.',

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
      'Trabalho com empresas australianas que querem passar da curiosidade sobre IA às operações de IA. Uma conversa de 30 minutos é suficiente para saber se há encaixe.',
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

    _typed: [
      'sistemas de agentes de IA em produção, operacionais 24/7.',
      'automações que eliminam o trabalho manual e repetitivo.',
      'a governança que mantém a IA confiável, auditável e sob controlo.',
      'soluções multiplataforma que agregam valor às operações.',
      'IA que entrega resultado e valor de negócio, e não apenas protótipos.',
    ],
  },

  /* ───────── ENGLISH (EN) ───────── */
  en: {
    'meta.title': 'Erik Fouyer — AI Transformation Lead',
    'meta.desc':
      'I build, govern and operate multi-agent AI systems in production. AI Transformation Lead based in Lisbon, consulting for Australian enterprises.',

    'nav.about': 'About',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Projects',
    'nav.capabilities': 'Capabilities',
    'nav.credentials': 'Credentials',
    'nav.cta': 'Book a Call',

    'hero.badge': 'DIGITAL PORTFOLIO — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'I build, govern and operate',
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
      "Over 15 years at MEO — one of Portugal's largest telecoms — I ran Scrum governance and enterprise-scale service operations. I know what breaks at volume, what the business actually needs, and how to get cross-functional teams moving in the same direction. That operational discipline is the foundation everything else sits on.",
    'about.act2.label': 'Act II — The Builder',
    'about.act2.h3': 'From using AI tools to running AI systems.',
    'about.act2.p':
      "I didn't just start using AI — I built an infrastructure for it. OpenClaude is my own multi-agent AI system: six specialised agents coordinated by an orchestration layer, running 24/7 on a self-hosted server. Real production. Real orchestration. Real problems solved. That shift from consumer to architect changed how I see what's possible.",
    'about.act3.label': 'Act III — The Consultant',
    'about.act3.h3': 'Ready to bring this playbook to your organisation.',
    'about.act3.p':
      "I'm now available to Australian companies looking to move from AI experiments to AI operations. I help teams design agent architectures, implement governance frameworks, and build systems that don't just demo well — they run reliably in production.",

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
      "I work with Australian companies that want to move from AI curiosity to AI operations. A 30-minute conversation is enough to know if there's a fit.",
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

    _typed: [
      'AI agent systems in production, operational 24/7.',
      'automations that eliminate manual, repetitive work.',
      'the governance that keeps AI reliable, auditable and under control.',
      'cross-platform solutions that add value to operations.',
      'AI that delivers results and business value, not just prototypes.',
    ],
  },

  /* ───────── ESPAÑOL (ES) ───────── */
  es: {
    'meta.title': 'Erik Fouyer — AI Transformation Lead',
    'meta.desc':
      'Construyo, gobierno y opero sistemas multiagente de IA en producción. AI Transformation Lead con base en Lisboa, consultor para empresas australianas.',

    'nav.about': 'Sobre mí',
    'nav.openclaude': 'OpenClaude',
    'nav.projects': 'Proyectos',
    'nav.capabilities': 'Capacidades',
    'nav.credentials': 'Credenciales',
    'nav.cta': 'Agendar Llamada',

    'hero.badge': 'PORTAFOLIO DIGITAL — MARCOS FOUYER',
    'hero.title.line1': 'AI Transformation',
    'hero.title.accent': 'Lead.',
    'hero.tagline.prefix': 'Construyo, gobierno y opero',
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
      'Durante más de 15 años en MEO — una de las mayores operadoras de telecomunicaciones de Portugal — dirigí la gobernanza Scrum y operaciones de servicio a escala empresarial. Sé qué se rompe en volumen, qué necesita realmente el negocio y cómo lograr que equipos multifuncionales avancen en la misma dirección. Esa disciplina operativa es la base sobre la que se apoya todo lo demás.',
    'about.act2.label': 'Acto II — El Constructor',
    'about.act2.h3': 'De usar herramientas de IA a operar sistemas de IA.',
    'about.act2.p':
      'No solo empecé a usar IA — construí una infraestructura para ella. OpenClaude es mi propio sistema multiagente de IA: seis agentes especializados coordinados por una capa de orquestación, funcionando 24/7 en un servidor self-hosted. Producción real. Orquestación real. Problemas reales resueltos. Ese paso de consumidor a arquitecto cambió cómo veo lo que es posible.',
    'about.act3.label': 'Acto III — El Consultor',
    'about.act3.h3': 'Listo para llevar este playbook a tu organización.',
    'about.act3.p':
      'Ahora estoy disponible para empresas australianas que quieren pasar de experimentos con IA a operaciones de IA. Ayudo a equipos a diseñar arquitecturas de agentes, implementar marcos de gobernanza y construir sistemas que no solo lucen bien en una demo — funcionan de forma fiable en producción.',

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
      'Trabajo con empresas australianas que quieren pasar de la curiosidad por la IA a las operaciones de IA. Una conversación de 30 minutos es suficiente para saber si hay encaje.',
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

    _typed: [
      'sistemas de agentes de IA en producción, operativos 24/7.',
      'automatizaciones que eliminan el trabajo manual y repetitivo.',
      'la gobernanza que mantiene la IA fiable, auditable y bajo control.',
      'soluciones multiplataforma que aportan valor a las operaciones.',
      'IA que entrega resultados y valor de negocio, no solo prototipos.',
    ],
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
