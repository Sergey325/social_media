import Navbar from "../navbar";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {User} from "../../../types";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidgets";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
    const user = useSelector((state: RootState) => state.currentUser as User);
    return (
        <>
            <Navbar/>
            <div className="h-[100%] mt-16 block lg:flex w-full py-8 px-5 sm:px-20 gap-2 justify-between">
                <div className="lg:basis-1/4 flex flex-col gap-8">
                    <UserWidget user={user} pictureUrl={user.pictureUrl}/>
                    <AdvertWidget/>
                </div>
                <div className="lg:basis-5/12 mt-8 lg:mt-0">
                    <MyPostWidget pictureUrl={user.pictureUrl}/>
                    <PostsWidget userId={user._id} />
                </div>
                <div className="hidden lg:block basis-1/4">
                    <AdvertWidget/>
                    <div className="my-8">
                        <FriendListWidget userId={user._id}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;