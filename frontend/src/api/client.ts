const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ─── Geocode ──────────────────────────────────────────────
export const geocodeLocation = async (q: string) => {
  const res = await fetch(`${API_URL}/api/geocode?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Location not found");
  return res.json();
};

// ─── Weather ──────────────────────────────────────────────
export const getWeather = async (
  lat: number,
  lon: number,
  lang: string = "en",
  days: number = 7
) => {
  const res = await fetch(
    `${API_URL}/api/weather?lat=${lat}&lon=${lon}&lang=${lang}&days=${days}&ai=true`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};

export const getCurrentWeather = async (
  lat: number,
  lon: number,
  lang: string = "en"
) => {
  const res = await fetch(
    `${API_URL}/api/weather/current?lat=${lat}&lon=${lon}&lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
};

export const getDailyForecast = async (lat: number, lon: number) => {
  const res = await fetch(
    `${API_URL}/api/weather/daily?lat=${lat}&lon=${lon}`
  );
  if (!res.ok) throw new Error("Failed to fetch daily forecast");
  return res.json();
};

export const getHourlyForecast = async (lat: number, lon: number) => {
  const res = await fetch(
    `${API_URL}/api/weather/hourly?lat=${lat}&lon=${lon}`
  );
  if (!res.ok) throw new Error("Failed to fetch hourly forecast");
  return res.json();
};

// ─── Tree Analysis ────────────────────────────────────────
export const analyzeTrees = async (formData: FormData) => {
  const res = await fetch(`${API_URL}/api/trees/analyze`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to analyze trees");
  return res.json();
};

export const getTreeHistory = async () => {
  const res = await fetch(`${API_URL}/api/trees/history`);
  if (!res.ok) throw new Error("Failed to fetch tree history");
  return res.json();
};

export const getTreeQuota = async () => {
  const res = await fetch(`${API_URL}/api/trees/quota`);
  if (!res.ok) throw new Error("Failed to fetch quota");
  return res.json();
};

// ─── SMS ──────────────────────────────────────────────────
export const sendSMS = async (phone: string, message: string) => {
  const res = await fetch(`${API_URL}/api/sms/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message }),
  });
  if (!res.ok) throw new Error("Failed to send SMS");
  return res.json();
};