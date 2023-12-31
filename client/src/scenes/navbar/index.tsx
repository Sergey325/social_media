import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "state";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../index";
import {BiSolidMessageDetail} from "react-icons/bi";
import {IoMdNotifications} from "react-icons/io";
import DropDown from "../../components/UI/DropDown";
import {useEffect, useMemo, useState} from "react";
import ThemeToggle from "./components/ThemeToggle";
import {AiFillQuestionCircle} from "react-icons/ai";

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.currentUser);
    const fullName = `${user?.firstName} ${user?.lastName}`;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);

    const options = useMemo(() => {
        let options
        options = [
            { value: fullName, label: fullName, onSelected: function() { }},
            { value: "Logout", label: "Logout", onSelected: function() { dispatch(setLogout()) }},
        ]

        if(windowWidth < 640){
            options = [
                { value: "Mode", label: "", item: <ThemeToggle/>, onSelected: function() { dispatch(setMode()) }},
                { value: "Message", label: "", icon: BiSolidMessageDetail, onSelected: function() { navigate("/chat") }},
                { value: "Notifications", label: "", icon: IoMdNotifications, onSelected: function() { }},
                { value: "Support", label: "", icon: AiFillQuestionCircle, onSelected: function() { }},...options,
            ]
        }

        return options
    }, [fullName, windowWidth, dispatch, navigate])

    return (
        <div className="flex px-5 sm:px-20  justify-between items-center py-4 w-full bg-bkg-alt transition duration-300 drop-shadow-md z-30 fixed">
            <h1
                className="font-bold text-xl md:text-2xl lg:text-3xl cursor-pointer text-primary-main hover:text-primary-light select-none transition"
                onClick={() => navigate("/home")}
            >
                Socialmedia
            </h1>
            <div className="flex justify-between text-sm items-center gap-4">
                <div className="hidden sm:flex items-center text-neutral-dark gap-3">
                    <ThemeToggle />
                    <BiSolidMessageDetail
                        className="hover:bg-neutral-light p-1.5 lg:p-1 rounded-full transition duration-300 cursor-pointer"
                        size={32}
                        onClick={() => navigate("/chat")}
                    />
                    <IoMdNotifications className="hover:bg-neutral-light p-1.5 lg:p-1 rounded-full transition duration-300 cursor-pointer" size={32}/>
                    <AiFillQuestionCircle className="hover:bg-neutral-light p-1.5 lg:p-1 rounded-full transition duration-300 cursor-pointer" size={32}/>
                </div>
                <DropDown
                    placeholder={fullName}
                    mainStyles="
                        hover:shadow-none
                        min-w-[140px]
                        border-none
                        rounded-md
                        text-neutral-dark
                        bg-neutral-light
                        px-1
                        z-10
                    "
                    childStyle={"flex items-center justify-center bg-neutral-light hover:bg-neutral-medium text-sm"}
                    hrAfter={windowWidth < 640 ? [5] : [1]}
                    options={options}
                    selection={false}
                />
            </div>
        </div>
    );
};

export default Navbar;