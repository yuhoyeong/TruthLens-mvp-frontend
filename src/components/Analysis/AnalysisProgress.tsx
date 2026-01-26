import { Loader2 } from "lucide-react";
import type { JobStatusResponse } from "@/api/types";

interface AnalysisProgressProps {
  jobId: string;
  jobStatus?: JobStatusResponse;
}

export default function AnalysisProgress({
  jobId,
  jobStatus,
}: AnalysisProgressProps) {
  const getStatusText = (status?: string) => {
    switch (status) {
      case "queued":
        return "대기 중";
      case "processing":
        return "처리 중";
      default:
        return "확인 중";
    }
  };

  return (
    <div className="mt-6 p-4 bg-primary-95 rounded-lg border border-primary-80">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-primary-40" />
        <div>
          <p className="text-body-2-m text-primary-20">분석 진행 중...</p>
          <p className="text-body-3-r text-primary-40">
            상태: {getStatusText(jobStatus?.status)}
          </p>
          <p className="text-body-3-r text-primary-50">Job ID: {jobId}</p>
        </div>
      </div>
    </div>
  );
}
