import { Calendar, ChevronDown, Menu, TriangleAlert } from "lucide-react";

type HistoryFiltersProps = {
  dateLabel: string;
  typeLabel: string;
  riskLabel: string;

  isDateOpen: boolean;
  isTypeOpen: boolean;
  isRiskOpen: boolean;
  setIsDateOpen: (open: boolean) => void;
  setIsTypeOpen: (open: boolean) => void;
  setIsRiskOpen: (open: boolean) => void;

  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;

  selectedType: "all" | "image" | "text";
  setSelectedType: (value: "all" | "image" | "text") => void;

  selectedRisk: "all" | "low" | "medium" | "high";
  setSelectedRisk: (value: "all" | "low" | "medium" | "high") => void;
};

export default function HistoryFilters({
  dateLabel,
  typeLabel,
  riskLabel,

  isDateOpen,
  isTypeOpen,
  isRiskOpen,
  setIsDateOpen,
  setIsTypeOpen,
  setIsRiskOpen,

  dateRange,
  setDateRange,

  selectedType,
  setSelectedType,

  selectedRisk,
  setSelectedRisk,
}: HistoryFiltersProps) {
  return (
    <div className="p-4 flex items-center gap-2">
      <div className="relative">
        <button
          className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2"
          onClick={() => {
            setIsDateOpen(!isDateOpen);
            setIsTypeOpen(false);
            setIsRiskOpen(false);
          }}
        >
          <Calendar size={16} />
          {dateLabel}
          <ChevronDown size={14} />
        </button>
        {isDateOpen ? (
          <div className="absolute left-0 mt-2 w-64 bg-white border border-neutral-90 rounded-lg shadow-md p-3 z-10">
            <div className="text-caption-2 text-neutral-60 mb-2">기간 선택</div>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                className="w-full border border-neutral-90 rounded-md px-2 py-1 text-body-2"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border border-neutral-90 rounded-md px-2 py-1 text-body-2"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                className="text-caption-2 text-neutral-60"
                onClick={() => setDateRange({ start: "", end: "" })}
              >
                전체 기간
              </button>
              <button
                className="text-caption-2 text-primary"
                onClick={() => setIsDateOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <button
          className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2"
          onClick={() => {
            setIsTypeOpen(!isTypeOpen);
            setIsDateOpen(false);
            setIsRiskOpen(false);
          }}
        >
          <Menu size={16} />
          {typeLabel}
          <ChevronDown size={14} />
        </button>
        {isTypeOpen ? (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-neutral-90 rounded-lg shadow-md p-2 z-10">
            {[
              { value: "all", label: "전체" },
              { value: "image", label: "이미지" },
              { value: "link", label: "텍스트" },
            ].map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-3 py-2 rounded-md text-body-2 ${
                  selectedType === option.value
                    ? "bg-neutral-96 text-neutral-10"
                    : "text-neutral-50 hover:bg-neutral-98"
                }`}
                onClick={() => {
                  setSelectedType(option.value as "all" | "image" | "text");
                  setIsTypeOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <button
          className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2"
          onClick={() => {
            setIsRiskOpen(!isRiskOpen);
            setIsDateOpen(false);
            setIsTypeOpen(false);
          }}
        >
          <TriangleAlert size={16} />
          {riskLabel}
          <ChevronDown size={14} />
        </button>
        {isRiskOpen ? (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-neutral-90 rounded-lg shadow-md p-2 z-10">
            {[
              { value: "all", label: "전체" },
              { value: "low", label: "안전" },
              { value: "medium", label: "주의" },
              { value: "high", label: "위험" },
            ].map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-3 py-2 rounded-md text-body-2 ${
                  selectedRisk === option.value
                    ? "bg-neutral-96 text-neutral-10"
                    : "text-neutral-50 hover:bg-neutral-98"
                }`}
                onClick={() => {
                  setSelectedRisk(
                    option.value as "all" | "low" | "medium" | "high",
                  );
                  setIsRiskOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}