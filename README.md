# Farmcast — Weather & Tree Analyzer

This project demonstrates a small app that integrates the WeatherAI developer APIs to provide weather data and a tree analyzer (image-based tree counting & health analysis).

The repo contains two parts:
- `Backend/` — Node + Express API proxy and server-side integrations with WeatherAI, OpenCage (geocoding), and an SMS sandbox.
- `frontend/` — React + Vite single-page app that consumes the backend APIs.

## Features
- Upload an image of a farm to perform tree analysis using WeatherAI's `trees.analyze` endpoint.
- Fetch current, hourly and daily weather (with optional AI summary) via WeatherAI.
- Geocoding (OpenCage) for user-entered locations.
- Simple SMS sending (sandbox) integration.

## Tech stack
- Backend: Node + Express + TypeScript
- Frontend: React + Vite + TypeScript
- File uploads: `multer` (memoryStorage) on the backend

## Prerequisites
- Node.js (18+ recommended; project was tested locally with Node 26)
- pnpm (or npm/yarn — repo uses `pnpm` by default)

## Environment variables

Create a `.env` file at the project root or in the `Backend/` folder (the server uses dotenv). The backend expects the following variables:

- `WEATHERAI_API_KEY` (required) — API key for WeatherAI (used by weather and tree analysis endpoints).
- `OPENCAGE_API_KEY` (optional) — API key for OpenCage geocoding (used by `/api/geocode`).
- `AT_API_KEY` (optional) — Africa's Talking API key for SMS sending (sandbox mode supported).
- `AT_USERNAME` (optional, default `sandbox`) — Africa's Talking username.
- `PORT` (optional) — Server port (defaults to `3000`).

Frontend environment:
- `VITE_API_URL` — Base URL for the backend API (defaults to `http://localhost:3000`). Create a `.env` file in the `frontend/` folder or set this variable before running the frontend.

Notes:
- The WeatherAI provider may attempt to call additional services (e.g., Gemini) in their functions environment. If you see responses containing `gemini_error`, that indicates a provider-side configuration (e.g., missing `GEMINI_API_KEY`) and is unrelated to this repo's local env.

## Install & Run (development)

1. Install dependencies

```bash
# from repo root
cd Backend
pnpm install

cd ../frontend
pnpm install
```

2. Start the backend and frontend (in separate terminals)

```bash
# Terminal 1 — backend
cd Backend
pnpm dev

# Terminal 2 — frontend
cd frontend
pnpm dev
```

Open the frontend at `http://localhost:5173` (Vite default). The backend listens on port `3000` by default.

## API: Important endpoints

Backend proxies WeatherAI and exposes simple endpoints used by the frontend.

- POST `/api/trees/analyze` — multipart/form-data upload; form field `image` required.
  - Optional fields: `farmerId`, `county`, `landAcres`, `location`, `notes`.
  - Example curl:
    ```bash
    curl -X POST "http://localhost:3000/api/trees/analyze" \
      -F "image=@/path/to/image.jpg" \
      -F "farmerId=F001" \
      -F "county=Kericho" \
      -F "landAcres=2"
    ```

- GET `/api/trees/history?limit=20&cursor=...` — fetch recent analyses (paginated)
- GET `/api/trees/quota` — fetch quota/usage information from provider

- GET `/api/weather?lat={lat}&lon={lon}&lang=en&days=7&ai=true` — full weather response (uses WeatherAI)
- GET `/api/weather/current?lat={lat}&lon={lon}` — current conditions
- GET `/api/weather/daily?lat={lat}&lon={lon}` — daily forecast
- GET `/api/weather/hourly?lat={lat}&lon={lon}` — hourly forecast

- GET `/api/geocode?q={place}` — geocode a place name (requires `OPENCAGE_API_KEY`)

- POST `/api/sms/send` — send an SMS (sandbox mode by default) — requires `AT_API_KEY` if used

## Frontend

The frontend expects the backend base URL in `VITE_API_URL`. If you run both services locally with defaults, no changes are necessary.

The `TreeAnalyzer` component allows drag/drop or file selection, collects simple metadata, and posts the image to `/api/trees/analyze`.

## Notes, limitations & recommendations

- The backend currently accepts uploads in memory (`multer.memoryStorage()`) and limits uploads to 5 MB — this is convenient for development but not ideal for large images in production. Consider switching to streaming or temporary disk storage for large files.
- The WeatherAI provider response can include provider-specific debug fields (e.g., `gemini_error`). The backend strips or logs those to avoid leaking provider internals to end users.
- If you get `Could not parse multipart body` errors from the provider, ensure `WEATHERAI_API_KEY` is correct and that the provider accepts multipart uploads. The code uses Node's WHATWG `FormData` and `Blob` to let `undici` compute multipart boundaries and headers.

## Deployment

You can deploy the frontend (Vite) and backend separately. For quick deployment:

- Backend: Render / Railway / Fly.io — provide `WEATHERAI_API_KEY`, `OPENCAGE_API_KEY`, and other env vars via the platform dashboard.
- Frontend: Netlify / Vercel – set `VITE_API_URL` to your backend's URL.

Notes on the submission requirement:
- This project was built to satisfy an integration assignment that requires a public GitHub repository with a README and a live deployment link. To publish a live link, deploy the backend and frontend to the hosting provider of your choice and set the required environment variables on that platform.

## Example troubleshooting

- If uploads fail with a 400 on `/api/trees/analyze`:
  - Check browser network tab: ensure the request contains the `image` field in Form Data.
  - Check backend logs for Multer errors (file too large or wrong mimetype).
  - Verify `WEATHERAI_API_KEY` is present in the backend environment.

## Contributing

Feel free to open issues or PRs. Suggestions:
- Add persistent storage for analyses (sqlite or MongoDB).
- Improve image validation (minimum resolution, aspect ratio) client-side.
- Add unit / integration tests for API routes.

---
If you'd like, I can also add a short `DEPLOY.md` documenting steps to publish on Render or Railway and include the exact environment settings required.
