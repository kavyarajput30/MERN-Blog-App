import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIresponce.js";
import Post from "../models/Post.model.js";

const createPost = wrapAsync(async (req, res, next) => {
  // console.log(req.body);

  if (req.user.isAdmin === true) {
    console.log(req.user);
  }else{
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  console.log(req.user);
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

const getAllPosts = wrapAsync(async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const posts = await Post.find({
    ...(req.query.author && { author: req.query.author }),
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.postId && { _id: req.query.postId }),
    ...(req.query.searchTerm && {
      $or: [
        {
          title: {
            $regex: req.query.searchTerm,
            $options: "i",
          },
        },
        {
          content: {
            $regex: req.query.searchTerm,
            $options: "i",
          },
        },
      ],
    }),
  })
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  const totalPosts = await Post.countDocuments();

  const timeNow = new Date();
  const oneMonthAgo = new Date(
    timeNow.getFullYear(),
    timeNow.getMonth() - 1,
    timeNow.getDate()
  );

  const lastMonthsPosts = await Post.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  return res.status(200).json(
    new APIResponce(
      200,
      "Data Fetched Successfully",
      {
        posts,
        totalPosts,
        lastMonthsPosts,
      },
      true
    )
  );
});

const deletePost = wrapAsync(async (req, res, next) => {
  const { userId, postId } = req.params;
  const currentuserid = req.user.id;
console.log(req.user);
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "You are not Admin"));
  }
  if (userId !== currentuserid) {
    return next(errorHandler(400, "You are not authorized to delete post"));
  }


   const deletedPost = await Post.findByIdAndDelete(postId);
   if(!deletedPost){
    return next(errorHandler(400, "Post deletion Failed"));
   }

   return res.status(200).json(new APIResponce(200, "Post Deleted", deletedPost, true));




});
export { createPost, getAllPosts, deletePost };
