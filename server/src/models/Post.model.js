import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const postSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image:{
    type:String,
    default:"https://th.bing.com/th/id/OIP.BHMBfuJwCETgpIV9NnjfBwHaGX?rs=1&pid=ImgDetMain",

  },
  category:{
    type:String,
    default:'uncategorized'
  },
  slug:{
    type:String,
    required:true,
    unique:true
  }
  
},{timestamps:true});


const Post = model("Post", postSchema);
export default Post;