import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIresponce.js";
import Post from "../models/Post.model.js";

const createPost = wrapAsync(async (req, res, next) => {
  // console.log(req.body);

  // if (req.user.isAdmin === true) {
  //   console.log(req.user);
  // }else{
  //   return next(errorHandler(403, "You are not allowed to create a post"));
  // }
  // console.log(req.user);
  const { title, content, image, category } = req.body;
  if (!title || !content) {
    return next(errorHandler(400, "All Fields are required"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-z0-9-]/g, "-");
  const newPost = await Post.create({
    title,
    content,
    image,
    category,
    slug,
    author: req.user.id,
  });

  if (!newPost) {
    return next(errorHandler(500, "Post Creation Failed"));
  }
  // console.log("Post Created",newPost );
  return res
    .status(200)
    .json(new APIResponce(200, "Post Created Successfully", newPost, true));
});

export { createPost };
