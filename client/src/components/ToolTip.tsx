import {useState} from "react";

type Props = {
    children: React.ReactNode
    label: string
};

const ToolTip = ({children, label}: Props) => {
    const [isShow, setIsShow] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
        >
            {children}
            <span
                className={`
                    absolute 
                    py-1
                    px-2
                    hidden md:inline-block 
                    whitespace-nowrap 
                    left-[50%] -translate-x-[50%] 
                    text-sm text-neutral-dark
                    bg-bkg-alt/90
                    cursor-default 
                    ${isShow ? "opacity-100" : "opacity-0"} 
                    transition 
                    rounded-md
                    pointer-events-none
                    `
                }
            >
                {label}
            </span>
        </div>
    );
};

export default ToolTip;