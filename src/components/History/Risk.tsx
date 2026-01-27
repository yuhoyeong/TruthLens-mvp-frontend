import type { JobStatusResponse } from "@/api";

type RiskProps = {
  detail?: JobStatusResponse;
};

const getRiskLabel = (risk?: "low" | "medium" | "high") => {
  if (risk === "high") return "높음";
  if (risk === "medium") return "중간";
  if (risk === "low") return "낮음";
  return "-";
};

export default function Risk({ detail }: RiskProps) {
  if (!detail?.result) {
    return null;
  }

  return (
    <section className="mt-16">
      <h3 className="text-headline-1 text-neutral-10 mb-5">법적 리스크 분석</h3>
      <p className="text-body-2 text-neutral-40 mb-5">{detail.result.summary ?? "-"}</p>
      <div className="flex flex-col gap-2 mb-4">
        <span className="inline-flex self-start px-3 py-1 text-label-1 text-neutral-20 font-medium bg-neutral-98 border border-neutral-96 rounded-lg">
          예상 합의 리스크 범위
        </span>
        <span className="px-3 py-1 text-body-2 text-neutral-50 rounded-full">
          {getRiskLabel(detail.result.risk_level)}
        </span>
      </div>
      <div>
        <p className="inline-flex self-start px-3 py-1 text-label-1 text-neutral-20 font-medium bg-neutral-98 border border-neutral-96 rounded-lg mb-3">권장 사항</p>
        <ul className="space-y-2 text-label-1 text-neutral-10">
          {(detail.result.recommendations ?? []).map((text) => (
            <li key={text} className="flex items-start gap-4">
              <span className="text-primary font-semibold">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}