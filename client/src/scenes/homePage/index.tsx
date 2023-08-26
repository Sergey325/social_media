import Navbar from "../navbar";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {User} from "../../../types";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const HomePage = () => {
    const {_id, pictureUrl} = useSelector((state: RootState) => state.user as User);

    return (
        <div>
            <Navbar/>
            <div className="h-[100%] block lg:flex w-full py-8 px-5 sm:px-20 gap-2 justify-between">
                <div className="lg:basis-1/4">
                    <UserWidget userId={_id} pictureUrl={pictureUrl}/>
                </div>
                <div className="lg:basis-5/12 mt-8 lg:mt-0">

                </div>
                <div className="hidden lg:block basis-1/4">
                    <MyPostWidget pictureUrl={pictureUrl}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;