import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
const __dirname = path.resolve();
app.use(
  cors({
    origin: "https://kavya-blog-app.netlify.app",
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// import user routes
import UserRouter from "./routes/users.route.js";
import AuthRouter from "./routes/auth.route.js";
import PostRouter from "./routes/post.route.js";
import CommentRouter from "./routes/comment.route.js";
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/post", PostRouter);
app.use("/api/v1/comment", CommentRouter);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

export default app;
