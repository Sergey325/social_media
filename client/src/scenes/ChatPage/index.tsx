import Navbar from "../navbar";
import ChatListWidget from "../widgets/ChatListWidget";
import ChatWidget from "../widgets/ChatWidget";


const ChatPage = () => {

    return (
        <div className="min-h-full flex flex-col flex-grow">
            <Navbar/>
            <div className="min-h-full mt-16 grow block lg:flex w-full pt-8 pb-6 px-5 sm:px-20 gap-8 justify-between">
                <div className="lg:w-[33%] flex flex-col gap-8">
                    <ChatListWidget/>
                </div>
                <div className="lg:basis-7/12 grow mt-8 lg:mt-0">
                    <ChatWidget/>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;