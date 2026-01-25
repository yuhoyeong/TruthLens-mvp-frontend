import type { HistoryDetail } from "@/types/history"
import { FileDown, Share2 } from "lucide-react";
import ScoreCards from "@/components/History/ScoreCards";
import Risk from "@/components/History/Risk";

type DetailProps = {
  detail?: HistoryDetail;
};

export default function Detail({ detail }: DetailProps) {
  if (!detail) {
    return null;
  }

  return (
    <main className="flex-1 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-headline-1 text-neutral-10">
            분석 상세 내역
          </h2>
          <p className="text-caption-2 text-neutral-60 mt-1">
            분석일: {detail?.analyzedAt}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            <FileDown size={14} />
            PDF 다운로드
          </button>
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            <Share2 size={14} />
            공유
          </button>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-headline-2 text-neutral-10 mb-3">
          분석 사진
        </h3>
        <div className="rounded-2xl border border-neutral-90 p-4 bg-neutral-98">
          <div className="w-full h-[180px] bg-white border border-neutral-90 rounded-xl flex items-center justify-center text-neutral-60 text-label-2">
            이미지 미리보기
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-headline-2 text-neutral-10 mb-3">
            AI 생성 의심 점수
          </h3>
          <p className="text-caption-2 text-neutral-60 mb-4">
            위험 이미지로, 적극적인 법적 조치가 필요한 이미지입니다.
          </p>
          <div className="flex items-center gap-6">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background:
                  "conic-gradient(#dc2626 0deg 263deg, #e5e7eb 263deg 360deg)",
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white border border-neutral-90 flex flex-col items-center justify-center">
                <span className="text-title-3 text-red-600">
                  {detail.aiScore}
                </span>
                <span className="text-caption-2 text-neutral-60">
                  /100
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-headline-2 text-neutral-10 mb-3">
            세부 분석 항목
          </h3>
          <ScoreCards scores={detail.scores} />
        </div>
      </section>

      <Risk detail={detail} />
    </main>
  );
}