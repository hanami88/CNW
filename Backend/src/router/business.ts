import express from "express";
import Staff from "../app/controller/StaffController.js";

const router = express.Router();

router.put("/approve", Staff.approve);
router.put("/reject", Staff.reject);

export default router;
