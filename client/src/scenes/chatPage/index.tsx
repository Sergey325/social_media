import Navbar from "../navbar";
import ChatListWidget from "../widgets/ChatListWidget";
import ChatWidget from "../widgets/ChatWidget";
import {useSelector} from "react-redux";
import {RootState} from "../../index";

const ChatPage = () => {
    const chat = useSelector((state: RootState) => state.selectedChat)

    return (
        <div className="min-h-full flex flex-col flex-grow">
            <div className="">
                <Navbar/>
            </div>
            <div className="min-h-full mt-16 lg:mt-16 grow block lg:flex w-full pt-7 sm:pt-8 pb-6 px-5 sm:px-20 gap-8 justify-between">
                <div className={`${chat && "hidden lg:block"} lg:w-[33%] flex flex-col gap-8`}>
                    <ChatListWidget/>
                </div>
                <div className={`${!chat ? "hidden lg:block mt-8" : "mt-0"} lg:basis-7/12 grow max-h-[77.7vh] lg:mt-0`}>
                    <ChatWidget/>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;