import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import {Chat, FriendType, User} from "../../../../types";
import WidgetWrapper from "../../../components/UI/WidgetWrapper";
import {setSelectedChat} from "../../../state";
import ChatListItem from "../components/ChatListItem";

const ChatListWidget = () => {
    const {_id, friends} = useSelector((state: RootState) => state.currentUser) as User
    const [chats, setChats] = useState<Chat[]>([])
    const chat = useSelector((state: RootState) => state.selectedChat)
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, friendId: string ) => {
        e.stopPropagation()
        if(friendId !== chat?.participants[1]._id) {
            createOrSelectChat(friendId)
        }
    }

    const createOrSelectChat = async (friendId: string) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_ENDPOINT}/chats/`,
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
            dispatch(setSelectedChat({chat: response.data}))
        } catch (error) {
            toast.error(`Error accessing chat: ${error}`)
        }
    }

    const getChats = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_ENDPOINT}/chats/${_id}`,
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
        return () => {
            dispatch(setSelectedChat({chat: null}))
        }
    }, [getChats]);

    useEffect(() => {
        getChats()
    }, [chat?.latestMessage]);

    return (
        <WidgetWrapper>
            <div className="-mt-4 -my-1 -mx-4">
                {chats.map(chat =>
                    <ChatListItem key={chat._id} onClick={handleClick} friend={chat.participants.find(participant => participant._id !== _id) as FriendType} latestMessage={chat.latestMessage}/>
                )}
                {friends.filter((friend) =>
                    !chats.some((chat) => chat.participants[1]._id === friend._id || chat.participants[0]._id === friend._id))
                    .map(friend =>
                    <ChatListItem key={friend._id} onClick={handleClick} friend={friend} />
                )}
            </div>
        </WidgetWrapper>
    );
};

export default ChatListWidget;