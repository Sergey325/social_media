import {useEffect, useState} from "react";
import {User} from "../../../types";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {MdBusinessCenter, MdEdit, MdManageAccounts} from "react-icons/md";
import {IoLocationSharp} from "react-icons/io5";
import {AiOutlineTwitter} from "react-icons/ai";
import {BsLinkedin} from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
    userId: string,
    pictureUrl: string
}

const UserWidget = ({userId, pictureUrl}: Props) => {
    const [user, setUser] = useState<User>()
    const currentUser = useSelector((state: RootState) => state.currentUser) as User
    const visitedUser = useSelector((state: RootState) => state.visitedUser) as User
    const navigate = useNavigate()
    const token =  useSelector((state: RootState) => state.token);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                toast.error("Error fetching user")
            }
        };
        getUser();
    }, [userId, token, visitedUser]);


    if(!user){
        return null
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
    } = user;

    return (
        <WidgetWrapper>
            <div className="flex justify-between items-center pb-4" >
                <div className="flex items-center gap-3">
                    <UserImage imageUrl={pictureUrl} sizeInPx={60}/>
                    <div className="flex flex-col">
                        <span
                            onClick={() => navigate(`/profile/${userId}`)}
                            className="
                                text-lg
                                text-neutral-dark hover:text-primary-light
                                cursor-pointer
                                font-medium"
                        >
                            {firstName} {lastName}
                        </span>
                        <span className="text-neutral-medium">
                            {userId === currentUser._id ? currentUser.friends.length : visitedUser.friends.length} friends
                        </span>
                    </div>
                </div>
                <MdManageAccounts className="text-neutral-main" size={24}/>
            </div>

            <hr className="border-neutral-500"/>

            <div className="py-4 text-neutral-medium flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <IoLocationSharp size={24} className="text-neutral-main"/>
                    <span className="text-sm">{location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MdBusinessCenter size={24} className="text-neutral-main"/>
                    <span className="text-sm">{occupation}</span>
                </div>
            </div>

            <hr className="border-neutral-500"/>

            <div className="py-4 text-neutral-medium text-sm flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span>Who's viewed your profile</span>
                    <span className="text-neutral-main font-medium">{viewedProfile}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Impressions of your profile</span>
                    <span className="text-neutral-main font-medium">{impressions}</span>
                </div>
            </div>

            <hr className="border-neutral-500"/>

            <div className="py-4 text-neutral-main text-sm">
                <span className="text-base font-medium text-neutral-medium">Social Profiles</span>
                <div className="flex flex-col gap-2 pt-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <AiOutlineTwitter size={28}/>
                            <div className="flex flex-col">
                                <span className="font-medium">Twitter</span>
                                <span className="text-neutral-medium">Social Network</span>
                            </div>
                        </div>
                        <MdEdit size={20}/>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <BsLinkedin size={25}/>
                            <div className="flex flex-col">
                                <span className="font-medium">Linkedin</span>
                                <span className="text-neutral-medium">Network Platform</span>
                            </div>

                        </div>
                        <MdEdit size={20}/>
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};

export default UserWidget;