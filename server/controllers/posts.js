import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, pictureUrl } = req.body
        const user = await User.findById(userId)

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            userPictureUrl: user.pictureUrl,
            description: description,
            pictureUrl,
            likes: {},
            comments: []
        })
        await newPost.save()

        // returning all posts
        const post = await Post.find()
        res.status(201).json(post)
    } catch (e) {
        res.status(409).json({ message: e.message})
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean()
        const safePosts = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
        }));
        res.status(201).json(safePosts)
    } catch (e) {
        res.status(404).json({ message: e.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({userId: userId})
        res.status(201).json(post)
    } catch (e) {
        res.status(404).json({ message: e.message})
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(201).json(updatedPost)
    } catch (e) {
        res.status(404).json({ message: e.message})
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId, comment } = req.body
        const user = await User.findById(userId)
        const post = await Post.findById(id)

        const newComment = {
            userId: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            text: comment,
            userPictureUrl: user.pictureUrl,
            date: (new Date()).toISOString()
        }

        const updatedComments = [...post.comments, newComment];

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: updatedComments},
            { new: true}
        )

        res.status(201).json(updatedPost)
    } catch (e) {
        res.status(404).json({ message: e.message})
    }
}

