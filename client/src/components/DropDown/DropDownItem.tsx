import React, { ReactNode } from "react";
import {IconType} from "react-icons";

type Props = {
    label: string;
    item?: ReactNode;
    icon?: IconType;
    childStyle?: string;
    onClick?: () => void
};

const DropDownItem = ({ label, childStyle, item, icon: Icon, onClick }: Props) => {
    return (
        <div className={`${childStyle} px-4 py-3 w-full text-center transition`} onClick={onClick}>
            {item && item}
            {Icon ? <Icon size={20}/> : label}
        </div>
    );
};

export default DropDownItem;