export const API_BASE_URL = 'https://api-production-32c8.up.railway.app';

export const ENDPOINTS = {
  ANALYZE: '/api/v1/analyze',
  ANALYZE_IMAGE: '/api/v1/analyze/image',
  JOB_STATUS: (jobId: string) => `/api/v1/analyze/${jobId}`,
} as const;

export const API_VERSION = 'v1';