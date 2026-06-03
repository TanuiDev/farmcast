import { Request, Response } from 'express';
import FormData from 'form-data';

const BASE_URL = 'https://api.weather-ai.co';

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.WEATHERAI_API_KEY}`,
});

export const analyzeTrees = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Image file is required' });
      return;
    }

    const { farmerId, county, landAcres, location, notes } = req.body;

    const form = new FormData();
    form.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    if (farmerId)  form.append('farmerId', farmerId);
    if (county)    form.append('county', county);
    if (landAcres) form.append('landAcres', landAcres);
    if (location)  form.append('location', location);
    if (notes)     form.append('notes', notes);

    const response = await fetch(`${BASE_URL}/v1/trees/analyze`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        ...form.getHeaders(),
      },
      body: form as any,
    });

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

export const getTreeHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 20, cursor } = req.query;
    let url = `${BASE_URL}/v1/trees/history?limit=${limit}`;
    if (cursor) url += `&cursor=${cursor}`;

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

export const getTreeQuota = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/trees/quota`, {
      headers: getHeaders(),
    });

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