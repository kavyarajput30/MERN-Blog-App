import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
const signup = wrapAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    username === " " ||
    email === " " ||
    password === " "
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    next(errorHandler(400, "User already exists"));
  }
  const hashedpass = bcryptjs.hashSync(password, 10);
  const user = await User.create({
    email,
    username,
    password: hashedpass,
  });

  if (!user) {
    next(errorHandler(500, "Error while creating user"));
  }

  return res.status(200).json({
    message: "User created successfully",
    user: user,
  });
});

const signin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === " " || password === " ") {
    next(errorHandler(400, "All fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  const matchPass = bcryptjs.compareSync(password, user.password);
  console.log('match pass',matchPass);
  if(!matchPass) {
    return next(errorHandler(400, "Invalid credentials"));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  console.log("token", token);
  res.status(200)
  .cookie("accesstoken", token, {
    httpOnly: true,
  })
  .json({
    message: "User signed in successfully",
    user
  })
});

export { signup, signin };
