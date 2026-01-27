import type { JobStatusResponse } from "@/api/types";
import Detail from "@/components/History/Detail";
import List from "@/components/History/List";
import { historyDetail, historyItems } from "@/data/history.mock";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function History() {
  const items = historyItems as JobStatusResponse[];
  const [selectedId, setSelectedId] = useState(items[0]?.job_id);
  const detail = items.find((d) => d.job_id === selectedId);

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
        <div className="p-4 flex items-center gap-2">
          <CalendarDays size={16} className="text-neutral-50" />
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            전체 기간
            <ChevronDown size={14} />
          </button>
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            타입
            <ChevronDown size={14} />
          </button>
          <button className="px-3 py-2 text-label-2 text-neutral-50 bg-white border border-neutral-90 rounded-lg flex items-center gap-2">
            위험도
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      <div className="bg-white border border-neutral-90">
        <div className="flex flex-col lg:flex-row">
          {/* left side list */}
          <aside className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-neutral-90">
            <List
              items={items}
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
