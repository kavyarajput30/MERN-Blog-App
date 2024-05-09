import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/create").post(verifyUser, createPost);
export default router;
