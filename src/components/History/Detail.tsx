import { FileDown, Share2 } from "lucide-react";
import ScoreCards from "@/components/History/ScoreCards";
import Risk from "@/components/History/Risk";
import type { JobStatusResponse } from "@/api";
import { formatDateTime } from "@/utils/formatDateTime";

type DetailProps = {
  detail?: JobStatusResponse;
};

export default function Detail({ detail }: DetailProps) {
  if (!detail) {
    return null;
  }

  const result = detail.result;
  const score = result?.total_score ?? 0;
  const angle = Math.round((score / 100) * 360);
  const analyzedAt = formatDateTime(
    detail.completed_at || detail.updated_at || detail.created_at
  );

  return (
    <main className="flex-1 px-8 py-6">
      <div className="flex items-start justify-between">
        <h2 className="text-heading-1 text-neutral-10">
          분석 상세 내역
        </h2>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-caption-2 text-neutral-40 bg-white border border-neutral-90 rounded-4xl flex items-center gap-1">
              <FileDown size={11} />
              PDF 다운
            </button>
            <button className="px-3 py-1 text-caption-2 text-neutral-40 bg-white border border-neutral-90 rounded-4xl flex items-center gap-1">
              <Share2 size={11} />
              공유
            </button>
          </div>
          <p className="text-caption-2 text-neutral-40 mt-1">
            분석일: {analyzedAt}
          </p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-headline-1 text-neutral-10 mb-3">
          분석 사진
        </h3>
        <div className="rounded-2xl border border-neutral-90 p-4 bg-neutral-98">
          <div className="w-full h-[180px] bg-white border border-neutral-90 rounded-xl flex items-center justify-center text-neutral-60 text-label-2">
              이미지 미리보기
            </div>
        </div>
      </section>

      <section className="mt-16 gap-6">
        <div>
          <h3 className="text-headline-1 text-neutral-10 mb-2">
            AI 생성 의심 점수
          </h3>
          <p className="text-caption-1 text-neutral-60 mb-6">
            위험 이미지로, 적극적인 법적 조치가 필요한 이미지입니다.
          </p>
          <div className="flex items-center gap-6">
            <div
              className="w-60 h-60 rounded-full flex items-center justify-center"
              style={{
                background:
                  `conic-gradient(#dc2626 0deg ${angle}deg, #e5e7eb ${angle}deg 360deg)`,
              }}
            >
              <div className="w-32 h-32 rounded-full bg-white border border-neutral-90 flex items-center justify-center">
                <div>
                  <span className="text-title-1 text-red-600">
                    {score}
                  </span>
                  <span className="text-caption-2 text-neutral-60">
                    /100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-headline-1 text-neutral-10 mt-16 mb-3">
            세부 분석 항목
          </h3>
          <ScoreCards scores={result?.scores} />
        </div>
      </section>

      <Risk detail={detail} />
    </main>
  );
}