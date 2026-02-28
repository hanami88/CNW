import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  PORT: getEnv("PORT"),
  PORT_DB: Number(getEnv("PORT_DB")),
  BACKEND_URL: getEnv("BACKEND_URL"),
  PASSWORD_DB: getEnv("PASSWORD_DB"),
  DATABASE: getEnv("DATABASE"),
};
