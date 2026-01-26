export interface ApiError {
  detail: string;
  error_code?: string;
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiRequestError extends Error {
  public statusCode: number;
  public apiError?: ApiError;

  constructor(message: string, statusCode?: string | number, apiError?: ApiError) {
    super(message);
    this.name = "ApiRequestError";
    this.statusCode = statusCode ? Number(statusCode) : 0;
    this.apiError = apiError;
  }

  static async fromResponse(response: Response): Promise<ApiRequestError> {
    let apiError: ApiError | undefined;

    try {
      const data = await response.json();
      apiError = data as ApiError;
    } catch {
      // ignore parse errors
    }

    const message = apiError?.detail || `HTTP ${response.status}: ${response.statusText}`;
    return new ApiRequestError(message, response.status, apiError);
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiRequestError) {
    throw error;
  }

  if (error instanceof TypeError && error.message.includes("fetch")) {
    throw new NetworkError("네트워크 연결을 확인해주세요.");
  }

  if (error instanceof Error) {
    throw new NetworkError(error.message);
  }

  throw new NetworkError("알 수 없는 오류가 발생했습니다.");
};