import express from "express";
import {
    getAllMessages,
    sendMessage,
} from "../controllers/messages.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/:chatId", verifiedToken, getAllMessages)

// CREATE
router.post("/", verifiedToken, sendMessage)


export default router;