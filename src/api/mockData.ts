import type { AnalysisResult, JobStatusResponse } from './types';

export const mockAnalysisResult: AnalysisResult = {
  scores: {
    source_reliability: 7,
    source_consistency: 7,
    anonymous_sources: 6,
    fact_verifiability: 6,
    logical_consistency: 7,
    emotional_language: 3,
    evidence_level: 6,
    title_body_consistency: 7,
    language_quality: 8,
    ad_spam: 2,
  },
  total_score: 63,
  risk_level: 'medium',
  summary: '임시 mock 분석 결과입니다. 텍스트의 신뢰도와 일관성은 양호하지만 일부 근거가 부족합니다.',
  recommendations: [
    '출처 확인을 추가로 진행하세요.',
    '감정적 표현을 줄이고 근거를 명확히 제시하세요.',
  ],
};

export function createMockJobStatus(jobId: string): JobStatusResponse {
  const now = new Date().toISOString();
  return {
    job_id: jobId,
    status: 'completed',
    input_type: 'link',
    created_at: now,
    updated_at: now,
    completed_at: now,
    result: mockAnalysisResult,
  };
}

export const mockAnalyzeResponse = (jobId = `mock-${Date.now()}`) => ({ job_id: jobId });
