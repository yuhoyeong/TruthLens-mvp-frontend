import { AlertTriangle } from "lucide-react";
import type { AnalysisResult } from "@/api/types";

interface RiskSummaryProps {
  result: AnalysisResult;
}

export default function RiskSummary({ result }: RiskSummaryProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-success-40";
      case "medium":
        return "text-warning-40";
      case "high":
        return "text-error-40";
      default:
        return "text-neutral-40";
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "low":
        return "낮음";
      case "medium":
        return "보통";
      case "high":
        return "높음";
      default:
        return "확인 불가";
    }
  };

  const getRiskDescription = (risk: string) => {
    switch (risk) {
      case "high":
        return "주의 필요";
      case "medium":
        return "검토 권장";
      case "low":
        return "안전";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 border border-neutral-90">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-title-3 text-neutral-10 mb-1">위험도 평가</h3>
          <p className="text-body-2-r text-neutral-50">
            종합 점수: {result.total_score}/100
          </p>
        </div>
        <div className="text-right">
          <div
            className={`text-title-2 ${getRiskColor(result.risk_level)} mb-1`}
          >
            {getRiskText(result.risk_level)}
          </div>
          <div className="flex items-center gap-2">
            {result.risk_level === "high" && (
              <AlertTriangle className="w-5 h-5 text-error-40" />
            )}
            <span className="text-body-3-r text-neutral-50">
              {getRiskDescription(result.risk_level)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
