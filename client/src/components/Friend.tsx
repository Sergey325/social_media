import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../index";
import UserImage from "./UserImage";
import {setFriends} from "../state";
import axios from "axios";
import {MdOutlinePersonRemoveAlt1, MdPersonAddAlt} from "react-icons/md";
import {User} from "../../types";
import toast from "react-hot-toast";
type Props = {
    friendId: string,
    name: string,
    subtitle: string,
    userPictureUrl: string,
};

const Friend = ({ friendId, name, subtitle, userPictureUrl}: Props) => {
    const dispatch = useDispatch();
    const currentUserID = useSelector((state: RootState) => state.currentUser?._id)
    const navigate = useNavigate();
    const _id = useSelector((state: RootState) => state.currentUser?._id);
    const token = useSelector((state: RootState) => state.token);
    const friends = useSelector((state: RootState) => state.currentUser?.friends) as User[];
    const isFriend = friends.some(friend => friend._id === friendId);

    const patchFriend = async () => {
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_ENDPOINT}/users/${_id}/${friendId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            const updatedFriends = response.data;
            dispatch(setFriends({ friends: updatedFriends }));
        } catch (error) {
            console.error("Error patching friend: ", error)
            toast.error("Error patching friend");
        }
    };


    return (
        <div className="flex justify-between items-center w-full text-sm">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <UserImage imageUrl={userPictureUrl} sizeInPx={50} />
                </div>
                <div
                    className="flex flex-col"
                    onClick={() => {
                        navigate(currentUserID !== friendId ? `/profile/${friendId}` : "/home");
                        navigate(0);
                    }}
                >
                    <span className="text-neutral-main hover:text-primary-light cursor-pointer">
                        {name}
                    </span>
                    <span className="text-neutral-medium ">
                        {subtitle}
                    </span>
                </div>
            </div>
            {
                _id !== friendId &&
                <div className="bg-primary-light p-2.5 text-primary-dark rounded-full cursor-pointer transition duration-300" onClick={() => patchFriend()}>
                    {
                        isFriend
                        ?
                        <MdOutlinePersonRemoveAlt1 size={18}/>
                        :
                        <MdPersonAddAlt size={18}/>
                    }
                </div>
            }
        </div>
    );
};

export default Friend;