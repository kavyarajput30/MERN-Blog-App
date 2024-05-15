import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIresponce.js";
import Post from "../models/Post.model.js";
import Comment from "../models/comment.model.js";

const createNewComment = wrapAsync(async (req, res, next) => {
  const { content } = req.body;
  const { userId, postId } = req.body;
  if (!content) {
    return next(errorHandler(400, "Content is required"));
  }

  if (!userId) {
    return next(errorHandler(400, "userId is required"));
  }
  if (!postId) {
    return next(errorHandler(400, "postId is required"));
  }
  if (userId !== req.user.id) {
    return next(errorHandler(400, "Please Login with your account"));
  }

  const newComment = await Comment.create({
    content,
    userId,
    postId,
  });

  if (!newComment) {
    return next(errorHandler(400, "Comment not created"));
  }
  return res
    .status(200)
    .json(
      new APIResponce(200, "Comment created successfully", newComment, true)
    );
});

const getAllCommensts = wrapAsync(async (req, res, next) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).populate("userId").sort({
    createdAt: -1,
  });

  if (!comments) {
    return next(errorHandler(400, "Comments not found"));
  }

  return res
    .status(200)
    .json(
      new APIResponce(200, "Comments fetched successfully", comments, true)
    );
});

const likeComment = wrapAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const { userId } = req.body;
  // console.log(userId);
  const currentuserid = req.user.id;
  // console.log(currentuserid);
  if (userId !== currentuserid) {
    return next(errorHandler(400, "Like with your account"));
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(errorHandler(400, "Comment not found"));
  }

  if (!comment.likes.includes(userId)) {
    comment.likes.push(userId);
  } else if (comment.likes.includes(userId)) {
    comment.likes = comment.likes.filter((id) => id !== userId);
  }

  comment.numberOfLikes = comment.likes.length;
  const updatedComment = await comment.save();
  return res
    .status(200)
    .json(new APIResponce(200, "Comment updated", updatedComment, true));
});

const editComment = wrapAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const currentuserid = req.user.id;
  const { content } = req.body;
  console.log(req.body);
  if (!content) {
    return next(errorHandler(400, "Content is required"));
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(errorHandler(400, "Comment not found"));
  }
  if (comment.userId !== currentuserid && !req.user.isAdmin) {
    return next(errorHandler(400, "You can only edit your comment"));
  }

  comment.content = content;
  const updatedComment = await comment.save();

  return res
    .status(200)
    .json(new APIResponce(200, "Comment updated", updatedComment, true));
});

const deleteComment = wrapAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const currentuserid = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(errorHandler(400, "Comment not found"));
  }
  if(comment.userId !== currentuserid && !req.user.isAdmin){
    return next(errorHandler(400, "You can only delete your comment"));
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  return res.status(200).json(new APIResponce(200, "Comment deleted", deletedComment, true));
})
export { createNewComment, getAllCommensts, likeComment, editComment,deleteComment };
