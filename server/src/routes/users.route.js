import express from "express";
import {usertest} from "../controllers/users.controller.js";
const router = express.Router();

router.route("/test").get(usertest);

export default router;
