export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  ANALYZE: '/api/v1/analyze',
  ANALYZE_IMAGE: '/api/v1/analyze/image',
  JOB_STATUS: (jobId: string) => `/api/v1/analyze/${jobId}`,
} as const;

export const API_VERSION = 'v1';