import { useEffect, useState } from "react";
import {AiOutlineArrowUp} from "react-icons/ai";

const ScrollToTop = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setShow(scrollTop > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`
                ${show ? "block" : "hidden"} 
                fixed 
                bottom-20 right-5 lg:right-20 
                rounded-full 
                bg-bkg-default text-primary-light
                p-2 lg:p-4
                animate-bounce 
                drop-shadow-[0_0_10px_rgba(0,213,250,0.25)]
                cursor-pointer
                transition
                duration-300
            `}
            onClick={scroll}
        >
            <AiOutlineArrowUp size={24}/>
        </div>
    );
};

export default ScrollToTop;