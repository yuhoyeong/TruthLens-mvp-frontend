import { useMutation, useQuery } from '@tanstack/react-query';
import { analyzeApi } from '../../api';
import type { JobStatusResponse } from '../../api/types';

export const analyzeKeys = {
  all: ['analyze'] as const,
  jobStatus: (jobId: string) => [...analyzeKeys.all, 'jobStatus', jobId] as const,
};

export const jobStatusQueryOptions = (
  jobId: string,
  config?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) => ({
  queryKey: analyzeKeys.jobStatus(jobId),
  queryFn: async () => {
    try {
      const resp = await analyzeApi.getJobStatus(jobId);
      if (!resp || !resp.job_id) {
        return {
          job_id: jobId,
          status: 'queued',
          input_type: 'image',
          created_at: new Date().toISOString(),
        } as unknown as JobStatusResponse;
      }

      return resp;
    } catch {
      return {
        job_id: jobId,
        status: 'queued',
        input_type: 'image',
        created_at: new Date().toISOString(),
      } as unknown as JobStatusResponse;
    }
  },
  enabled: !!jobId && config?.enabled !== false,
  refetchInterval: (query: any) => {
    if (query.state?.data && ['completed', 'failed'].includes(query.state.data.status)) {
      return false;
    }
    return config?.refetchInterval ?? 2000;
  },
  refetchIntervalInBackground: true,
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
});

export const useAnalyzeUrl = () => {
  return useMutation({
    mutationFn: analyzeApi.analyzeUrl,
    meta: {
      description: 'URL 분석',
    },
  });
};

export const useAnalyzeImage = () => {
  return useMutation({
    mutationFn: analyzeApi.analyzeImage,
    meta: {
      description: '이미지 파일 업로드 분석',
    },
  });
};

export const useJobStatus = (
  jobId: string | undefined,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    onSuccess?: (data: JobStatusResponse) => void;
  },
) => {
  return useQuery({
    ...jobStatusQueryOptions(jobId || '', {
      enabled: options?.enabled,
      refetchInterval: options?.refetchInterval,
    }),
    enabled: !!jobId && options?.enabled !== false,
  });
};

export const useJobStatusOnce = (jobId: string | undefined, enabled = true) => {
  return useQuery({
    ...jobStatusQueryOptions(jobId || '', { enabled: false }),
    enabled: !!jobId && enabled,
    refetchInterval: false,
  });
};