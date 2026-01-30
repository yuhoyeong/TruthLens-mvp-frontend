import type { JobStatusResponse } from "@/api/types";
import Detail from "@/components/History/Detail";
import HistoryFilters from "@/components/History/Filters";
import List from "@/components/History/List";
import { historyItems } from "@/data/history.mock";
import { useHistoryFilters } from "@/hooks/useHistoryFilters";

export default function History() {
  const items = historyItems as JobStatusResponse[];
  const {
    filteredItems,
    selectedId,
    setSelectedId,

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

    dateLabel,
    typeLabel,
    riskLabel,
  } = useHistoryFilters(items);

  const detail = filteredItems.find((d) => d.job_id === selectedId);

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        {/* title */}
        <div>
          <h1 className="text-heading-1 text-neutral-10">분석 히스토리</h1>
          <p className="text-body-1-r text-neutral-50 mt-2">
            트루스렌즈 회원님의 지금까지의 분석 결과가 보여집니다.
          </p>
        </div>

        {/* toggle */}
        <HistoryFilters
          dateLabel={dateLabel}
          typeLabel={typeLabel}
          riskLabel={riskLabel}
          isDateOpen={isDateOpen}
          isTypeOpen={isTypeOpen}
          isRiskOpen={isRiskOpen}
          setIsDateOpen={setIsDateOpen}
          setIsTypeOpen={setIsTypeOpen}
          setIsRiskOpen={setIsRiskOpen}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedRisk={selectedRisk}
          setSelectedRisk={setSelectedRisk}
        />
      </header>

      <div className="bg-white border border-neutral-90">
        <div className="flex flex-col lg:flex-row">
          {/* left side list */}
          <aside className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-neutral-90">
            <List
              items={filteredItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>

          {/* analyzed screen */}
          <Detail detail={detail} />
        </div>
      </div>
    </div>
  );
}
