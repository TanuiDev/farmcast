import { Request, Response } from 'express';

export const geocodeLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).json({ error: 'Query parameter q is required' });
      return;
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(String(q))}&key=${process.env.OPENCAGE_API_KEY}&limit=1&countrycode=ke`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    const result = data.results[0];

    res.json({
      lat: result.geometry.lat,
      lon: result.geometry.lng,
      city: result.components.city
        || result.components.town
        || result.components.county
        || q,
      country: result.components.country,
      formatted: result.formatted,
    });
  } catch (error) {
    res.status(500).json({ error: 'Geocoding failed', details: String(error) });
  }
};