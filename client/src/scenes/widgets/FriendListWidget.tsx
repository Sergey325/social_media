import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useCallback, useEffect} from "react";
import axios from "axios";
import {setFriends} from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import {FriendType} from "../../../types"

type Props = {
    userId: string
};

const FriendListWidget = ({userId}: Props) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);
    const friends = useSelector((state: RootState) => state.currentUser?.friends) as FriendType[];

    const getFriends = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${userId}/friends`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = response.data;
            dispatch(setFriends({friends: data}));
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    }, [dispatch, token, userId]) 

    useEffect(() => {
        getFriends();
    }, [getFriends])

    if(!friends?.length){
        return null
    }

    return (
        <WidgetWrapper>
            <p className="text-neutral-dark text-base mb-3">
                Friend List
            </p>
            <div className="flex flex-col gap-6">
                {friends?.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPictureUrl={friend.pictureUrl}
                    />
                ))}
            </div>
        </WidgetWrapper>
    );
};

export default FriendListWidget;