import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        user.friends = friends.map(
            ({ _id, firstName, lastName, occupation, location, pictureUrl }) => {
                return { _id, firstName, lastName, occupation, location, pictureUrl };
            })

        res.status(200).json(user)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, pictureUrl }) => {
                return { _id, firstName, lastName, occupation, location, pictureUrl };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id: userId, friendId} = req.params
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter( id => id !== friendId)
            friend.friends = friend.friends.filter( id => id !== userId)
        } else {
            user.friends.push(friendId)
            friend.friends.push(userId)
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, pictureUrl }) => {
                return { _id, firstName, lastName, occupation, location, pictureUrl };
            }
        );

        res.status(200).json(formattedFriends)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}