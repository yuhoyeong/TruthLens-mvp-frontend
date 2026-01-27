import type { TextAnalysisCriteria } from "@/api";
import { Icon1, Icon2, Icon3, Icon4 } from "@/assets/icons";

type ScoreCardsProps = {
  scores?: TextAnalysisCriteria | null;
};

const icons = [Icon1, Icon2, Icon3, Icon4];

const TEXT_ANALYSIS_CRITERIA = {
  source_reliability: {
    title: "출처의 신뢰도",
    desc: "출처 신뢰도 기반 평가",
    max: 15,
  },
  source_consistency: {
    title: "자료의 일관성",
    desc: "자료 간 일관성 평가",
    max: 10,
  },
  anonymous_sources: {
    title: "익명 출처 사용",
    desc: "익명 출처 사용 여부",
    max: 10,
  },
  fact_verifiability: {
    title: "사실 검증 가능성",
    desc: "사실 확인 가능성",
    max: 15,
  },
  // logical_consistency: {
  //   title: "논리적 일관성",
  //   desc: "논리 구조 검증",
  //   max: 10,
  // },
  // emotional_language: {
  //   title: "감정적 언어 사용",
  //   desc: "감정 표현 비중",
  //   max: 5,
  // },
  // evidence_level: {
  //   title: "증거 수준",
  //   desc: "근거 제시 수준",
  //   max: 15,
  // },
  // title_body_consistency: {
  //   title: "제목-본문 일관성",
  //   desc: "제목과 본문 일치 여부",
  //   max: 5,
  // },
  // language_quality: {
  //   title: "언어 품질",
  //   desc: "문장 품질 평가",
  //   max: 10,
  // },
  // ad_spam: {
  //   title: "광고/스팸 여부",
  //   desc: "광고성 여부",
  //   max: 5,
  // },
} as const;

export default function ScoreCards({ scores }: ScoreCardsProps) {
  if (!scores) {
    return null;
  }

  const scoreEntries = Object.entries(TEXT_ANALYSIS_CRITERIA) as [
    keyof typeof TEXT_ANALYSIS_CRITERIA,
    (typeof TEXT_ANALYSIS_CRITERIA)[keyof typeof TEXT_ANALYSIS_CRITERIA],
  ][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {scoreEntries.map(([key, config], index) => {
        const icon = icons[index];
        const value = scores[key] ?? 0;
        const percent = Math.round((value / config.max) * 100);

        return (
          <div
            key={key}
            className="flex flex-row border border-neutral-96 rounded-2xl p-6 bg-background gap-6 min-w-0"
          >
            {icon ? (
              <img src={icon} alt="" className="w-15 h-15 shrink-0" />
            ) : null}
            <div className="min-w-0">
              <p className="text-headline-2 text-neutral-10 break-words">{config.title}</p>
              <p className="text-caption-1 text-neutral-60 mt-2 break-words">{config.desc}</p>
              <p className="text-[40px] font-semibold text-neutral-10 mt-3 break-words">{percent}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}