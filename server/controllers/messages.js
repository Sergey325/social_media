import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

// READ
export const getAllMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "firstName lastName pictureUrl email")
            .populate("chat");
        messages.map(message => message.createdAt.toISOString())
        res.status(200).json(messages)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}


// CREATE
export const sendMessage = async (req, res) => {
    try {
        const { content, chatId, senderId } = req.body;

        if (!content || !chatId) {
            return res.status(400).json({ message: "Invalid data passed into request"});
        }

        const newMessage = {
            sender: senderId,
            content: content,
            chat: chatId,
        };

        var message = await Message.create(newMessage);

        message = await message.populate("sender", "firstName lastName pictureUrl");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "firstName lastName pictureUrl email",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        return res.status(201).json(message);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}




