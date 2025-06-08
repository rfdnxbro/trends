export interface Trend {
  id: number;
  title: string;
  popularity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
}

export interface TrendsResponse {
  trends: Trend[];
}