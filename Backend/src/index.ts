import express from "express";
import { testConnection } from "./app/db/connectDB.js";
import { ENV } from "../env.js";
import router from "./router/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

router(app);

async function startServer() {
  await testConnection();
  app.listen(3000, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

startServer();
