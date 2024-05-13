import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default:0
    }

}, {timestamps: true});

const Comment = model("Comment", commentSchema);
export default Comment;