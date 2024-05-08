import express from "express";
import { usertest, updateUser,deleteUser } from "../controllers/users.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/test").get(usertest);
router.put("/update/:userId", verifyUser, updateUser);
router.route("/delete/:userId").delete(verifyUser,deleteUser);
export default router;
