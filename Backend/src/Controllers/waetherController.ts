import { Request, Response } from 'express';

const BASE_URL = 'https://api.weather-ai.co';

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.WEATHERAI_API_KEY}`,
  'Content-Type': 'application/json',
});

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon, lang = 'en', days = 7, ai = 'true' } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ error: 'lat and lon are required' });
      return;
    }

    const url = `${BASE_URL}/v1/weather?lat=${lat}&lon=${lon}&lang=${lang}&days=${days}&ai=${ai}&units=metric`;
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: 'WeatherAI error', details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};

export const getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon, lang = 'en' } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ error: 'lat and lon are required' });
      return;
    }

    const url = `${BASE_URL}/v1/current?lat=${lat}&lon=${lon}&lang=${lang}&units=metric`;
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: 'WeatherAI error', details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};

export const getDailyForecast = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon, days = 7 } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ error: 'lat and lon are required' });
      return;
    }

    const url = `${BASE_URL}/v1/daily?lat=${lat}&lon=${lon}&days=${days}&units=metric`;
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: 'WeatherAI error', details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};

export const getHourlyForecast = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ error: 'lat and lon are required' });
      return;
    }

    const url = `${BASE_URL}/v1/hourly?lat=${lat}&lon=${lon}&units=metric`;
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: 'WeatherAI error', details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};