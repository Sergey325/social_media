import {useCallback, useEffect, useState} from "react";
import {Chat, Message, User} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import axios from "axios";
import toast from "react-hot-toast";
import io, {Socket} from "socket.io-client";
import {setSelectedChat} from "../state";
import ChatMessages from "./ChatMessages";
import {IoMdSend} from "react-icons/io";

var socket: Socket, selectedChatCompare: Chat;

type Props = {
    chat: Chat
}

const SingleChat = ({chat}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>()
    const [newMessage, setNewMessage] = useState("")
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const { _id } = useSelector((state: RootState) => state.currentUser) as User
    const dispatch = useDispatch()

    const getMessages = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `http://localhost:3001/messages/${chat._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setMessages(response.data)
            setIsLoading(false)
            console.log(chat._id)
            socket.emit("join chat", chat._id);
        } catch (error) {
            toast.error(`Error getting messages: ${error}`)
        }
    }, [chat?._id, token])

    useEffect(() => {
        socket = io("http://localhost:3001")
        socket.emit("setup", _id)
        socket.on("connection", () => setIsSocketConnected(true))
    },[])


    useEffect(() => {
        getMessages()
        selectedChatCompare = chat
    }, [chat])


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                // if (!notification.includes(newMessageRecieved)) {
                //     setNotification([newMessageRecieved, ...notification]);
                //     setFetchAgain(!fetchAgain);
                // }
            } else {
                if (messages){
                    setMessages([...messages, newMessageRecieved]);
                }

            }
        });
    });

    const sendMessage = async () => {
        if(newMessage && messages){
            try {
                setIsLoading(true)
                setNewMessage("")
                const { data } = await axios.post('http://localhost:3001/messages',
                    {
                        content: newMessage,
                        chatId: chat?._id,
                        senderId: _id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }}
                )
                socket.emit("new message", data);
                setMessages([...messages, data]);
                dispatch(setSelectedChat({chat: {...chat as Chat, latestMessage: data as Message}}))
                setIsLoading(false)
            } catch (error) {
                toast.error(`Error sending a message: ${error}`)
            }
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value)
    }

    if (!messages){
        return null
    }

    return (
        <div className="min-h-full flex flex-col flex-grow justify-end">
            <ChatMessages messages={messages}/>
            <div className="">
                <div className="flex items-center justify-end text-sm gap-2 pt-3">
                    <input
                        type="text"
                        disabled={isLoading}
                        onKeyUp={(event) => {
                            if(event.key === "Enter"){
                                event.preventDefault()
                                sendMessage()
                            }
                        }}
                        onChange={handleChange}
                        value={newMessage}
                        className="
                                w-full
                                appearance-none
                                outline-none
                                py-2
                                px-4
                                rounded-3xl
                                bg-neutral-light
                                text-neutral-dark
                                transition
                                duration-300
                            "
                        placeholder="Write a message..."
                    />
                    <IoMdSend
                        size={32}
                        className="text-neutral-main hover:text-primary-main cursor-pointer transition"
                        onClick={sendMessage}
                    />
                </div>

            </div>
        </div>
    );
};

export default SingleChat;