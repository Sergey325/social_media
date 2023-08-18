import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import path from "path"
import {fileURLToPath} from "url"
import authRoutes from "./routes/auth.js"

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors())

// ROUTES
app.use("/auth", authRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch( error => console.log(`${error} did not connect`) )