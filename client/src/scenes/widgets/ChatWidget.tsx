import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {IoMdSend} from "react-icons/io";
import {useState} from "react";
import ChatMessages from "../../components/ChatMessages";

const ChatWidget = () => {
    const [isLoading, setIsLoading] = useState(false)
    const chat = useSelector((state: RootState) => state.selectedChat)

    return (
        <div
            className="flex justify-center flex-col px-6 pt-6 pb-3 rounded-xl bg-bkg-alt transition duration-300 min-h-full">
            {chat
                ?
                <div className="min-h-full flex flex-col flex-grow justify-end">
                    <ChatMessages/>
                    <div className="flex items-center justify-end text-sm gap-2">
                        <input
                            type="text"
                            disabled={isLoading}
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
                            placeholder="Leave a comment..."
                        />
                        <IoMdSend
                            size={32}
                            className="text-neutral-main hover:text-primary-main cursor-pointer transition"
                        />
                    </div>
                </div>
                :
                <span className="min-h-full text-base text-neutral-main self-center transition">Select a chat to start messaging</span>
            }

        </div>
    );
};

export default ChatWidget;

