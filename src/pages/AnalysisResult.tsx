import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components";
import { useJobStatus } from "@/hooks";
import type { AnalysisResult } from "@/api";
import Detail from "@/components/History/Detail";

export default function AnalysisResult() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) {
      navigate("/");
    }
  }, [jobId, navigate]);

  const { data: jobStatus } = useJobStatus(jobId);

  return (
    <div>
      <header className="p-8 max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-heading-1 text-neutral-10 flex items-center gap-3">
              이미지의 진위를 확인해보세요
            </h1>
            <p className="text-body-1-r text-neutral-50 mt-2">
              이미지 또는 기사 링크를 업로드하면 AI가 생성한 콘텐츠인지 분석하고
              법적 리스크를 평가합니다.
            </p>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-2xl border border-neutral-90 p-6">
          <Detail detail={jobStatus} />
        </div>
      </div>
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button variant="outline" size="lg" fullWidth>
            전문가 법률 상담 연결
          </Button>
          <Button variant="primary" size="lg" fullWidth>
            프리미엄 리포트 샘플 확인
          </Button>
        </div>
      </div>
    </div>
  );
}
