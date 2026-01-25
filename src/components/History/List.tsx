import type { HistoryItem } from "@/types/history";
import { AlertTriangle, CheckCircle2, TriangleAlert } from "lucide-react";

type ListProps = {
  items: HistoryItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const getStatusStyles = (status: HistoryItem["status"]) => {
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

export default function List({ items, selectedId, onSelect }: ListProps) {
  return (
    <div className="divide-y divide-neutral-90">
      {items.map((item) => {
        const styles = getStatusStyles(item.status);
        const isSelected = item.id === selectedId;
        
        return (
          <div
            key={`${item.id}`}
            onClick={() => onSelect(item.id)}
            className={`px-4 py-3 flex items-center justify-between ${
              isSelected ? styles.bg : "bg-white"
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
  );
}