import express from "express";
import { testConnection } from "./app/db/connectDB.js";
import { ENV } from "../env.js";
import router from "./router/index.js";
import cors from "cors";

const app = express();

// ✅ middleware trước
app.use(cors());
app.use(express.json());
// ✅ đăng ký routes sau middleware
router(app);

async function startServer() {
  await testConnection();
  app.listen(3000, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

startServer();
