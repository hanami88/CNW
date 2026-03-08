import express from "express";
import Member from "../app/controller/MemberController.js";
const router = express.Router();

router.post("/createTour", Member.createTour);
router.post("/register-tour", Member.registerTour);

export default router;
