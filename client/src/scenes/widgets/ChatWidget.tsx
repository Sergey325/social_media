
type Props = {};

const ChatWidget = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 pt-6 pb-3 rounded-xl bg-bkg-alt transition duration-300 min-h-full">
            {
                true && <span className="min-h-full text-base text-neutral-main transition">Select a chat to start messaging</span>
            }
        </div>
    );
};

export default ChatWidget;