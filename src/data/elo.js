export function skillBand(elo) {
  const rating = Number(elo);
  if (!Number.isFinite(rating)) return null;
  if (rating >= 1500) return 'Smart';
  if (rating >= 1100) return 'Average';
  return 'Beginner';
}

export function skillBandClass(band) {
  if (band === 'Smart') return 'bg-amber-100 text-amber-800 border-amber-200';
  if (band === 'Average') return 'bg-blue-100 text-blue-800 border-blue-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

function ratingSpan(elo) {
  const rating = Number(elo);
  const safe = Number.isFinite(rating) ? rating : 1200;
  return Math.min(1, Math.max(0, (safe - 900) / 900));
}

export function assignmentPlan(elo) {
  const span = ratingSpan(elo);
  const count = Math.min(18, Math.max(7, Math.round(18 - span * 11)));
  const hardShare = 0.1 + span * 0.55;
  return { count, hardShare, preferHard: span >= 0.5 };
}

export function selectByRating(items, elo) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return [];
  const plan = assignmentPlan(elo);
  const buckets = { Easy: [], Medium: [], Hard: [] };
  for (const item of list) {
    const level = buckets[item.level] ? item.level : 'Medium';
    buckets[level].push(item);
  }

  let hardN = Math.round(plan.count * plan.hardShare);
  let mediumN = Math.round(plan.count * 0.3);
  let easyN = plan.count - hardN - mediumN;
  if (easyN < 0) {
    mediumN = Math.max(0, mediumN + easyN);
    easyN = 0;
  }

  const take = (level, count) => {
    const picked = buckets[level].splice(0, Math.max(0, count));
    return picked;
  };

  const picked = [
    ...take('Hard', hardN),
    ...take('Medium', mediumN),
    ...take('Easy', easyN)
  ];
  const rest = plan.preferHard
    ? [...buckets.Hard, ...buckets.Medium, ...buckets.Easy]
    : [...buckets.Easy, ...buckets.Medium, ...buckets.Hard];
  for (const item of rest) {
    if (picked.length >= plan.count) break;
    picked.push(item);
  }

  const rank = { Easy: 0, Medium: 1, Hard: 2 };
  picked.sort((a, b) => plan.preferHard
    ? rank[b.level || 'Medium'] - rank[a.level || 'Medium']
    : rank[a.level || 'Medium'] - rank[b.level || 'Medium']);
  return picked.slice(0, Math.min(plan.count, list.length));
}

const LEVEL_RATING = { Easy: 1000, Medium: 1300, Hard: 1600 };

export function applyEloEvents(elo, events) {
  let rating = Number(elo);
  if (!Number.isFinite(rating)) rating = 1200;
  for (const event of events || []) {
    const outcome = event?.outcome;
    if (outcome !== 'correct' && outcome !== 'wrong' && outcome !== 'hint') continue;
    const opponent = LEVEL_RATING[event.level] || LEVEL_RATING.Medium;
    const expected = 1 / (1 + 10 ** ((opponent - rating) / 400));
    const score = outcome === 'correct' ? 1 : 0;
    const k = outcome === 'hint' ? 16 : 32;
    rating = Math.round(rating + k * (score - expected));
    rating = Math.min(2400, Math.max(600, rating));
  }
  return rating;
}
