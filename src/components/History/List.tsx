import type { InputType, JobStatus, JobStatusResponse } from "@/api/types";
import { AlertTriangle, CheckCircle2, TriangleAlert } from "lucide-react";

type ListProps = {
  items: JobStatusResponse[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const getStatusLabel = (status?: JobStatus) => {
  switch (status) {
    case "completed":
      return "완료";
    case "failed":
      return "실패";
    case "processing":
      return "처리 중";
    case "queued":
      return "대기 중";
    default:
      return "상태 없음";
  }
};

const getStatusStyles = (status?: JobStatus) => {
  if (status === "failed") {
    return {
      text: "text-red-600",
      bg: "bg-red-50",
      icon: <TriangleAlert size={14} className="text-red-500" />,
    };
  }
  if (status === "completed") {
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      icon: <CheckCircle2 size={14} className="text-emerald-500" />,
    };
  }
  return {
    text: "text-amber-700",
    bg: "bg-amber-50",
    icon: <AlertTriangle size={14} className="text-amber-500" />,
  };
};

const getInputTypeText = (inputType?: InputType) => {
  if (inputType === "image") return "이미지 분석";
  if (inputType === "link") return "기사 분석";
  return "분석";
};

export default function List({ items, selectedId, onSelect }: ListProps) {
  return (
    <div className="divide-y divide-neutral-90">
      {items.map((item) => {
        const styles = getStatusStyles(item.status);
        const isSelected = item.job_id === selectedId;
        const time = item.completed_at || item.updated_at || item.created_at;
        
        return (
          <div
            key={`${item.job_id}`}
            onClick={() => onSelect(item.job_id)}
            className={`px-4 py-3 flex items-center justify-between ${
              isSelected ? styles.bg : "bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">{styles.icon}</div>
              <div>
                <p className={`text-label-2 ${styles.text}`}>
                  {getStatusLabel(item.status)}
                </p>
                <p className="text-body-2 text-neutral-10 mt-1">
                  {getInputTypeText(item.input_type)}
                </p>
                <p className="text-caption-2 text-neutral-60 mt-1">
                  이미지 분석
                </p>
              </div>
            </div>
            <p className="text-caption-2 text-neutral-60">
              {time}
            </p>
          </div>
        );
      })}
    </div>
  );
}