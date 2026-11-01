import { applyEloEvents } from './elo.js';
import { CONCEPTS, conceptById, prerequisites } from './conceptGraph.js';

const LEARN = 0.08;
const GUESS = 0.2;
const SLIP = 0.1;
const WEAK = 0.55;

export function priorFromElo(elo) {
  const rating = Number(elo);
  const safe = Number.isFinite(rating) ? rating : 1200;
  const span = Math.min(1, Math.max(0, (safe - 900) / 900));
  return Math.round((0.2 + span * 0.5) * 1000) / 1000;
}

export function bktUpdate(pKnow, outcome) {
  const pL = Math.min(0.99, Math.max(0.01, Number(pKnow) || 0.3));
  const correct = outcome === 'correct';
  const numerator = correct ? pL * (1 - SLIP) : pL * SLIP;
  const denominator = correct
    ? pL * (1 - SLIP) + (1 - pL) * GUESS
    : pL * SLIP + (1 - pL) * (1 - GUESS);
  const posterior = numerator / denominator;
  const learned = posterior + (1 - posterior) * (outcome === 'hint' ? 0 : LEARN);
  return Math.round(Math.min(0.99, Math.max(0.01, learned)) * 1000) / 1000;
}

function tested(state) {
  return Boolean(state && ((state.attempts || 0) + (state.hints || 0) > 0));
}

export function applyMastery(record, events, overallElo) {
  const next = { ...(record || {}) };
  const base = Number.isFinite(Number(overallElo)) ? Number(overallElo) : 1200;
  for (const event of events || []) {
    if (!conceptById(event?.concept)) continue;
    if (event.outcome !== 'correct' && event.outcome !== 'wrong' && event.outcome !== 'hint') continue;
    const current = next[event.concept] || {
      pKnow: priorFromElo(base),
      elo: base,
      attempts: 0,
      correct: 0,
      hints: 0
    };
    next[event.concept] = {
      pKnow: bktUpdate(current.pKnow, event.outcome),
      elo: applyEloEvents(current.elo, [event]),
      attempts: current.attempts + (event.outcome === 'hint' ? 0 : 1),
      correct: current.correct + (event.outcome === 'correct' ? 1 : 0),
      hints: current.hints + (event.outcome === 'hint' ? 1 : 0)
    };
  }
  return next;
}

function toneFor(state) {
  if (!tested(state)) return 'idle';
  if (state.pKnow >= 0.7) return 'strong';
  if (state.pKnow >= WEAK) return 'mid';
  return 'weak';
}

function names(ids) {
  return ids.map((id) => conceptById(id)?.name).filter(Boolean);
}

export function topicReport(record, overallElo, gradeNum) {
  const grade = Number(gradeNum) || 6;
  const visible = CONCEPTS.filter((concept) => concept.grade <= grade);
  const known = new Set(visible.map((concept) => concept.id));
  const isWeak = (id) => tested(record?.[id]) && record[id].pKnow < WEAK;

  const nodes = visible.map((concept) => {
    const state = record?.[concept.id];
    const buildsOn = prerequisites(concept.id).filter((id) => known.has(id));
    return {
      ...concept,
      buildsOn: names(buildsOn),
      tested: tested(state),
      pKnow: tested(state) ? state.pKnow : null,
      elo: tested(state) ? state.elo : null,
      attempts: state?.attempts || 0,
      correct: state?.correct || 0,
      hints: state?.hints || 0,
      tone: toneFor(state)
    };
  });

  const gaps = nodes.filter((node) => node.tone === 'weak').map((node) => {
    const weakEarlier = [];
    const seen = new Set([node.id]);
    const walk = (id) => {
      for (const parent of prerequisites(id)) {
        if (!known.has(parent) || seen.has(parent)) continue;
        seen.add(parent);
        if (isWeak(parent)) weakEarlier.push(parent);
        walk(parent);
      }
    };
    walk(node.id);
    const roots = weakEarlier.filter((id) => !prerequisites(id).some((parent) => weakEarlier.includes(parent)));
    const directUnseen = prerequisites(node.id).filter((id) => known.has(id) && !tested(record?.[id]));
    const rootNames = names(roots);
    const unseenNames = names(directUnseen);
    let detail = `${node.name} is weak on its own evidence: mastery ${Math.round(node.pKnow * 100)}%, topic Elo ${node.elo}.`;
    if (rootNames.length) {
      detail += ` The earliest tested gap is ${rootNames.join(' and ')}. Repair that before adding more ${node.name} practice.`;
    } else if (unseenNames.length) {
      detail += ` The concepts it builds on have not been tested: ${unseenNames.join(' and ')}. Check those before treating this as a new gap.`;
    } else {
      detail += ' The earlier topics that were tested are in better shape, so the gap starts here.';
    }
    return { id: node.id, name: node.name, detail, roots: rootNames };
  });

  return { nodes, gaps };
}
