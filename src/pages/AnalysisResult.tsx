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
import type { AnalysisResult } from "@/api";

export default function AnalysisResult() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) {
      navigate("/");
    }
  }, [jobId, navigate]);

  const { data: jobStatus, isLoading, error } = useJobStatus(jobId);

  if (
    isLoading ||
    (jobStatus &&
      jobStatus.status !== "completed" &&
      jobStatus.status !== "failed")
  ) {
    return <AnalysisLoading jobStatus={jobStatus} />;
  }

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

  const rawResult = jobStatus?.result;

  const isValidAnalysisResult = (r: unknown): r is AnalysisResult => {
    if (!r || typeof r !== "object") return false;
    const obj = r as any;
    return (
      obj.scores &&
      typeof obj.scores === "object" &&
      (typeof obj.summary === "string" || typeof obj.summary === "undefined")
    );
  };

  if (!rawResult || !isValidAnalysisResult(rawResult)) {
    const anyRaw = rawResult as any;
    const message =
      anyRaw?.message || anyRaw?.status || "분석 결과가 준비되지 않았습니다.";
    return <AnalysisLoading jobStatus={jobStatus} message={message} />;
  }

  const analysisResult = rawResult as AnalysisResult;

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
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

      <RiskSummary result={analysisResult} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <ApiScoreCards scores={analysisResult.scores} />
      </div>

      <AnalysisDetail
        result={analysisResult}
        jobId={jobId!}
        jobStatus={jobStatus}
      />
    </div>
  );
}
