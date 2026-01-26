import { apiClient } from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { JobStatusResponse } from './types';

export async function pollJobStatus(
  jobId: string,
  interval = 2000,
  timeout = 120000
): Promise<JobStatusResponse> {
  const start = Date.now();

  while (true) {
    const resp = await apiClient.get<JobStatusResponse>(ENDPOINTS.JOB_STATUS(jobId));
    if (resp.status === 'completed' || resp.status === 'failed') {
      return resp;
    }

    if (Date.now() - start > timeout) {
      throw new Error('Job polling timed out');
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

export default pollJobStatus;
