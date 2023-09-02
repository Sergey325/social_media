import express from "express";
import {
    commentPost,
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js"
import { verifiedToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifiedToken, getFeedPosts)
router.get("/:userId/posts", verifiedToken, getUserPosts)

// Update
router.patch("/:id/like", verifiedToken, likePost)
router.patch("/:id/comment", verifiedToken, commentPost)

// Create
router.post("/", verifiedToken, createPost)
export default router;

