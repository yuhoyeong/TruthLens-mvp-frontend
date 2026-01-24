import { historyDetail, historyItems } from "@/data/history.mock";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileDown,
  Filter,
  Share2,
  TriangleAlert,
} from "lucide-react";

const getStatusStyles = (status: string) => {
  if (status === "위험") {
    return {
      text: "text-red-600",
      bg: "bg-red-50",
      icon: <TriangleAlert size={14} className="text-red-500" />,
    };
  }
  if (status === "주의") {
    return {
      text: "text-amber-700",
      bg: "bg-amber-50",
      icon: <AlertTriangle size={14} className="text-amber-500" />,
    };
  }
  return {
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    icon: <CheckCircle2 size={14} className="text-emerald-500" />,
  };
};

export default function History() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        {/* title */}
        <div>
          <h1 className="text-heading-1 text-neutral-10">분석 히스토리</h1>
          <p className="text-body-1-r text-neutral-50 mt-2">
            트루스렌즈 회원님의 지금까지의 분석 결과가 보여집니다.
          </p>
        </div>

        {/* toggle */}
        <div className="p-4 border-b border-neutral-90 flex items-center gap-2">
          <CalendarDays size={16} className="text-neutral-50" />
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            전체 기간
            <ChevronDown size={14} />
          </button>
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            타입
            <ChevronDown size={14} />
          </button>
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            위험도
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      <div className="bg-white border border-neutral-90 rounded-2xl">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-neutral-90">

            <div className="divide-y divide-neutral-90">
              {historyItems.map((item, index) => {
                const styles = getStatusStyles(item.status);
                return (
                  <div
                    key={`${item.title}-${index}`}
                    className={`px-4 py-3 flex items-center justify-between ${
                      index === 0 ? styles.bg : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-1">{styles.icon}</div>
                      <div>
                        <p className={`text-label-2 ${styles.text}`}>
                          {item.status}
                        </p>
                        <p className="text-body-2 text-neutral-10 mt-1">
                          {item.title}
                        </p>
                        <p className="text-caption-2 text-neutral-60 mt-1">
                          이미지 분석
                        </p>
                      </div>
                    </div>
                    <p className="text-caption-2 text-neutral-60">
                      {item.time}
                    </p>
                  </div>
                );
              })}
            </div>
          </aside>

          <main className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-headline-1 text-neutral-10">
                  분석 상세 내역
                </h2>
                <p className="text-caption-2 text-neutral-60 mt-1">
                  분석일: 2026-01-11 14:30
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
                      <span className="text-title-3 text-red-600">73</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {historyDetail.scores.map((item) => (
                    <div
                      key={item.title}
                      className="border border-neutral-90 rounded-2xl p-4 bg-white"
                    >
                      <p className="text-body-2 text-neutral-10">
                        {item.title}
                      </p>
                      <p className="text-caption-2 text-neutral-60 mt-1">
                        {item.desc}
                      </p>
                      <p className="text-title-3 text-neutral-10 mt-3">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="text-headline-2 text-neutral-10 mb-3">
                법적 리스크 분석
              </h3>
              <p className="text-body-2 text-neutral-50 mb-4">
                해당 이미지는 AI 생성 콘텐츠의 전형적인 패턴을 보이며, 상업적
                사용 시 법적 위험이 높습니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-caption-2 text-neutral-50 bg-neutral-98 border border-neutral-90 rounded-full">
                  예상 합의 리스크 범위
                </span>
                <span className="px-3 py-1 text-caption-2 text-neutral-50 bg-neutral-98 border border-neutral-90 rounded-full">
                  5천만 원 - 2억 원
                </span>
              </div>
              <div className="border border-neutral-90 rounded-2xl p-4 bg-white">
                <p className="text-label-2 text-neutral-60 mb-3">권장 사항</p>
                <ul className="space-y-2 text-body-2 text-neutral-10">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    해당 콘텐츠의 광고/마케팅 활용은 자제하세요.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    권한 확보 확인 및 저작권 리스크를 검토하세요.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    법률 전문가와 상담 후 사용 여부를 결정하세요.
                  </li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
