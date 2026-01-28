import type { InputType, JobStatusResponse } from "@/api/types";
import { formatDateTime } from "@/utils/formatDateTime";
import { AlertTriangle, CheckCircle2, TriangleAlert } from "lucide-react";

type ListProps = {
  items: JobStatusResponse[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

const getRiskLabel = (risk?: "low" | "medium" | "high") => {
  switch (risk) {
    case "low":
      return "안전";
    case "medium":
      return "주의";
    case "high":
      return "위험";
    default:
      return "확인 불가";
  }
};

const getRiskStyles = (risk?: "low" | "medium" | "high") => {
  if (risk === "high")
    return {
      text: "text-red-600",
      bg: "bg-red-50",
      icon: <TriangleAlert size={15} className="text-red-600" />,
    };
  if (risk === "medium")
    return {
      text: "text-amber-600",
      bg: "bg-amber-50",
      icon: <AlertTriangle size={15} className="text-amber-600" />,
    };
  if (risk === "low")
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      icon: <CheckCircle2 size={15} className="text-emerald-700" />,
    };
  return {
    bg: "bg-white",
    icon: <AlertTriangle size={15} className="text-neutral-40" />,
  };
};

// const getStatusLabel = (status?: JobStatus) => {
//   switch (status) {
//     case "completed":
//       return "완료";
//     case "failed":
//       return "실패";
//     case "processing":
//       return "처리 중";
//     case "queued":
//       return "대기 중";
//     default:
//       return "상태 없음";
//   }
// };

const getInputTypeText = (inputType?: InputType) => {
  if (inputType === "image") return "이미지 분석";
  if (inputType === "link") return "기사 분석";
  return "분석";
};

export default function List({ items, selectedId, onSelect }: ListProps) {
  return (
    <div className="divide-y divide-neutral-90">
      {items.map((item, index) => {
        const risk = item.result?.risk_level;
        // const fallbackStatus = item.status;
        const styles = getRiskStyles(risk);
        const label = getRiskLabel(risk); //?? getStatusLabel(fallbackStatus);

        const isSelected = item.job_id === selectedId;
        const time = formatDateTime(
          item.completed_at || item.updated_at || item.created_at,
        );

        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.job_id}`}
            onClick={() => onSelect(item.job_id)}
            className={`px-5 py-4 flex items-center justify-between ${
              isSelected ? styles.bg : "bg-white"
            } ${isLast ? "border-b border-neutral-90" : ""}`}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">{styles.icon}</div>
              <div>
                <p className={`text-label-1 ${styles.text}`}>{label}</p>
                <p className="text-body-2 text-neutral-10 mt-2">
                  {getInputTypeText(item.input_type)}
                </p>
                <p className="text-caption-2 text-neutral-60 mt-1">
                  {getInputTypeText(item.input_type)}
                </p>
              </div>
            </div>
            <p className="text-caption-2 text-neutral-60">{time}</p>
          </div>
        );
      })}
    </div>
  );
}
