import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { createNewComment,getAllCommensts,likeComment,editComment } from "../controllers/comment.controller.js";

const router = express.Router();



router.route("/new-comment").post(verifyUser, createNewComment);
router.route("/get-comments/:postId").get(verifyUser, getAllCommensts);
router.route("/like-comment/:commentId").patch(verifyUser, likeComment);
router.route("/edit-comment/:commentId").patch(verifyUser, editComment);
export default router;
