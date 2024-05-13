import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { createNewComment } from "../controllers/comment.controller.js";

const router = express.Router();



router.route("/new-comment").post(verifyUser, createNewComment);

export default router;
