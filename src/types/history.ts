/**
 * 임의로 설정한 최소한의 필드명입니다.
 * 백엔드 응답에 맞춰 변경해주세요.
 */
export type HistoryStatus = "위험" | "주의" | "안전";

export type HistoryItem = {
  id: string;
  status: HistoryStatus;
  title: string;
  time: string;
  kind: "이미지" | "기사";
};

export type HistoryScore = {
  title: string;
  desc: string;
  value: number;
}

export type HistoryDetail = {
  id: string;
  analyzedAt: string;
  imageLabel: string;
  aiScore: number;
  scores: HistoryScore[];
  riskSummary: string;
  riskRange: string;
  recommendations: string[];
}