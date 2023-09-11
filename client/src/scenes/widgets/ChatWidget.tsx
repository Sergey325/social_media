import {useSelector} from "react-redux";
import {RootState} from "../../index";
import SingleChat from "../../components/SingleChat";


const ChatWidget = () => {
    const chat = useSelector((state: RootState) => state.selectedChat)

    return (
        <div
            className="flex justify-center flex-col px-2 sm:px-6 pt-6 pb-3 rounded-xl bg-bkg-alt transition duration-300 min-h-full">
            {chat
                ?
                <SingleChat chat={chat}/>
                :
                <span className="min-h-full text-base text-neutral-main self-center transition">Select a chat to start messaging</span>
            }

        </div>
    );
};

export default ChatWidget;

