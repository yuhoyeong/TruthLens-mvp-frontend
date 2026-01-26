import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './endpoints';
import { ApiRequestError, NetworkError, handleApiError, type ApiError } from './errors';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export const apiClient = {
  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await httpClient.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async post<T = any>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      if (data instanceof FormData) {
        const headers = { ...((config as any)?.headers ?? {}) };
        // Let axios set multipart boundary — remove any explicit content-type
        if (headers['Content-Type'] || headers['content-type']) {
          delete (headers as any)['Content-Type'];
          delete (headers as any)['content-type'];
        }

        const finalConfig: AxiosRequestConfig = {
          ...(config ?? {}),
          headers,
        };

        const response = await httpClient.post<T>(endpoint, data, finalConfig);
        return response.data;
      }

      const response = await httpClient.post<T>(endpoint, data as any, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async put<T = any>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await httpClient.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await httpClient.delete<T>(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data as ApiError;
        return new ApiRequestError(
          errorData?.detail || axiosError.message,
          axiosError.response.status.toString(),
          errorData
        );
      } else if (axiosError.request) {
        return new NetworkError('네트워크 연결을 확인해주세요');
      }
    }

    return handleApiError(error);
  }
};