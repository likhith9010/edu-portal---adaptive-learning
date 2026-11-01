import { topicReport } from '../data/tracing';

const TONE = {
  strong: 'border-emerald-200 bg-emerald-50',
  mid: 'border-amber-200 bg-amber-50',
  weak: 'border-rose-200 bg-rose-50',
  idle: 'border-slate-200 bg-white'
};

const LABEL = {
  strong: 'text-emerald-800',
  mid: 'text-amber-800',
  weak: 'text-rose-800',
  idle: 'text-slate-500'
};

export default function TopicTrace({ record, elo, gradeNum }) {
  const report = topicReport(record, elo, gradeNum);
  const grades = [...new Set(report.nodes.map((node) => node.grade))];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-900">Topic map and root gaps</h2>
        <p className="text-xs text-slate-500 mt-1">
          Each topic keeps its own Elo. A Bayesian trace updates how likely the student knows it. Weak topics are followed backward through earlier classes to the first concept that needs repair.
        </p>
      </div>

      {report.gaps.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          No tested topic is weak yet. The map below is the order concepts build in. After a test or a hint, a weak topic shows its Elo and the earlier concept to repair first.
        </div>
      ) : (
        <div className="space-y-2">
          {report.gaps.map((gap) => (
            <div key={gap.id} className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-xs font-bold text-rose-800">Repair {gap.roots[0] || gap.name} first</p>
              <p className="text-xs text-rose-900 mt-1 leading-relaxed">{gap.detail}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {grades.map((grade) => (
          <div key={grade} className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Class {grade}</p>
            {report.nodes.filter((node) => node.grade === grade).map((node) => (
              <div key={node.id} className={`rounded-xl border p-3 ${TONE[node.tone]}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900">{node.name}</p>
                  <span className={`text-[10px] font-bold shrink-0 ${LABEL[node.tone]}`}>
                    {node.tested ? `Elo ${node.elo}` : 'Not tested'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">{node.note}</p>
                {node.tested && (
                  <p className="text-[11px] font-semibold text-slate-700 mt-1">
                    Mastery {Math.round(node.pKnow * 100)}% · {node.correct}/{node.attempts} right
                    {node.hints ? ` · ${node.hints} hint${node.hints === 1 ? '' : 's'}` : ''}
                  </p>
                )}
                {node.buildsOn.length > 0 && (
                  <p className="text-[11px] text-slate-500 mt-1">Builds on {node.buildsOn.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
