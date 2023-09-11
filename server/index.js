import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import chatRoutes from "./routes/chats.js"
import messageRoutes from "./routes/messages.js"
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts, messages } from "./data/index.js";
import Message from "./models/Message.js";

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
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/chats", chatRoutes)
app.use("/messages", messageRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    const server = http.createServer(app);
    const io = new Server(
        server,
        {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
            // credentials: true,
        }})

    // Добавьте обработчики WebSocket событий здесь
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("setup", (userId) => {
            socket.join(userId);
            socket.emit("connected");
        });

        socket.on("join chat", (roomId) => {
            socket.join(roomId);
            console.log("User Joined Room: " + roomId);
        });
        socket.on("new message", (newMessageRecieved) => {
            var chat = newMessageRecieved.chat;

            if (!chat.participants) return console.log("chat.users not defined");

            chat.participants.forEach((user) => {
                if (user._id == newMessageRecieved.sender._id) return;
                console.log(newMessageRecieved, "receiving")
                socket.in(chat._id).emit("message recieved", newMessageRecieved);
            });
        });
    });

    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
    // Message.insertMany(messages);
})
.catch((error) => console.log(`${error} did not connect`));