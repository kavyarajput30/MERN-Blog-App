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

app.use("/api/v1/user", UserRouter);



export default app;