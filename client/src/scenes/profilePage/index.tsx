import {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import axios from "axios";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import {User} from "../../../types";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidgets";
import {setVisitedUser} from "../../state";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState) => state.currentUser) as User
    const visitedUser = useSelector((state: RootState) => state.visitedUser) as User
    const {userId} = useParams();
    const token = useSelector((state: RootState) => state.token);

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;
            dispatch(setVisitedUser({ user: data }));
        } catch (error) {
            toast.error(`Error fetching user: ${error}`)
        }
    }, [dispatch, token, userId]);
        
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!userId || !visitedUser) return null;

    return (
        <div>
            <Navbar/>
            <div className="lg:flex w-full mt-16 py-8 px-[6%] justify-center gap-8">
                <div className="lg:basis-1/4 flex flex-col gap-8 pb-8 lg:pb-0">
                    <UserWidget userId={userId} pictureUrl={visitedUser.pictureUrl}/>
                    <FriendListWidget userId={userId}/>
                </div>
                <div className="lg:basis-5/12 flex flex-col">
                    {userId === currentUser._id ?
                        <MyPostWidget pictureUrl={currentUser.pictureUrl}/>
                        : <div className="-mt-8"></div>
                    }
                    <PostsWidget userId={userId} isProfile/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;