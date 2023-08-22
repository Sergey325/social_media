import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "state";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../index";


type Props = {

};

const Navbar = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const fullName = `${user?.firstName} ${user?.lastName}`;

    return (
        <div className="flex justify-between items-center px-1 py-2 bg-bkg-alt">
            Navbar
        </div>
    );
};

export default Navbar;