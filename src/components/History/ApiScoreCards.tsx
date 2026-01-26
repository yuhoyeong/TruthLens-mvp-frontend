import type { TextAnalysisCriteria } from "@/api/types";

type ApiScoreCardsProps = {
  scores?: Partial<TextAnalysisCriteria> | null;
};

const SCORE_CONFIG = {
  source_reliability: { title: "출처의 신뢰도", max: 15, icon: "🔍" },
  source_consistency: { title: "자료의 일관성", max: 10, icon: "📊" },
  anonymous_sources: { title: "익명 출처 사용", max: 10, icon: "👤" },
  fact_verifiability: { title: "사실 검증 가능성", max: 15, icon: "✅" },
  logical_consistency: { title: "논리적 일관성", max: 10, icon: "🧠" },
  emotional_language: { title: "감정적 언어 사용", max: 5, icon: "💭" },
  evidence_level: { title: "증거 수준", max: 15, icon: "📝" },
  title_body_consistency: { title: "제목과 본문 일관성", max: 5, icon: "📄" },
  language_quality: { title: "언어 품질", max: 10, icon: "📚" },
  ad_spam: { title: "광고/스팸 여부", max: 5, icon: "🚫" },
} as const;

export default function ApiScoreCards({ scores }: ApiScoreCardsProps) {
  const scoreKeys = Object.keys(SCORE_CONFIG) as (keyof typeof SCORE_CONFIG)[];

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-success-40";
    if (percentage >= 60) return "text-warning-40";
    return "text-error-40";
  };

  const getScorePercentage = (score: number, max: number) => {
    return Math.round((score / max) * 100);
  };

  return (
    <>
      {scoreKeys.map((key) => {
        const config = SCORE_CONFIG[key];
        const value =
          scores && typeof scores[key] === "number" ? scores[key] : 0;
        const percentage = getScorePercentage(value, config.max);
        const colorClass = getScoreColor(value, config.max);

        return (
          <div
            key={key}
            className="flex flex-row border border-neutral-96 rounded-2xl p-6 bg-white gap-4 min-w-0"
          >
            <div className="text-3xl shrink-0">{config.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-headline-2 text-neutral-10 break-words">
                {config.title}
              </p>
              <p className="text-caption-1 text-neutral-60 mt-1 break-words">
                {value}/{config.max}점
              </p>
              <div className="flex items-center gap-2 mt-3">
                <p
                  className={`text-3xl font-semibold ${colorClass} break-words`}
                >
                  {percentage}%
                </p>
                <div className="flex-1 bg-neutral-95 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 80
                        ? "bg-success-40"
                        : percentage >= 60
                          ? "bg-warning-40"
                          : "bg-error-40"
                    }`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
