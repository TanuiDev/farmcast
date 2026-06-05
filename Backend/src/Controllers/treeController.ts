import { Request, Response } from "express";
// Use the built-in WHATWG FormData / Blob in Node (no external form-data package)

const BASE_URL = "https://api.weather-ai.co";

export const analyzeTrees = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Image file is required" });
      return;
    }

    if (!process.env.WEATHERAI_API_KEY) {
      console.error('Missing WEATHERAI_API_KEY in environment');
      res.status(500).json({ error: 'Server misconfiguration: WEATHERAI_API_KEY not set' });
      return;
    }

    const { farmerId, county, landAcres, location, notes } = req.body;

    console.log("File:", req.file.originalname, req.file.mimetype, req.file.size);
    console.log("Body:", req.body);

    // Build multipart using global WHATWG FormData and Blob so fetch/undici can handle headers
    const form = new (globalThis as any).FormData();
    const blob = new (globalThis as any).Blob([req.file.buffer], { type: req.file.mimetype });
    form.append("image", blob, req.file.originalname);

    if (farmerId)  form.append("farmerId", String(farmerId));
    if (county)    form.append("county", county);
    if (landAcres) {
      const acresNum = Number(landAcres);
      if (!Number.isNaN(acresNum)) form.append("landAcres", String(acresNum));
      else form.append("landAcres", String(landAcres));
    }
    if (location)  form.append("location", location);
    if (notes)     form.append("notes", notes);

    const response = await fetch(`${BASE_URL}/v1/trees/analyze`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WEATHERAI_API_KEY}`,
        // Do not manually set Content-Type/Content-Length — undici will set correct headers
      },
      body: form as unknown as BodyInit,
    });

    // Safely parse response body (fall back to text if not JSON)
    let data: any;
    const respText = await response.text();
    try {
      data = respText ? JSON.parse(respText) : null;
    } catch (err) {
      data = respText;
    }

    console.log("WeatherAI response status:", response.status);
    console.log("WeatherAI response (raw):", respText);

    if (!response.ok) {
      // Log provider details but only return a generic message to client
      console.error('WeatherAI error details:', data);
      const detailsToClient = typeof data === 'string' ? data : undefined;
      res.status(response.status).json({ error: "WeatherAI error", details: detailsToClient });
      return;
    }

    // Remove any upstream internal error fields before returning to client
    if (data && typeof data === 'object') {
      if ('gemini_error' in data) {
        console.warn('WeatherAI gemini_error:', data.gemini_error);
        delete data.gemini_error;
      }
    }

    res.json(data);
  } catch (error) {
    console.error("Tree analysis error:", error);
    res.status(500).json({ error: "Internal server error", details: String(error) });
  }
};

export const getTreeHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 20, cursor } = req.query;
    let url = `${BASE_URL}/v1/trees/history?limit=${limit}`;
    if (cursor) url += `&cursor=${cursor}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.WEATHERAI_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: "WeatherAI error", details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: String(error) });
  }
};

export const getTreeQuota = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/trees/quota`, {
      headers: {
        Authorization: `Bearer ${process.env.WEATHERAI_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: "WeatherAI error", details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: String(error) });
  }
};