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
        const user = await User.findOne({ email: email })

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, pictureUrl }) => {
                return { _id, firstName, lastName, occupation, location, pictureUrl };
            })

        const formattedUser = { ...user._doc, friends: formattedFriends, _id: user._id.toString()  };

        if(!user){
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user: formattedUser })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}