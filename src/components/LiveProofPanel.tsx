import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/* ──────────────────────────────────────────────────────────
   LiveProofPanel — terminal-style animated proof panel.
   Shows 3 scenarios in loop:
     1. SITE   — "I need a website that converts"
     2. SaaS   — "Automate this process"
     3. AGENT  — "I want an agent 24/7"
   Each scenario types a client prompt, then runs 3 log
   steps, then lands on a success line.

   LAYOUT SHIFT FIX (2026-07-28):
   All elements are rendered in the DOM from t=0 with
   visibility:hidden or opacity:0. Animation only changes
   visibility/opacity — never adds/removes DOM nodes, never
   changes height. The body has a fixed height so the panel
   never reflowes the page.
   ────────────────────────────────────────────────────────── */

interface Scenario {
  type: string;
  prompt: string;
  steps: string[];
  result: string;
}

function buildScenarios(t: (k: string) => string): Scenario[] {
  return [
    {
      type: t('lp.type.site'),
      prompt: t('lp.s1.prompt'),
      steps: [t('lp.s1.step1'), t('lp.s1.step2'), t('lp.s1.step3')],
      result: t('lp.s1.result'),
    },
    {
      type: t('lp.type.saas'),
      prompt: t('lp.s2.prompt'),
      steps: [t('lp.s2.step1'), t('lp.s2.step2'), t('lp.s2.step3')],
      result: t('lp.s2.result'),
    },
    {
      type: t('lp.type.agent'),
      prompt: t('lp.s3.prompt'),
      steps: [t('lp.s3.step1'), t('lp.s3.step2'), t('lp.s3.step3')],
      result: t('lp.s3.result'),
    },
  ];
}

/* Fake timestamps — deterministic, not clock-based */
const TIMESTAMPS = ['09:12:04', '09:12:07', '09:12:11'];

/* Timing constants (ms) */
const CHAR_SPEED = 28;       // ms per char when typing prompt
const STEP_PAUSE = 680;      // pause between log lines appearing
const RESULT_PAUSE = 1800;   // how long to show the result before advancing
const SCENARIO_GAP = 600;    // blank moment between scenarios

type Phase =
  | { kind: 'typing-prompt'; charIdx: number }
  | { kind: 'steps'; stepIdx: number }
  | { kind: 'result' }
  | { kind: 'gap' };

interface State {
  scenarioIdx: number;
  phase: Phase;
  promptDisplayed: string;
  stepsDisplayed: number; // how many step lines are visible
  showResult: boolean;
}

const INITIAL_STATE: State = {
  scenarioIdx: 0,
  phase: { kind: 'typing-prompt', charIdx: 0 },
  promptDisplayed: '',
  stepsDisplayed: 0,
  showResult: false,
};

