import type { AnalysisResult, JobStatusResponse } from "@/api/types";

interface AnalysisDetailProps {
  result?: AnalysisResult | null;
  jobId: string;
  jobStatus?: JobStatusResponse;
}

export default function AnalysisDetail({
  result,
  jobId,
  jobStatus,
}: AnalysisDetailProps) {
  const summary = result?.summary ?? "-";
  const recommendations = Array.isArray(result?.recommendations)
    ? result!.recommendations
    : [];
  const getInputTypeText = (inputType?: string) => {
    switch (inputType) {
      case "image":
        return "이미지 분석";
      case "link":
        return "기사 분석";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-90">
      <h3 className="text-title-3 text-neutral-10 mb-4">분석 요약</h3>
      <p className="text-body-1-r text-neutral-30 mb-6 leading-relaxed">
        {summary}
      </p>

      {recommendations.length > 0 && (
        <>
          <h4 className="text-title-4 text-neutral-10 mb-3">권장사항</h4>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-body-2-r text-neutral-30"
              >
                <span className="w-2 h-2 bg-primary-40 rounded-full mt-2 shrink-0" />
                {recommendation}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-90 text-body-3-r text-neutral-60 space-y-1">
        <p>Job ID: {jobId}</p>
        <p>
          분석 완료:{" "}
          {jobStatus?.completed_at
            ? new Date(jobStatus.completed_at).toLocaleString("ko-KR")
            : "-"}
        </p>
        <p>분석 유형: {getInputTypeText(jobStatus?.input_type)}</p>
      </div>
    </div>
  );
}
