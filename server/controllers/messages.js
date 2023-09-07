import Message from "../models/Message.js";
import User from "../models/User.js";

// READ
export const getAllMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "firstName lastName pictureUrl email")
            .populate("chat");
        res.status(200).json(messages)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}


// READ or CREATE
export const sendMessage = async (req, res) => {


    try {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            return res.status(400).json({ message: "Invalid data passed into request"});
        }

        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        var message = await Message.create(newMessage);

        message = await message.populate("sender", "firstName lastName pic").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await User.populate(message, {
            path: "chat.users",
            select: "firstName lastName pictureUrl email",
        });

        return res.status(201).json(message);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}




