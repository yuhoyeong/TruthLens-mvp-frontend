import type { HistoryScore } from "@/types/history"

type ScoreCardsProps = {
  scores?: HistoryScore[];
};

export default function ScoreCards({ scores = [] }: ScoreCardsProps) {
  if (!scores.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {scores.map((item) => (
        <div
          key={item.title}
          className="border border-neutral-90 rounded-2xl p-4 bg-white"
        >
          <p className="text-body-2 text-neutral-10">{item.title}</p>
          <p className="text-caption-2 text-neutral-60 mt-1">{item.desc}</p>
          <p className="text-title-3 text-neutral-10 mt-3">{item.value}%</p>
        </div>
      ))}
    </div>
  );
}