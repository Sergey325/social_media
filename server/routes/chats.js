import express from "express";
import {
    getOrCreateChat,
    getUsersChats,
} from "../controllers/chats.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/:userId", verifiedToken, getUsersChats)

// READ or CREATE
router.post("/", verifiedToken, getOrCreateChat)


export default router;