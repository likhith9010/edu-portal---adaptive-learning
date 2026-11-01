export const CONCEPTS = [
  { id: 'c6-whole', name: 'Whole numbers', grade: 6, note: 'Counting, odd and even, and square numbers.' },
  { id: 'c6-patterns', name: 'Patterns and sequences', grade: 6, note: 'Number patterns and shape sequences.' },
  { id: 'c6-lines', name: 'Points, lines and rays', grade: 6, note: 'The objects an angle is built from.' },
  { id: 'c6-angles', name: 'Angles', grade: 6, note: 'Turns, right angles and complementary angles.' },
  { id: 'c6-play', name: 'Number play', grade: 6, note: 'Digit sums, palindromes and Kaprekar.' },
  { id: 'c6-data', name: 'Data handling', grade: 6, note: 'Tallies, pictographs and bar graphs.' },
  { id: 'c6-factors', name: 'Factors and multiples', grade: 6, note: 'Primes, common multiples and co-primes.' },
  { id: 'c7-integers', name: 'Integers', grade: 7, note: 'Directed numbers, used before rationals.' },
  { id: 'c7-fractions', name: 'Fractions', grade: 7, note: 'Parts of a whole, needed for rational numbers.' },
  { id: 'c7-angles', name: 'Lines and angles', grade: 7, note: 'Parallel lines and related angles.' },
  { id: 'c7-data', name: 'Comparing data', grade: 7, note: 'Reading and comparing data sets.' },
  { id: 'c8-rational', name: 'Rational numbers', grade: 8, note: 'Fractions of integers in standard form.' },
  { id: 'c8-linear', name: 'Linear equations', grade: 8, note: 'One variable, including fractions in equations.' },
  { id: 'c8-quads', name: 'Quadrilaterals', grade: 8, note: 'Angle sums and parallelograms.' },
  { id: 'c8-data', name: 'Data and probability', grade: 8, note: 'Pie charts and chance.' },
  { id: 'c8-squares', name: 'Squares and roots', grade: 8, note: 'Square numbers, roots and Pythagorean triplets.' },
  { id: 'c9-polynomials', name: 'Polynomials', grade: 9, note: 'Expressions built on linear equations.' },
  { id: 'c10-circles', name: 'Circles and solids', grade: 10, note: 'Uses earlier angle, square and area facts.' }
];

export const EDGES = [
  ['c6-whole', 'c6-patterns'],
  ['c6-whole', 'c6-play'],
  ['c6-whole', 'c6-factors'],
  ['c6-whole', 'c7-integers'],
  ['c6-factors', 'c7-fractions'],
  ['c7-integers', 'c7-fractions'],
  ['c6-lines', 'c6-angles'],
  ['c6-angles', 'c7-angles'],
  ['c6-data', 'c7-data'],
  ['c7-fractions', 'c8-rational'],
  ['c7-integers', 'c8-rational'],
  ['c8-rational', 'c8-linear'],
  ['c6-whole', 'c8-squares'],
  ['c6-factors', 'c8-squares'],
  ['c7-angles', 'c8-quads'],
  ['c7-data', 'c8-data'],
  ['c7-fractions', 'c8-data'],
  ['c8-linear', 'c9-polynomials'],
  ['c8-quads', 'c10-circles'],
  ['c8-squares', 'c10-circles']
];

const BY_ID = Object.fromEntries(CONCEPTS.map((concept) => [concept.id, concept]));

const MODULE_CONCEPT = {
  'm-1793481341217': 'c6-patterns',
  'm-1793481435098': 'c6-angles',
  'm-1793481472515': 'c6-play',
  'm-1793481540306': 'c6-data',
  'm-1793481583900': 'c6-factors',
  'm8-1': 'c8-rational',
  'm8-2': 'c8-linear',
  'm8-3': 'c8-quads',
  'm8-4': 'c8-data',
  'm8-5': 'c8-squares'
};

const SQUARE_PATTERN_IDS = new Set(['p6', 'p7', 'p10', 'p11', 'p15', 'p20']);

export function conceptById(id) {
  return BY_ID[id] || null;
}

export function prerequisites(id) {
  return EDGES.filter((edge) => edge[1] === id).map((edge) => edge[0]);
}

export function conceptFor(moduleId, itemId) {
  const id = String(itemId || '');
  if (id.startsWith('m81')) return 'c8-rational';
  if (id.startsWith('m82')) return 'c8-linear';
  if (id.startsWith('m83')) return 'c8-quads';
  if (id.startsWith('m84')) return 'c8-data';
  if (id.startsWith('m85')) return 'c8-squares';
  if (moduleId === 'm-1793481341217' && SQUARE_PATTERN_IDS.has(id)) return 'c6-whole';
  if (moduleId === 'm-1793481435098' && (/^l[1-4]$/.test(id) || /^lt[1-4]$/.test(id))) return 'c6-lines';
  return MODULE_CONCEPT[moduleId] || null;
}
