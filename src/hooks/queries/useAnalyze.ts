import { useMutation, useQuery, queryOptions } from '@tanstack/react-query';
import { analyzeApi } from '../../api';
import type {
  JobStatusResponse,
} from '../../api/types';

// Query Keys
export const analyzeKeys = {
  all: ['analyze'] as const,
  jobStatus: (jobId: string) => [...analyzeKeys.all, 'jobStatus', jobId] as const,
};

// Job 상태 조회를 위한 queryOptions 정의
export const jobStatusQueryOptions = (
  jobId: string,
  config?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) => queryOptions({
  queryKey: analyzeKeys.jobStatus(jobId),
  queryFn: () => analyzeApi.getJobStatus(jobId),
  enabled: !!jobId && config?.enabled !== false,
  refetchInterval: (query) => {
    // 작업이 완료되거나 실패하면 폴링 중지
    if (query.state.data && ['completed', 'failed'].includes(query.state.data.status)) {
      return false;
    }
    return config?.refetchInterval ?? 2000; // 기본 2초 간격
  },
  refetchIntervalInBackground: true,
  staleTime: 0, // 항상 최신 상태를 확인
  gcTime: 1000 * 60 * 5, // 5분간 캐시 유지
});

// URL 분석 Mutation
export const useAnalyzeUrl = () => {
  return useMutation({
    mutationFn: analyzeApi.analyzeUrl,
    meta: {
      description: 'URL 기반 분석 (이미지 URL 또는 기사 링크)',
    },
  });
};

// 이미지 분석 Mutation
export const useAnalyzeImage = () => {
  return useMutation({
    mutationFn: analyzeApi.analyzeImage,
    meta: {
      description: '이미지 파일 업로드 분석',
    },
  });
};

// Job 상태 조회 Query (폴링용) - queryOptions 활용
export const useJobStatus = (
  jobId: string | undefined,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    onSuccess?: (data: JobStatusResponse) => void;
  }
) => {
  return useQuery({
    ...jobStatusQueryOptions(jobId || '', {
      enabled: options?.enabled,
      refetchInterval: options?.refetchInterval,
    }),
    enabled: !!jobId && options?.enabled !== false,
  });
};

// Job 상태를 한 번만 조회하는 Query - queryOptions 활용
export const useJobStatusOnce = (jobId: string | undefined, enabled = true) => {
  return useQuery({
    ...jobStatusQueryOptions(jobId || '', { enabled: false }),
    enabled: !!jobId && enabled,
    refetchInterval: false,
  });
};