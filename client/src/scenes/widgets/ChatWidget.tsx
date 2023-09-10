import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {IoMdSend} from "react-icons/io";
import {useState} from "react";
import ChatMessages from "../../components/ChatMessages";

const ChatWidget = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const chat = useSelector((state: RootState) => state.selectedChat)

    const sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        event.preventDefault()
        if(event.key === "Enter"){

        }

    }

    const handleChange = (value: string) => {
        setNewMessage(value)
    }

    return (
        <div
            className="flex justify-center flex-col px-2 sm:px-6 pt-6 pb-3 rounded-xl bg-bkg-alt transition duration-300 min-h-full">
            {chat
                ?
                <div className="min-h-full flex flex-col flex-grow justify-end">
                    <ChatMessages/>
                    <div className="">
                        <div className="flex items-center justify-end text-sm gap-2 pt-3">
                            <input
                                type="text"
                                disabled={isLoading}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        sendMessage(e);
                                    }
                                }}
                                onChange={(e) => handleChange(e.target.value)}
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
                            />
                        </div>

                    </div>
                </div>
                :
                <span className="min-h-full text-base text-neutral-main self-center transition">Select a chat to start messaging</span>
            }

        </div>
    );
};

export default ChatWidget;

