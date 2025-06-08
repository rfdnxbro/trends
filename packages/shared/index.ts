export interface Trend {
  id: number;
  title: string;
  url: string;
  popularity: number;
  source: TrendSource;
  companyId?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  domain: string;
  logoUrl?: string;
  description?: string;
  industry?: string;
  size?: CompanySize;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DailyMetrics {
  id: number;
  companyId: number;
  date: string;
  trendCount: number;
  totalPopularity: number;
  avgPopularity: number;
  rank: number;
  trendsBreakdown: {
    hatena: number;
    qiita: number;
    zenn: number;
  };
}

export interface CompanyInfluence {
  company: Company;
  currentMetrics: DailyMetrics;
  previousMetrics?: DailyMetrics;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  topTrends: Trend[];
}

export enum TrendSource {
  HATENA = 'hatena',
  QIITA = 'qiita',
  ZENN = 'zenn'
}

export enum CompanySize {
  STARTUP = 'startup',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  ENTERPRISE = 'enterprise'
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
}

export interface TrendsResponse {
  trends: Trend[];
}

export interface CompaniesResponse {
  companies: Company[];
}

export interface CompanyMetricsResponse {
  company: Company;
  metrics: DailyMetrics[];
  summary: {
    avgRank: number;
    totalTrends: number;
    peakRank: number;
    peakDate: string;
  };
}

export interface DashboardResponse {
  topCompanies: CompanyInfluence[];
  recentTrends: Trend[];
  stats: {
    totalCompanies: number;
    totalTrends: number;
    lastUpdated: string;
  };
}