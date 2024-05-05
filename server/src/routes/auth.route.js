import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/sign-up").post(signup);

export default router;
