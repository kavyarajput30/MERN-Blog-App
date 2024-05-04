import dotenv from 'dotenv';
import app from "./app.js";
import ConnectToDB from "./db/index.js";
dotenv.config({
    path: './.env'
})
const port = process.env.PORT || 8080


ConnectToDB().then(
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
).catch(
    (err) => {
        console.log("MONGO CONNECTION ERROR",err)
    }
)
