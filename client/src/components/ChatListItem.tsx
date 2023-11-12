import UserImage from "./UserImage";
import {formatDateTime} from "../utils/ChatLogic";
import {FriendType, Message} from "../../types";
import {useNavigate} from "react-router-dom";

type Props = {
    friend: FriendType,
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, participantId: string) => void,
    latestMessage?: Message,
    isExistingChat?: boolean,
};

const ChatListItem = ({friend, isExistingChat = true, onClick, latestMessage}: Props) => {
    const navigate = useNavigate()

    return (
        <div
            className="flex items-center gap-4 cursor-pointer p-2 rounded-xl hover:bg-neutral-light transition duration-300"
            onClick={(e) => onClick(e, friend._id) }
        >
            <div className="">
                <UserImage imageUrl={friend.pictureUrl}/>
            </div>
            <div className="w-full flex flex-col overflow-hidden text-sm sm:text-base text-neutral-medium">
                <div className="flex justify-between">
                    <span
                        className="font-semibold text-neutral-dark hover:text-primary-light cursor-pointer max-w-min whitespace-nowrap"
                        onClick={() => {
                            navigate(`/profile/${friend._id}`);
                            navigate(0);
                        }}
                    >
                        {friend.firstName} {friend.lastName}
                    </span>
                    {isExistingChat && latestMessage &&
                        <span className="">
                            {formatDateTime(latestMessage.createdAt)}
                        </span>
                    }

                </div>
                <span className="font-medium whitespace-nowrap overflow-hidden truncate">
                    {latestMessage?.content || "There's nothing here yet"}
                </span>
            </div>
        </div>
    );
};

export default ChatListItem;