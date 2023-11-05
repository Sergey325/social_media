import {useSelector} from "react-redux";
import {RootState} from "../index";
import {Message, User} from "../../types";
import UserImage from "./UserImage";
import {formatDateTime, isLastMessage} from "../utils/ChatLogic";
import {memo, useEffect, useRef, useState} from "react";
import {differenceInCalendarDays} from "date-fns";

type Props = {
    messages: Message[],
    loadMore: () => void,
}

const ChatMessages = memo(({ messages, loadMore }: Props) => {
    const chat = useSelector((state: RootState) => state.selectedChat);
    const { _id } = useSelector((state: RootState) => state.currentUser) as User;
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);
    const [prevLength, setPrevLength] = useState(0)
    const upperRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = (fullScroll: boolean) => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = fullScroll ? chatMessagesRef.current.scrollHeight : 945;
        }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && prevLength !== messages.length) {
            loadMore();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 1 });
        if (upperRef.current) {
            observer.observe(upperRef.current);
        }

        return () => {
            if (upperRef.current) {
                observer.unobserve(upperRef.current);
            }
        };
    }, [loadMore]);

    useEffect(() => {
        if (prevLength + 1 === messages.length){
            scrollToBottom(true)
        }
        else{
            scrollToBottom(false)
        }
        setPrevLength(messages.length)
    }, [messages])

    useEffect(() => {
        scrollToBottom(true)
    }, []);

    if (!chat) {
        return null
    }

    return (
        <div className="flex flex-col my-[52px] pt-1 px-2 sm:px-6 relative overflow-y-auto overflow-x-hidden" ref={chatMessagesRef}>
            <div ref={upperRef}></div>
            <div className="">
                {messages?.map((message, index) => {
                    const isLast = isLastMessage(messages, index);
                    return (
                        <div key={message._id} className="flex items-center gap-2">
                            <div className="w-[35px] h-[35px] -mt-4 ">
                                {isLast && <UserImage imageUrl={message.sender.pictureUrl} sizeInPx={35}/>}
                            </div>
                            <div
                                className={`
                                rounded-xl 
                                ${_id === message.sender._id ? "bg-primary-main/80" : "bg-neutral-light"} 
                                py-2 pl-3 ${differenceInCalendarDays(new Date(), new Date(message.createdAt)) > 7 ? "pr-[72px]" : "pr-12"}
                                text-base 
                                text-neutral-dark
                                transition
                                duration-300
                                break-words
                                relative
                                ${isLast ? "mb-4" : "mb-0.5"}
                            `}
                            >
                                <div className="">
                                    <span className="break-all">{message.content}</span>
                                </div>

                                <span
                                    className="bottom-0.5 right-1.5 absolute text-xs text-neutral-dark/80 transition duration-300">{formatDateTime(message.createdAt.toString())}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default ChatMessages;