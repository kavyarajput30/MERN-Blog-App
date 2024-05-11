import express from "express";
import { createPost ,getAllPosts,deletePost} from "../controllers/post.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/create").post(verifyUser, createPost);
router.route("/get-posts").get(getAllPosts);
router.route("/delete-post/:postId/:userId").delete(verifyUser,deletePost );
export default router;
