import express from "express";
import HomePage from "../app/controller/HomePageController.js";

const router = express.Router();

router.post("/login", HomePage.login);
router.post("/register", HomePage.register);

export default router;
