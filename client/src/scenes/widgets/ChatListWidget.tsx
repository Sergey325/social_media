import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {Chat, User} from "../../../types";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {useNavigate} from "react-router-dom";
import {setSelectedChat} from "../../state";
import {formatDateTime} from "../../utils/ChatLogic";

const ChatListWidget = () => {
    const {_id, friends} = useSelector((state: RootState) => state.currentUser) as User
    const [chats, setChats] = useState<Chat[]>([])
    const chat = useSelector((state: RootState) => state.selectedChat)
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, friendId: string ) => {
        e.stopPropagation()
        if(friendId !== chat?.participants[1]._id) {
            createOrSelectChat(friendId)
        }
    }

    const createOrSelectChat = async (friendId: string) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/chats/`,
                {
                    userId1: _id,
                    userId2: friendId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            // setSelectedChat(response.data)
            dispatch(setSelectedChat({chat: response.data}))
        } catch (error) {
            toast.error(`Error accessing chat: ${error}`)
        }
    }

    const getChats = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/chats/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setChats(response.data)
        } catch (error) {
            toast.error(`Error accessing chat: ${error}`)
        }
    }, [_id, token])

    useEffect(() => {
        getChats()
        return  () => {
            dispatch(setSelectedChat({chat: null}))
        }
    }, [getChats]);

    return (
        <WidgetWrapper>
            <div className="-mt-4 -my-1 -mx-4">
                {chats.map(chat =>
                    <div
                        key={chat._id}
                        className="flex items-center gap-4 cursor-pointer p-2 rounded-xl hover:bg-neutral-light transition duration-300"
                        onClick={(e) => handleClick(e, chat.participants[1]._id)}
                    >
                        <div className="">
                            <UserImage imageUrl={chat.participants[1].pictureUrl}/>
                        </div>
                        <div className="w-full flex flex-col overflow-hidden text-sm sm:text-base text-neutral-medium">
                            <div className="flex justify-between">
                                <span
                                    className="font-semibold text-neutral-dark hover:text-primary-light cursor-pointer max-w-min whitespace-nowrap"
                                    onClick={() => {
                                        navigate(`/profile/${chat.participants[1]._id}`);
                                        navigate(0);
                                    }}
                                >
                                    {chat.participants[1].firstName} {chat.participants[1].lastName}
                                </span>
                                <span className="">
                                    {formatDateTime(chat?.latestMessage.createdAt.toString())}
                                </span>
                            </div>

                            {/*{console.log(chat)}*/}
                            <span className="font-medium whitespace-nowrap overflow-hidden truncate">
                                {chat?.latestMessage?.content || "There's nothing here yet"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </WidgetWrapper>
    );
};

export default ChatListWidget;