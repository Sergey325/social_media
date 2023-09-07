import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            pictureUrl,
            location,
            occupation,
        } = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            pictureUrl,
            friends: [],
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}


// LOGGING IN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email }).lean().populate("friends", "-password")
        if(!user){
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        delete user.password

        // const formattedFriends = await Promise.all(
        //     user.friends.map(async (id) => {
        //         const friend = await User.findById(id).lean();
        //         return friend;
        //     })
        // );

        // const formattedUser = { ...user, friends: formattedFriends };
        res.status(200).json({ token, user })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}