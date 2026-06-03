import express from "express";
import cors from "cors";

const initializeApp = () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    }),
  );

  app.use(express.json());

  

  return app;
};

const app = initializeApp();

export default app;