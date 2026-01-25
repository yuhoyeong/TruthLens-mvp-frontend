import type { HistoryDetail } from "@/types/history";

type RiskProps = {
  detail?: HistoryDetail;
};

export default function Risk({ detail }: RiskProps) {
  if (!detail) {
    return null;
  }

  return (
    <section className="mt-8">
      <h3 className="text-headline-2 text-neutral-10 mb-3">법적 리스크 분석</h3>
      <p className="text-body-2 text-neutral-50 mb-4">{detail.riskSummary}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 text-caption-2 text-neutral-50 bg-neutral-98 border border-neutral-90 rounded-full">
          예상 합의 리스크 범위
        </span>
        <span className="px-3 py-1 text-caption-2 text-neutral-50 bg-neutral-98 border border-neutral-90 rounded-full">
          {detail.riskRange}
        </span>
      </div>
      <div className="border border-neutral-90 rounded-2xl p-4 bg-white">
        <p className="text-label-2 text-neutral-60 mb-3">권장 사항</p>
        <ul className="space-y-2 text-body-2 text-neutral-10">
          {detail.recommendations.map((text) => (
            <li key={text} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}