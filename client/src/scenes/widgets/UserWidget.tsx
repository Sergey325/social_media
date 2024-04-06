import {User} from "../../../types";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import WidgetWrapper from "../../components/UI/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {MdBusinessCenter, MdEdit, MdManageAccounts} from "react-icons/md";
import {IoLocationSharp} from "react-icons/io5";
import {AiOutlineTwitter} from "react-icons/ai";
import {BsLinkedin} from "react-icons/bs";

type Props = {
    user: User,
    pictureUrl: string
}

const UserWidget = ({user, pictureUrl}: Props) => {
    const currentUser = useSelector((state: RootState) => state.currentUser) as User
    const navigate = useNavigate()

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
                            onClick={() => navigate(currentUser._id !== user._id ? `/profile/${user._id}` : "/home") }
                            className="
                                text-lg
                                text-neutral-dark hover:text-primary-light
                                cursor-pointer
                                font-medium
                                transition duration-300
                            "
                        >
                            {firstName} {lastName}
                        </span>
                        <span className="text-neutral-medium">
                            {user.friends.length} friends
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