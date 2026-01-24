import type { HistoryDetail, HistoryItem } from "@/types/history";

export const historyItems: HistoryItem[] = [
  { id: "h-1", status: "위험", title: "뉴스 기사 이미지", time: "2026-01-11 14:30", kind: "기사" },
  { id: "h-2", status: "주의", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-3", status: "위험", title: "뉴스 기사 이미지", time: "2026-01-11 14:30", kind: "기사" },
  { id: "h-4", status: "위험", title: "뉴스 기사 이미지", time: "2026-01-11 14:30", kind: "기사" },
  { id: "h-5", status: "안전", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-6", status: "안전", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-7", status: "위험", title: "뉴스 기사 이미지", time: "2026-01-11 14:30", kind: "기사" },
  { id: "h-8", status: "주의", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-9", status: "주의", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-10", status: "주의", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-11", status: "주의", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" },
  { id: "h-12", status: "위험", title: "뉴스 기사 이미지", time: "2026-01-11 14:30", kind: "기사" },
  { id: "h-13", status: "안전", title: "강아지 이미지", time: "2026-01-11 14:30", kind: "이미지" }
];

export const historyDetail: HistoryDetail = {
  id: "h-1",
  analyzedAt: "2026-01-11 14:30",
  imageLabel: "뉴스 기사 이미지",
  aiScore: 73,
  scores: [
    { title: "픽셀 노이즈 패턴", desc: "합성 시 생성되는 아티팩트 감지", value: 85 },
    { title: "메타데이터 무결성", desc: "EXIF 정보 복원 또는 조작 추적", value: 62 },
    { title: "맥락적 일관성", desc: "객관성과 일관성 점검", value: 85 },
    { title: "텍스트 OCR 분석", desc: "이미지 내 텍스트 왜곡도 측정", value: 45 },
  ],
  riskSummary:
    "해당 이미지는 AI 생성 콘텐츠의 전형적인 패턴을 보이며, 상업적 사용 시 법적 위험이 높습니다.",
  riskRange: "5천만 원 - 2억 원",
  recommendations: [
    "해당 콘텐츠의 광고/마케팅 활용은 자제하세요.",
    "권한 확보 확인 및 저작권 리스크를 검토하세요.",
    "법률 전문가와 상담 후 사용 여부를 결정하세요.",
  ],
};