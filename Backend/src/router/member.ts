import express from "express";
import Member from "../app/controller/MemberController.js";
const router = express.Router();

router.post("/createTour", Member.createTour);

export default router;
