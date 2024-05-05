import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signup = wrapAsync(async (req, res, next) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    if(!email || !username || !password || username === " " || email === " " || password === " "){
       next(errorHandler(400, "All fields are required"));
    }
    const existedUser = await User.findOne({ email });
    if(existedUser){
        next(errorHandler(400, "User already exists"));
    }
    const hashedpass = bcryptjs.hashSync(password, 10);
   const user = await User.create({
        email,
        username,
        password:hashedpass
    });

    if(!user){
        next(errorHandler(500, "Error while creating user"));
    }
    
    return res.status(200).json({
        message: "User created successfully",
        user: user
    })

});




export { signup }