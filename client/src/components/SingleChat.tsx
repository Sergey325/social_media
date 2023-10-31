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
import {BeatLoader} from "react-spinners";
import {BiSolidCheckShield} from "react-icons/bi";
import {IoChevronBackOutline} from "react-icons/io5";
import ToolTip from "./ToolTip";

var socket: Socket;

type Props = {
    chat: Chat
}

const SingleChat = ({chat}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const {_id} = useSelector((state: RootState) => state.currentUser) as User
    const friend = chat.participants.find(participant => participant._id !== _id) as User
    const dispatch = useDispatch()

    const getMessages = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `${process.env.REACT_APP_ENDPOINT}/messages/${chat._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setMessages(response.data)
            setIsLoading(false)
            socket.emit("join chat", chat._id);
        } catch (error) {
            toast.error(`Error getting messages: ${error}`)
        }
    }, [chat?._id, token])

    useEffect(() => {
        const handleMessageReceived = (newMessageReceived: Message) => {
            if (messages) {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
        };

        socket = io(`${process.env.REACT_APP_ENDPOINT}`)
        socket.emit("setup", _id)
        socket.on("connected", () => setIsSocketConnected(true))
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        socket.on("message received", handleMessageReceived);


        return () => {
            socket.off("connected");
            socket.off("typing");
            socket.off("stop typing");
            socket.off("message received", handleMessageReceived);
        };
    }, [_id])

    useEffect(() => {
        getMessages()
    }, [getMessages])

    const sendMessage = async () => {
        if (newMessage && messages) {
            socket.emit("stop typing", chat._id)
            try {
                setIsLoading(true)
                setNewMessage("")
                const {data} = await axios.post(`${process.env.REACT_APP_ENDPOINT}/messages`,
                    {
                        content: newMessage,
                        chatId: chat?._id,
                        senderId: _id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
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
        setNewMessage(event.target.value);

        if (!isSocketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", chat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 1500;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if ((timeDiff >= timerLength && typing) || !event.target.value) {
                socket.emit("stop typing", chat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    if (!messages) {
        return null
    }

    return (
        <div className="min-h-full flex flex-col flex-grow justify-end relative">
            <div className="absolute top-0 left-0 w-full pr-5 py-1 flex justify-between items-center rounded-t-xl bg-neutral-light transition duration-300 drop-shadow-lg z-10 ">
                <div className="flex gap-1 items-center">
                    <ToolTip label="Back to chats">
                        <div className="px-1">
                            <IoChevronBackOutline
                                size={32}
                                className="text-neutral-medium hover:text-neutral-dark cursor-pointer transition duration-300"
                                onClick={() => dispatch(setSelectedChat({chat: null}))}
                            />
                        </div>
                    </ToolTip>
                    <div className="flex flex-col">
                    <span className="font-semibold text-neutral-dark hover:text-primary-light cursor-pointer whitespace-nowrap max-w-min  transition duration-300">
                        {friend.firstName} {friend.lastName}
                    </span>
                        <span className="text-neutral-medium text-sm  transition duration-300">
                        {friend.online ? "online" : "last seen recently"}
                    </span>
                    </div>
                </div>
                <ToolTip label="Stable connection">
                    <BiSolidCheckShield size={28} className="text-primary-main"/>
                </ToolTip>
            </div>
            <ChatMessages messages={messages}/>
            <div className="absolute bottom-0 w-full left-0 px-1 sm:px-4">
                <div className="h-[25px] -mt-2 pb-1">
                    {isTyping && <BeatLoader color="#33DDFB" size={15} />}
                </div>
                <div className=" flex items-center justify-end text-sm gap-2 ">
                    <input
                        type="text"
                        disabled={isLoading}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
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
                        placeholder={"Enter a message..."}
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