// API 공통 타입 정의
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 분석 작업 상태
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

// 분석 입력 타입
export type InputType = 'image' | 'link';

// 분석 요청 타입
export interface AnalyzeRequest {
  input_type: InputType;
  url?: string;
  note?: string;
  client_request_id?: string;
}

// 이미지 업로드 분석 요청 (FormData)
export interface ImageAnalyzeRequest {
  file: File;
  note?: string;
  client_request_id?: string;
}

// 분석 응답 (job_id 반환)
export interface AnalyzeResponse {
  job_id: string;
}

// 분석 스코어 지표
export interface TextAnalysisCriteria {
  source_reliability: number;      // 출처의 신뢰도 (max: 15)
  source_consistency: number;      // 자료의 일관성 (max: 10)
  anonymous_sources: number;       // 익명 출처 사용 여부 (max: 10)
  fact_verifiability: number;      // 사실 검증 가능성 (max: 15)
  logical_consistency: number;     // 논리적 일관성 (max: 10)
  emotional_language: number;      // 감정적 언어 사용 (max: 5)
  evidence_level: number;          // 증거 수준 (max: 15)
  title_body_consistency: number;  // 제목과 본문 일관성 (max: 5)
  language_quality: number;        // 언어 품질 (max: 10)
  ad_spam: number;                 // 광고/스팸 여부 (max: 5)
}

// 분석 결과 상세 정보
export interface AnalysisResult {
  scores: TextAnalysisCriteria;
  total_score: number;
  risk_level: 'low' | 'medium' | 'high';
  summary: string;
  recommendations: string[];
}

// Job 상태 조회 응답
export interface JobStatusResponse {
  job_id: string;
  status: JobStatus;
  input_type: InputType;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  result?: AnalysisResult;
  error_message?: string;
}