import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIresponce.js";
import Post from "../models/Post.model.js";
import Comment from "../models/comment.model.js";


const createNewComment = wrapAsync(async (req, res, next) => {
    const {content} = req.body;
    const {userId, postId} = req.body;
    if(!content){
        return next(errorHandler(400, "Content is required"));
    }

    if(!userId){
        return next(errorHandler(400, "userId is required"));
    }
    if(!postId){
        return next(errorHandler(400, "postId is required"));
    }
    if(userId !== req.user.id){
        return next(errorHandler(400, "Please Login with your account"));
    }

    const newComment = await Comment.create({
        content,
        userId,
        postId
    });

    if(!newComment){
        return next(errorHandler(400, "Comment not created"));
    }
    return res.status(200).json(new APIResponce(200, "Comment created successfully", newComment, true));

})


export {
    createNewComment
}