import Navbar from "../navbar";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {User} from "../../../types";
import UserWidget from "../widgets/UserWidget";

const HomePage = () => {
    const {_id, pictureUrl} = useSelector((state: RootState) => state.user as User);

    return (
        <div>
            <Navbar/>
            <div className="h-[100%] block lg:flex w-full py-8 px-[6%] gap-2 justify-between">
                <div className="lg:basis-1/4">
                    <UserWidget userId={_id} pictureUrl={pictureUrl}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;