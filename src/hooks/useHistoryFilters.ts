import { useEffect, useMemo, useState } from "react";
import type { JobStatusResponse } from "@/api/types";

type SelectedType = "all" | "image" | "text";
type SelectedRisk = "all" | "low" | "medium" | "high";

export function useHistoryFilters(items: JobStatusResponse[]) {
  const [selectedId, setSelectedId] = useState(items[0]?.job_id);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isRiskOpen, setIsRiskOpen] = useState(false);

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedType, setSelectedType] = useState<SelectedType>("all");
  const [selectedRisk, setSelectedRisk] = useState<SelectedRisk>("all");

  const normalizedRange = useMemo(() => {
    const start = dateRange.start
      ? new Date(`${dateRange.start}T00:00:00`)
      : null;
    const end = dateRange.end
      ? new Date(`${dateRange.end}T23:59:59.999`)
      : null;

    if (start && end && start > end) return { start: end, end: start };
    return { start, end };
  }, [dateRange.end, dateRange.start]);

  const filteredItems = useMemo(() => {
    const { start, end } = normalizedRange;

    return items.filter((item) => {
      const target = new Date(
        item.completed_at || item.updated_at || item.created_at,
      );

      if (start && target < start) return false;
      if (end && target > end) return false;

      if (selectedType !== "all") {
        const expectedType = selectedType === "image" ? "image" : "link";
        if (item.input_type !== expectedType) return false;
      }

      if (selectedRisk !== "all") {
        if (item.result?.risk_level !== selectedRisk) return false;
      }

      return true;
    });
  }, [items, normalizedRange, selectedRisk, selectedType]);

  useEffect(() => {
    if (!filteredItems.find((item) => item.job_id === selectedId)) {
      setSelectedId(filteredItems[0]?.job_id);
    }
  }, [filteredItems, selectedId]);

  const formatDisplayDate = (value: string) => {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  };

  const dateLabel =
    dateRange.start || dateRange.end
      ? `${dateRange.start ? formatDisplayDate(dateRange.start) : ""}${
          dateRange.start && dateRange.end ? " ~ " : ""
        }${dateRange.end ? formatDisplayDate(dateRange.end) : ""}`
      : "전체 기간";

  const typeLabel =
    selectedType === "all"
      ? "타입"
      : selectedType === "image"
        ? "이미지"
        : "텍스트";

  const riskLabel =
    selectedRisk === "all"
      ? "위험도"
      : selectedRisk === "low"
        ? "안전"
        : selectedRisk === "medium"
          ? "주의"
          : "위험";

  return {
    filteredItems,
    selectedId,
    setSelectedId,

    // dropdown states
    isDateOpen,
    isTypeOpen,
    isRiskOpen,
    setIsDateOpen,
    setIsTypeOpen,
    setIsRiskOpen,

    // selections
    dateRange,
    setDateRange,
    selectedType,
    setSelectedType,
    selectedRisk,
    setSelectedRisk,

    // labels
    dateLabel,
    typeLabel,
    riskLabel,
  };
}