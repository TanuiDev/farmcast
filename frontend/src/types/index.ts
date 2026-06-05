// ─── Weather Types ────────────────────────────────────────
export interface CurrentConditions {
  time: string;
  temperature: number;
  wind_speed: number;
  wind_direction: number;
  condition_code: string;
  icon: string;
  humidity?: number;
  feels_like?: number;
  uv_index?: number;
  precipitation_probability?: number;
}

export interface DailyForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  precipitation_sum: number;
  precipitation_probability: number;
  wind_max: number;
  condition_code: string;
  icon: string;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  precipitation_probability: number;
  wind_speed: number;
  condition_code: string;
  icon: string;
  humidity: number;
  feels_like: number;
  uv_index: number;
}

export interface WeatherResponse {
  location: {
    lat: number;
    lon: number;
    timezone?: string;
    country?: string;
    city?: string;
  };
  current: CurrentConditions;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  ai_summary?: string;
}

// ─── Tree Analysis Types ──────────────────────────────────
export interface TreeHealth {
  healthy: number;
  needs_care: number;
  needs_replacement: number;
}

export interface TreeAnalysisResponse {
  analysis_id: string;
  timestamp: string;
  farmer_id?: string;
  county?: string;
  location?: string;
  land_acres?: number;
  total_tree_count: number;
  tree_density_per_acre?: number;
  confidence_score: number;
  canopy_coverage_pct: number;
  tree_health: TreeHealth;
  low_confidence: boolean;
  tree_species_guess?: string;
  observations: string[];
  recommendations: string[];
  original_image_url: string;
  overlay_image_url: string;
}

export interface TreeHistoryItem {
  analysis_id: string;
  timestamp: string;
  farmer_id?: string;
  county?: string;
  total_tree_count: number;
  confidence_score: number;
  canopy_coverage_pct: number;
}

export interface TreeHistoryResponse {
  analyses: TreeHistoryItem[];
  next_cursor?: string;
}

export interface TreeQuotaResponse {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
  resets_at: string;
}

// ─── Geocode Types ────────────────────────────────────────
export interface GeocodeResult {
  lat: number;
  lon: number;
  city: string;
  country: string;
  formatted: string;
}

// ─── SMS Types ────────────────────────────────────────────
export interface SMSRequest {
  phone: string;
  message: string;
}

export interface SMSResponse {
  status: string;
  messageId?: string;
  message: string;
}