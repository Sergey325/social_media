import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        res.status(200).json(user)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        res.status(200).json(user.friends)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { userId, friendId} = req.params
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friend)) {
            user.friends.filter( id => id !== friendId)
            friend.friends.filter( id => id !== userId)
        } else {
            user.friends.push(friend)
            friend.friends.push(user)
        }
        await user.save()
        await friend.save()

        res.status(200).json(user.friends)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}