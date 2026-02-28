import member from "./member.js";
import business from "./business.js";
import homepage from "./homepage.js";
import express from "express";

export default function route(app: express.Express) {
  app.use("/api/business", business);
  app.use("/api/member", member);
  app.use("/api", homepage);
}