export const LiveProofPanel: React.FC = () => {
  const { t, lang } = useLanguage();

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scenarios = React.useMemo(() => buildScenarios(t), [lang]);  // eslint-disable-line react-hooks/exhaustive-deps

  const [state, setState] = React.useState<State>(INITIAL_STATE);

  /* Reset animation when language changes */
  React.useEffect(() => {
    setState(INITIAL_STATE);
  }, [lang]);

  React.useEffect(() => {
    if (prefersReduced) return;

    const scenario = scenarios[state.scenarioIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (state.phase.kind === 'typing-prompt') {
      const { charIdx } = state.phase;
      const target = scenario.prompt;
      if (charIdx < target.length) {
        timer = setTimeout(() => {
          setState((s) => ({
            ...s,
            promptDisplayed: target.slice(0, charIdx + 1),
            phase: { kind: 'typing-prompt', charIdx: charIdx + 1 },
          }));
        }, CHAR_SPEED);
      } else {
        /* Prompt done — move to first step */
        timer = setTimeout(() => {
          setState((s) => ({ ...s, phase: { kind: 'steps', stepIdx: 0 } }));
        }, STEP_PAUSE);
      }
    } else if (state.phase.kind === 'steps') {
      const { stepIdx } = state.phase;
      if (state.stepsDisplayed <= stepIdx) {
        /* Reveal next step */
        timer = setTimeout(() => {
          setState((s) => ({ ...s, stepsDisplayed: stepIdx + 1 }));
        }, STEP_PAUSE);
      } else if (stepIdx < scenario.steps.length - 1) {
        /* Advance to next step */
        timer = setTimeout(() => {
          setState((s) => ({
            ...s,
            phase: { kind: 'steps', stepIdx: stepIdx + 1 },
          }));
        }, STEP_PAUSE);
      } else {
        /* All steps done — show result */
        timer = setTimeout(() => {
          setState((s) => ({ ...s, showResult: true, phase: { kind: 'result' } }));
        }, STEP_PAUSE);
      }
    } else if (state.phase.kind === 'result') {
      timer = setTimeout(() => {
        setState((s) => ({ ...s, phase: { kind: 'gap' } }));
      }, RESULT_PAUSE);
    } else if (state.phase.kind === 'gap') {
      timer = setTimeout(() => {
        const nextIdx = (state.scenarioIdx + 1) % scenarios.length;
        setState({
          scenarioIdx: nextIdx,
          phase: { kind: 'typing-prompt', charIdx: 0 },
          promptDisplayed: '',
          stepsDisplayed: 0,
          showResult: false,
        });
      }, SCENARIO_GAP);
    }

    return () => clearTimeout(timer);
  }, [state, scenarios, prefersReduced]);

  const scenario = scenarios[state.scenarioIdx];

  /* ── Static fallback for prefers-reduced-motion ── */
  if (prefersReduced) {
    const s = scenarios[2]; /* show agent scenario */
    return (
      <div className="lp-panel" aria-label="Agent runtime demo">
        <div className="lp-titlebar">
          <span className="lp-dot lp-dot--red" />
          <span className="lp-dot lp-dot--yellow" />
          <span className="lp-dot lp-dot--green" />
          <span className="lp-titlebar-label">{t('lp.title')} — LIVE</span>
        </div>
        <div className="lp-body">
          <div className="lp-type-badge">{s.type}</div>
          <div className="lp-prompt-line">
            <span className="lp-prompt-arrow">{'>'}</span>
            {/* Reserve 2 lines of prompt height via lp-prompt-text--fixed */}
            <span className="lp-prompt-text lp-prompt-text--fixed">{s.prompt}</span>
          </div>
          {s.steps.map((step, i) => (
            <div className="lp-log-line" key={i}>
              <span className="lp-ts">{TIMESTAMPS[i]}</span>
              <span className="lp-status lp-status--ok">OK</span>
              <span className="lp-log-text">{step}</span>
            </div>
          ))}
          <div className="lp-result">
            <span className="lp-check" aria-hidden="true">&#10003;</span>
            <span>{s.result}</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Animated panel ──
     KEY PRINCIPLE: every element always in the DOM.
     Visibility is controlled by CSS classes (lp-*--hidden,
     lp-*--visible, lp-*--in). No elements are conditionally
     mounted/unmounted during animation — that is what was
     causing the layout shift. */
  return (
    <div className="lp-panel" aria-label="Agent runtime demo" aria-live="polite">
      {/* Title bar */}
      <div className="lp-titlebar">
        <span className="lp-dot lp-dot--red" />
        <span className="lp-dot lp-dot--yellow" />
        <span className="lp-dot lp-dot--green" />
        <span className="lp-titlebar-label">{t('lp.title')} — LIVE</span>
        <span className="lp-titlebar-live">
          <span className="lp-live-dot" />
        </span>
      </div>

      {/* Body — fixed height, never grows */}
      <div className="lp-body">
        {/* Scenario type badge — always present, fades between scenarios */}
        <div
          className={`lp-type-badge lp-type-badge--animate`}
          key={`badge-${state.scenarioIdx}`}
        >
          {scenario.type}
        </div>

        {/* Client prompt line — always present.
            lp-prompt-text--fixed reserves 2 lines via min-height
            so wrap during typing never shifts layout. */}
        <div className="lp-prompt-line">
          <span className="lp-prompt-arrow">{'>'}</span>
          <span className="lp-prompt-text lp-prompt-text--fixed">
            {state.promptDisplayed}
            {state.phase.kind === 'typing-prompt' && (
              <span className="lp-cursor lp-cursor--inline" aria-hidden="true" />
            )}
          </span>
        </div>

        {/* Log steps — ALL 3 always in DOM, revealed by class */}
        {scenario.steps.map((step, i) => (
          <div
            className={`lp-log-line${i < state.stepsDisplayed ? ' lp-log-line--visible' : ' lp-log-line--hidden'}`}
            key={`step-slot-${i}`}
            aria-hidden={i >= state.stepsDisplayed}
          >
            <span className="lp-ts">{TIMESTAMPS[i]}</span>
            <span className="lp-status lp-status--ok">OK</span>
            <span className="lp-log-text">{step}</span>
          </div>
        ))}

        {/* Result flourish — always in DOM, hidden until showResult */}
        <div
          className={`lp-result${state.showResult ? ' lp-result--visible lp-result--in' : ' lp-result--hidden'}`}
          aria-hidden={!state.showResult}
        >
          <span className="lp-check" aria-hidden="true">&#10003;</span>
          <span>{scenario.result}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveProofPanel;
