import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileDown, Share2 } from "lucide-react";
import {
  Button,
  AnalysisLoading,
  AnalysisError,
  RiskSummary,
  AnalysisDetail,
} from "@/components";
import { useJobStatus } from "@/hooks";
import ApiScoreCards from "@/components/History/ApiScoreCards";

export default function AnalysisResult() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Job ID가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!jobId) {
      navigate("/");
    }
  }, [jobId, navigate]);

  // Job 상태 조회
  const { data: jobStatus, isLoading, error } = useJobStatus(jobId);

  // 로딩 상태
  if (
    isLoading ||
    (jobStatus &&
      jobStatus.status !== "completed" &&
      jobStatus.status !== "failed")
  ) {
    return <AnalysisLoading jobStatus={jobStatus} />;
  }

  // 에러 상태 또는 실패 상태
  if (error || jobStatus?.status === "failed") {
    return (
      <AnalysisError
        error={error || undefined}
        jobStatus={jobStatus}
        onGoHome={() => navigate("/")}
        jobId={jobId}
      />
    );
  }

  // 분석 결과가 없는 경우
  if (!jobStatus?.result) {
    return <AnalysisLoading jobStatus={jobStatus} />;
  }

  const analysisResult = jobStatus.result;

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-heading-1 text-neutral-10 flex items-center gap-3">
              분석 결과
              <CheckCircle2 className="w-6 h-6 text-success-40" />
            </h1>
            <p className="text-body-1-r text-neutral-50 mt-2">
              AI가 분석한 콘텐츠의 위변조 가능성과 법적 리스크입니다.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            리포트 다운로드
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            공유하기
          </Button>
        </div>
      </header>

      {/* 위험도 요약 */}
      <RiskSummary result={analysisResult} />

      {/* 스코어 카드들 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <ApiScoreCards scores={analysisResult.scores} />
      </div>

      {/* 상세 분석 결과 */}
      <AnalysisDetail
        result={analysisResult}
        jobId={jobId!}
        jobStatus={jobStatus}
      />
    </div>
  );
}
