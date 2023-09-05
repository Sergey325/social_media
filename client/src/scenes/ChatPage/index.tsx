import Navbar from "../navbar";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {User} from "../../../types";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {

};

const ChatPage = (props: Props) => {
    const { _id, friends } = useSelector((state: RootState) => state.currentUser) as User
    const token = useSelector((state: RootState) => state.token)


    const handleClick = async (friendId: string) => {
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
        );
        toast.success(response.status.toString())
    }

    return (
        <div>
            <Navbar/>
            <div className="h-[100%] block lg:flex w-full py-8 px-5 sm:px-20 gap-2 justify-between">
                <div className=" lg:w-1/4 bg-white">
                    {friends.map(friend =>
                        <div key={friend._id} className="bg-blue-600 p-4 text-white" onClick={() => handleClick(friend._id)}>
                            {friend.firstName}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;