import express, { urlencoded } from "express";
import cors from "cors";


const app = express();

app.use(cors(

));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// import routes
import UserRouter from "./routes/users.route.js";
import Authrouter from "./routes/auth.route.js";

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", Authrouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    })
})



export default app;