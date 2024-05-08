import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import { errorHandler } from "../utils/error.js";
import APIResponce from "../utils/APIresponce.js";
import bcryptjs from "bcryptjs";
const usertest = (req, res) => {
  res.send("test route is working");
};
const updateUser = wrapAsync(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
   return next(errorHandler(400, "Login first"));
  }
  if (userId !== req.user.id) {
    next(errorHandler(403, "You can only update your account"));
  }
  const { username, email, password, photourl } = req.body;
  if(password){
    if(password.length < 6){
     return next(errorHandler(400, "Password must be at least 6 characters"));
    }
  }
  const hashedpass = bcryptjs.hashSync(password, 10);

  if(username){
    if(username.length < 7 || username.length > 20){
      return next(errorHandler(400, "Username must be between 7 and 20 characters"));
    }
    if(username.includes(" ")){
     return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if(username !== username.toLowerCase()){
     return next(errorHandler(400, "Username must be lowercase"));
    }
    if(!username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, "Username must only contain letters and numbers"));
    }
  }

  
  const updateduser = await User.findByIdAndUpdate(userId, {
    username,
    email,
    password: hashedpass,
    photourl,
  }, { new: true });

  if(!updateduser){
    return next(errorHandler(404, "User not Updated"));
  }
  res.status(200).json(new APIResponce(200, "User Updated", updateduser, true));
});



const deleteUser = wrapAsync(async (req, res, next) => {
  const { userId } = req.params;
  if(!userId){
    return next(errorHandler(400, "Login first"));
  }
  if(userId !== req.user.id){
    return next(errorHandler(403, "You can only delete your account"));
  }
  const deleteduser = await User.findByIdAndDelete(userId);
  if(!deleteduser){
    return next(errorHandler(404, "User not deleted"));
  }
  res.status(200).json(new APIResponce(200, "User Deleted", deleteduser, true));p
})
export { usertest, updateUser,deleteUser };
