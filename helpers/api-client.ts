import { environment } from '../config/environment';

export interface ApiResponse<T = unknown> {
  status: number;
  body: T;
  headers: Record<string, string | null>;
}

export class ApiClient {
  constructor(private baseUrl: string = environment.baseUrl) {}

  private parseResponse = async <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  };

  async get<T = unknown>(path: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, { method: 'GET' });
    const body = await this.parseResponse<T>(response);
    return {
      status: response.status,
      body,
      headers: {
        'content-type': response.headers.get('content-type'),
      },
    };
  }

  async post<T = unknown>(path: string, payload: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await this.parseResponse<T>(response);
    return {
      status: response.status,
      body,
      headers: {
        'content-type': response.headers.get('content-type'),
      },
    };
  }
}
