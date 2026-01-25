import { Icon1, Icon2, Icon3, Icon4 } from "@/assets/icons";
import type { HistoryScore } from "@/types/history"

type ScoreCardsProps = {
  scores?: HistoryScore[];
};

const icons = [Icon1, Icon2, Icon3, Icon4];

export default function ScoreCards({ scores = [] }: ScoreCardsProps) {
  if (!scores.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {scores.map((item, index) => {
        const icon = icons[index];

        return (
          <div
            key={item.title}
            className="flex flex-row border border-neutral-96 rounded-2xl p-6 bg-background gap-6 min-w-0"
          >
            {icon ? (
              <img src={icon} alt="" className="w-15 h-15 shrink-0" />
            ) : null}
            <div className="min-w-0">
              <p className="text-headline-2 text-neutral-10 break-words">{item.title}</p>
              <p className="text-caption-1 text-neutral-60 mt-2 break-words">{item.desc}</p>
              <p className="text-[40px] font-semibold text-neutral-10 mt-3 break-words">{item.value}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}