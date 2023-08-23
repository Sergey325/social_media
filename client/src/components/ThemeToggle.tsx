import {MdDarkMode, MdLightMode} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../state";
import {RootState} from "../index";


const ThemeToggle = () => {
    const mode = useSelector((state: RootState) => state.mode);
    const dispatch = useDispatch();

    return (
        <div className="flex justify-center transition cursor-pointer" onClick={() => dispatch(setMode())}>
            {
                mode === "light"
                    ? <MdDarkMode className="md:hover:bg-neutral-light p-1.5 lg:p-1 rounded-full transition pointer-events-auto md:pointer-events-none" size={32} onClick={() => dispatch(setMode())}/>
                    : <MdLightMode className="md:hover:bg-neutral-light p-1.5 lg:p-1 rounded-full transition pointer-events-auto md:pointer-events-none" size={32} onClick={() => dispatch(setMode())}/>
            }
        </div>
    );
};

export default ThemeToggle;