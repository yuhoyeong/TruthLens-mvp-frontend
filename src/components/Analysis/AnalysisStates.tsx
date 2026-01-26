import { Clock, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components";
import type { JobStatusResponse } from "@/api";

interface AnalysisLoadingProps {
  jobStatus?: JobStatusResponse;
  message?: string;
}

export default function AnalysisLoading({
  jobStatus,
  message,
}: AnalysisLoadingProps) {
  const getStatusText = (status?: string) => {
    switch (status) {
      case "queued":
        return "대기 중";
      case "processing":
        return "처리 중";
      default:
        return "분석 중...";
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Clock className="w-12 h-12 animate-pulse text-primary-40 mx-auto mb-4" />
          <h2 className="text-title-2 text-neutral-10 mb-2">분석 진행 중</h2>
          <p className="text-body-1-r text-neutral-50">
            AI가 콘텐츠를 분석하고 있습니다. 잠시만 기다려주세요.
          </p>
          {message && (
            <p className="text-body-3-r text-neutral-60 mt-2">{message}</p>
          )}
          {jobStatus && (
            <div className="mt-4">
              <p className="text-body-3-r text-neutral-60">
                상태: {getStatusText(jobStatus.status)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface AnalysisErrorProps {
  error?: Error;
  jobStatus?: JobStatusResponse;
  onGoHome: () => void;
  jobId?: string;
}

export function AnalysisError({
  jobStatus,
  onGoHome,
  jobId,
}: AnalysisErrorProps) {
  const isJobFailed = jobStatus?.status === "failed";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-error-40 mx-auto mb-4" />
          <h2 className="text-title-2 text-neutral-10 mb-2">분석 실패</h2>
          <p className="text-body-1-r text-neutral-50 mb-2">
            {isJobFailed
              ? jobStatus.error_message || "알 수 없는 오류가 발생했습니다."
              : "분석 중 오류가 발생했습니다."}
          </p>
          {jobId && (
            <p className="text-body-3-r text-neutral-60 mb-4">
              Job ID: {jobId}
            </p>
          )}
          <Button onClick={onGoHome} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
