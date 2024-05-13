import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { createNewComment,getAllCommensts } from "../controllers/comment.controller.js";

const router = express.Router();



router.route("/new-comment").post(verifyUser, createNewComment);
router.route("/get-comments/:postId").get(verifyUser, getAllCommensts);
export default router;
