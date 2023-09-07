import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {Chat, User} from "../../../types";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {useNavigate} from "react-router-dom";

const ChatListWidget = () => {
    const {_id, friends} = useSelector((state: RootState) => state.currentUser) as User
    const [chats, setChats] = useState<Chat[]>([])
    const token = useSelector((state: RootState) => state.token)
    const navigate = useNavigate()

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
    }, [getChats]);

    return (
        <WidgetWrapper>
            <div className="relative shrink-0">
                {chats.map(chat =>
                    <div className="flex items-center gap-4">
                        <div>
                            <UserImage imageUrl={chat.participants[1].pictureUrl}/>
                        </div>
                        <div className="w-full flex flex-col overflow-hidden">
                            <span
                                className="text-base font-semibold text-neutral-dark hover:text-primary-light cursor-pointer max-w-min whitespace-nowrap"
                                onClick={() => {
                                    navigate(`/profile/${chat.participants[1]._id}`);
                                    navigate(0);
                                }}
                            >
                                {chat.participants[1].firstName} {chat.participants[1].lastName}
                            </span>
                            <span className="text-base font-medium text-neutral-medium whitespace-nowrap overflow-hidden truncate">
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