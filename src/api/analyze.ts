import { apiClient } from './apiClient';
import { ENDPOINTS } from './endpoints';
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  JobStatusResponse,
  ImageAnalyzeRequest,
} from './types';
import { ApiRequestError } from './errors';

export const analyzeApi = {
  analyzeUrl: async (request: AnalyzeRequest): Promise<AnalyzeResponse> => {
    const payload = {
      input_type: request.input_type || 'link',
      url: request.url,
      note: request.note,
      client_request_id: request.client_request_id,
    };

    return apiClient.post<AnalyzeResponse>(ENDPOINTS.ANALYZE, payload);
  },
  analyzeImage: async (request: ImageAnalyzeRequest): Promise<AnalyzeResponse> => {
    const formData = new FormData();
    formData.append('file', request.file);

    if (request.note) {
      formData.append('note', request.note);
    }

    if (request.client_request_id) {
      formData.append('client_request_id', request.client_request_id);
    } else {
      const id = `client-${Date.now()}`;
      formData.append('client_request_id', id);
    }

    try {
      return await apiClient.post<AnalyzeResponse>(ENDPOINTS.ANALYZE_IMAGE, formData);
    } catch (err: unknown) {
      if (err instanceof ApiRequestError && err.statusCode === 422) {
        await new Promise((r) => setTimeout(r, 700));
        return apiClient.post<AnalyzeResponse>(ENDPOINTS.ANALYZE_IMAGE, formData);
      }

      throw err;
    }
  },
  getJobStatus: async (jobId: string): Promise<JobStatusResponse> => {
    return apiClient.get<JobStatusResponse>(ENDPOINTS.JOB_STATUS(jobId));
  },
};