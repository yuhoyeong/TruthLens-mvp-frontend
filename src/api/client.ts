import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { API_BASE_URL } from './endpoints';
import { ApiRequestError, NetworkError, handleApiError } from './errors';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export const apiClient = {
  async get<T>(endpoint: string, config?: any): Promise<T> {
    try {
      const response = await httpClient.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async post<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    try {
      if (data instanceof FormData) {
        const response = await httpClient.post<T>(endpoint, data, {
          ...config,
          headers: {
            ...config?.headers,
          },
        });
        return response.data;
      }
      
      const response = await httpClient.post<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async put<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    try {
      const response = await httpClient.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete<T>(endpoint: string, config?: any): Promise<T> {
    try {
      const response = await httpClient.delete<T>(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error: any): Error {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data as any;
        console.error("API Error Response:", errorData);
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