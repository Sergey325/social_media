import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import axios from "axios";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import {User} from "../../../types";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidgets";
import toast from "react-hot-toast";
import {ClipLoader} from "react-spinners";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const [visitedUser, setVisitedUser] = useState<User | null>()
    const {userId} = useParams();
    const token = useSelector((state: RootState) => state.token);

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data as User;
            setVisitedUser(data)
        } catch (error) {
            toast.error(`Error fetching user: ${error}`)
        }
    }, [dispatch, token, userId]);
        
    useEffect(() => {
        getUser();
        return () => {
            setVisitedUser(null)
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!userId || !visitedUser) return null;

    return (
        <div>
            <Navbar/>
            {
                visitedUser._id === userId
                ?
                <div className="lg:flex w-full mt-16 py-8 px-[6%] justify-center gap-8">
                    <div className="lg:basis-1/4 flex flex-col gap-8 pb-8 lg:pb-0">
                        <UserWidget user={visitedUser}
                                    pictureUrl={visitedUser._id === userId ? visitedUser.pictureUrl : ""}/>
                        <FriendListWidget userId={userId} visited/>
                    </div>
                    <div className="lg:basis-5/12 flex flex-col -mt-8">
                        <PostsWidget userId={userId} isProfile/>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center h-[100vh]">
                    <ClipLoader  color="#33DDFB" size={100}/>
                </div>
            }
        </div>
    );
};

export default ProfilePage;