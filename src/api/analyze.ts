import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  ImageAnalyzeRequest,
  JobStatusResponse,
} from './types';

export const analyzeApi = {
  analyzeUrl: async (request: AnalyzeRequest): Promise<AnalyzeResponse> => {
    return apiClient.post<AnalyzeResponse>(ENDPOINTS.ANALYZE, request);
  },

  analyzeImage: async (request: ImageAnalyzeRequest): Promise<AnalyzeResponse> => {
    const formData = new FormData();
    formData.append('file', request.file);
    
    if (request.note) {
      formData.append('note', request.note);
    }
    
    if (request.client_request_id) {
      formData.append('client_request_id', request.client_request_id);
    }

    return apiClient.post<AnalyzeResponse>(ENDPOINTS.ANALYZE_IMAGE, formData);
  },

  getJobStatus: async (jobId: string): Promise<JobStatusResponse> => {
    return apiClient.get<JobStatusResponse>(ENDPOINTS.JOB_STATUS(jobId));
  },
};