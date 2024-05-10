import express from "express";
import { createPost ,getAllPosts} from "../controllers/post.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/create").post(verifyUser, createPost);
router.route("/get-posts").get(getAllPosts)
export default router;
