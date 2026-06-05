import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./Routes/weather";
import treeRoutes from "./Routes/trees";
import geocodeRoutes from "./Routes/geocode";
import smsRoutes from "./Routes/sms";
import { errorHandler } from "../src/middleware/errorHandles";

dotenv.config();

const initializeApp = () => {
  const app = express();

  app.use(
    cors({
      origin: "https://farmcast-vert.vercel.app/",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    }),
  );

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/weather", weatherRoutes);
  app.use("/api/trees", treeRoutes);
  app.use("/api/geocode", geocodeRoutes);
  app.use("/api/sms", smsRoutes);

  app.use(errorHandler);

  return app;
};

const app = initializeApp();

export default app;