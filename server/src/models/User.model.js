import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photourl: {
      type: String,
      default: "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
    }
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;