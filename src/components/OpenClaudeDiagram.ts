// Diagrama de arquitetura do OpenClaude (SVG estático).
// Mantido como string para injeção via dangerouslySetInnerHTML —
// preserva o SVG original sem precisar converter ~120 atributos para JSX.
export const openClaudeDiagram = `
<svg viewBox="0 0 900 520" width="100%" xmlns="http://www.w3.org/2000/svg" style="font-family: 'JetBrains Mono', monospace;">
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1E1E24" stroke-width="0.5"/>
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-strong">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D97706;stop-opacity:0.1"/>
      <stop offset="50%" style="stop-color:#D97706;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#D97706;stop-opacity:0.1"/>
    </linearGradient>
    <linearGradient id="lineGradV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#D97706;stop-opacity:0.1"/>
      <stop offset="50%" style="stop-color:#D97706;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#D97706;stop-opacity:0.1"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#D97706;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#D97706;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <rect width="900" height="520" fill="url(#grid)" rx="8"/>
  <circle cx="450" cy="255" r="130" fill="url(#centerGlow)"/>

  <line x1="390" y1="235" x2="240" y2="178" stroke="#D97706" stroke-width="1" opacity="0.35" class="flow-line"/>
  <line x1="392" y1="270" x2="237" y2="330" stroke="#D97706" stroke-width="1" opacity="0.35" class="flow-line"/>
  <line x1="510" y1="235" x2="660" y2="178" stroke="#D97706" stroke-width="1" opacity="0.35" class="flow-line"/>
  <line x1="510" y1="270" x2="660" y2="330" stroke="#D97706" stroke-width="1" opacity="0.35" class="flow-line"/>
  <line x1="450" y1="213" x2="450" y2="136" stroke="#D97706" stroke-width="1" opacity="0.35" class="flow-line"/>

  <line x1="175" y1="155" x2="102" y2="102" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
  <path d="M 450,70 Q 450,90 450,108" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" fill="none" opacity="0.6"/>
  <line x1="175" y1="345" x2="100" y2="400" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
  <line x1="724" y1="152" x2="808" y2="102" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
  <line x1="724" y1="348" x2="808" y2="400" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
  <path d="M 392,90 Q 350,68 290,58" stroke="#4A4A58" stroke-width="1" stroke-dasharray="3,3" fill="none" opacity="0.6"/>

  <g class="node-center" transform="translate(390, 215)">
    <circle cx="60" cy="40" r="58" fill="none" stroke="#D97706" stroke-width="1" opacity="0.25"/>
    <circle cx="60" cy="40" r="48" fill="#17171B" stroke="#D97706" stroke-width="1.5"/>
    <circle cx="60" cy="40" r="40" fill="none" stroke="#D97706" stroke-width="0.5" stroke-dasharray="3,6" opacity="0.5"/>
    <text x="60" y="30" text-anchor="middle" font-size="18" fill="#D97706">✦</text>
    <text x="60" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.08em">AURA</text>
    <text x="60" y="61" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.1em">ORCHESTRATOR</text>
  </g>

  <g transform="translate(140, 120)">
    <rect x="0" y="0" width="100" height="68" rx="8" fill="#17171B" stroke="#1E1E24" stroke-width="1.5"/>
    <rect x="0" y="0" width="100" height="3" rx="2" fill="#F97316"/>
    <text x="50" y="22" text-anchor="middle" font-size="16" fill="#F97316">⚙</text>
    <text x="50" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.06em">FORGE</text>
    <text x="50" y="54" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.08em">INFRASTRUCTURE</text>
  </g>

  <g transform="translate(140, 300)">
    <rect x="0" y="0" width="100" height="68" rx="8" fill="#17171B" stroke="#1E1E24" stroke-width="1.5"/>
    <rect x="0" y="0" width="100" height="3" rx="2" fill="#6366F1"/>
    <text x="50" y="22" text-anchor="middle" font-size="16" fill="#6366F1">🧬</text>
    <text x="50" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.06em">HELIX</text>
    <text x="50" y="54" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.08em">ENGINEERING</text>
  </g>

  <g transform="translate(393, 60)">
    <rect x="0" y="0" width="115" height="68" rx="8" fill="#17171B" stroke="#1E1E24" stroke-width="1.5"/>
    <rect x="0" y="0" width="115" height="3" rx="2" fill="#8B5CF6"/>
    <text x="57" y="22" text-anchor="middle" font-size="16" fill="#8B5CF6">🧠</text>
    <text x="57" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.06em">CORTEX</text>
    <text x="57" y="54" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.08em">INTELLIGENCE</text>
  </g>

  <g transform="translate(660, 120)">
    <rect x="0" y="0" width="100" height="68" rx="8" fill="#17171B" stroke="#1E1E24" stroke-width="1.5"/>
    <rect x="0" y="0" width="100" height="3" rx="2" fill="#F59E0B"/>
    <text x="50" y="22" text-anchor="middle" font-size="16" fill="#F59E0B">💡</text>
    <text x="50" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.06em">LUMUS</text>
    <text x="50" y="54" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.08em">STRATEGY</text>
  </g>

  <g transform="translate(660, 300)">
    <rect x="0" y="0" width="100" height="68" rx="8" fill="#17171B" stroke="#1E1E24" stroke-width="1.5"/>
    <rect x="0" y="0" width="100" height="3" rx="2" fill="#EC4899"/>
    <text x="50" y="22" text-anchor="middle" font-size="16" fill="#EC4899">🫀</text>
    <text x="50" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#E8E8EC" letter-spacing="0.06em">ANIMA</text>
    <text x="50" y="54" text-anchor="middle" font-size="8" fill="#7A7A8A" letter-spacing="0.08em">REFLECTION</text>
  </g>

  <g transform="translate(48, 62)">
    <rect x="0" y="0" width="88" height="52" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="44" y="20" text-anchor="middle" font-size="10" fill="#4A4A58">⬛</text>
    <text x="44" y="34" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.06em">UBUNTU</text>
    <text x="44" y="46" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">SERVER</text>
  </g>

  <g transform="translate(48, 376)">
    <rect x="0" y="0" width="88" height="52" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="44" y="20" text-anchor="middle" font-size="10" fill="#4A4A58">⬛</text>
    <text x="44" y="34" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.06em">GITHUB</text>
    <text x="44" y="46" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">REPOS</text>
  </g>

  <g transform="translate(380, 12)">
    <rect x="0" y="0" width="88" height="40" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="44" y="17" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.06em">TELEGRAM</text>
    <text x="44" y="32" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">CHANNEL</text>
  </g>

  <g transform="translate(252, 36)">
    <rect x="0" y="0" width="88" height="40" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="44" y="17" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.06em">CLAUDE API</text>
    <text x="44" y="32" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">ANTHROPIC</text>
  </g>

  <g transform="translate(808, 72)">
    <rect x="0" y="0" width="80" height="52" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="40" y="20" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.04em">OBSIDIAN</text>
    <text x="40" y="34" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">NOTES</text>
    <text x="40" y="46" text-anchor="middle" font-size="7" fill="#2A2A32" letter-spacing="0.04em">MEMORY</text>
  </g>

  <g transform="translate(808, 376)">
    <rect x="0" y="0" width="80" height="52" rx="6" fill="#0A0A0B" stroke="#2A2A32" stroke-width="1"/>
    <text x="40" y="20" text-anchor="middle" font-size="9" fill="#4A4A58" letter-spacing="0.04em">FILES</text>
    <text x="40" y="34" text-anchor="middle" font-size="8" fill="#2A2A32" letter-spacing="0.06em">MEMORY</text>
    <text x="40" y="46" text-anchor="middle" font-size="7" fill="#2A2A32" letter-spacing="0.04em">AGENT</text>
  </g>

  <rect x="24" y="484" width="852" height="24" rx="4" fill="#0A0A0B" stroke="#1E1E24" stroke-width="1"/>
  <circle cx="42" cy="496" r="4" fill="#22C55E" opacity="0.9"/>
  <text x="54" y="500" font-size="9" fill="#4A4A58" letter-spacing="0.1em">ALL AGENTS OPERATIONAL</text>
  <text x="820" y="500" text-anchor="end" font-size="9" fill="#4A4A58" letter-spacing="0.06em" font-family="JetBrains Mono">24/7 — SELF-HOSTED</text>
</svg>
`;
