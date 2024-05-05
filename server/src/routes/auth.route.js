import express from "express";
import { signup,signin } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/sign-in").post(signin);

export default router;
