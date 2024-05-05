import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIresponce.js";

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

  return res
    .status(200)
    .json(new APIResponce(200, "User created successfully", user, true));
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
  console.log("match pass", matchPass);
  if (!matchPass) {
    return next(errorHandler(400, "Invalid credentials"));
  }

  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET
  );
  // cookies options
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new APIResponce(200, "User created successfully", user, true));
});

const googleSignIn = wrapAsync(async (req, res, next) => {
  const { name, email, photourl } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    // cookies options
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new APIResponce(200, "User Exists", user, true));
  }

  const generatedPassword = "123456789" + name;
  const hashedpass = bcryptjs.hashSync(generatedPassword, 10);
  const newUser = await User.create({
    username:
    name.toLowerCase().split(" ").join("") +
      Math.random().toString(9).slice(-4),
    email,
    password: hashedpass,
    photourl,
  });

  if (!newUser) {
    next(errorHandler(500, "Error while creating user"));
  }

  const accessToken = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new APIResponce(200, "User created successfully", newUser, true));
});

export { signup, signin, googleSignIn };
