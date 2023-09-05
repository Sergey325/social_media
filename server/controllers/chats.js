import Chat from "../models/Chat.js";

// READ
export const getUsersChats = async (req, res) => {
    try {
        const { userId } = req.params
        const chats = await Chat.find({ participants: userId }).populate('participants', '-password');
        res.status(200).json(chats)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}


// READ or CREATE
export const getOrCreateChat = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;

        const existingChat = await Chat.findOne({
            participants: { $all: [userId1, userId2] }
        }).populate('participants', '-password');

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = new Chat({
            participants: [userId1, userId2]
        });

        await newChat.save();

        return res.status(201).json(newChat);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}




