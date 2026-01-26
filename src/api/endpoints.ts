// API 엔드포인트 상수
export const API_BASE_URL = 'https://api-production-32c8.up.railway.app';

export const ENDPOINTS = {
  // 분석 관련
  ANALYZE: '/api/v1/analyze',
  ANALYZE_IMAGE: '/api/v1/analyze/image',
  JOB_STATUS: (jobId: string) => `/api/v1/analyze/${jobId}`,
} as const;

// API 버전
export const API_VERSION = 'v1';