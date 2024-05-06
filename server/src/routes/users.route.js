import express from "express";
import { usertest, updateUser } from "../controllers/users.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/test").get(usertest);
router.put("/update/:userId", verifyUser, updateUser);
export default router;
