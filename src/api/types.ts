export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export type InputType = 'image' | 'link';

export interface AnalyzeRequest {
  input_type: InputType;
  url?: string;
  note?: string;
  client_request_id?: string;
}

export interface ImageAnalyzeRequest {
  file: File;
  note?: string;
  client_request_id?: string;
}

export interface AnalyzeResponse {
  job_id: string;
}

export interface TextAnalysisCriteria {
  source_reliability: number;
  source_consistency: number;
  anonymous_sources: number;
  fact_verifiability: number;
  logical_consistency: number;
  emotional_language: number;
  evidence_level: number;
  title_body_consistency: number;
  language_quality: number;
  ad_spam: number;
}

export interface AnalysisResult {
  scores: TextAnalysisCriteria;
  total_score: number;
  risk_level: 'low' | 'medium' | 'high';
  summary: string;
  recommendations: string[];
}

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