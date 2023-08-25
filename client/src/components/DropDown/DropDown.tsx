import React, {ReactNode, useCallback, useEffect, useState} from "react";
import DropDownItem from "components/DropDown/DropDownItem";
import {BiSolidDownArrow} from "react-icons/bi";
import {IconType} from "react-icons";

type Option = {
    value: string
    label: string
    icon?: IconType
    item?:  ReactNode;
    onSelected: () => void
};

type Props = {
    placeholder?: string
    body?: React.ReactElement
    rounded?: boolean
    mainStyles?: string
    options: Option[]
    childStyle?: string
    hrAfter?: Number[]
    overflowHidden?: boolean
    selection?: boolean
};

const DropDown = ({placeholder, body, rounded, mainStyles, options, childStyle, hrAfter, overflowHidden = false, selection = true}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleSelectOption = useCallback((option: Option) => {
        if(selectedOption?.value === option.value){
            return
        }
        if(selection) setSelectedOption(option);
        option.onSelected();
        console.log("h")
    }, [selectedOption?.value, selection]);

    useEffect(() => {
        setIsOpen(false);
    }, [selectedOption]);

    return (
        <div
            onClick={() => {setIsOpen((value) => !value)}}
            className={`
                relative
                md:py-1 md:px-2
                border-[2px]
                flex flex-row items-center gap-3
                rounded-${rounded ? "full" : "none"}
                cursor-pointer
                hover:shadow-[0_0_20px_rgba(98,143,200,0.25)]
                transition
                text-md
                group
                select-none
                touch-none
                ${mainStyles}
            `}
        >
            {
                body ? body
                    : (
                        <div className="flex items-center justify-between py-1 px-1 md:px-0.5 w-full min-w-[50px]">
                            {
                                selectedOption && selectedOption.label ? (selectedOption.label)
                                : (<p className="text-center">{placeholder}</p>)
                            }
                            <BiSolidDownArrow
                                className={` transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} size={10}/>
                        </div>
                    )
            }

            <div
                className={`
                    absolute
                    rounded-${rounded ? "xl" : "none"}
                    shadow-md
                    w-full
                    overflow-x-hidden
                    right-0
                    top-3/4
                    text-base
                    text-neutral-dark
                    transition-all
                    duration-300
                    ${overflowHidden ? "max-h-[200px] lg:max-h-max": "max-h-max"}
                    min-w-min
                    z-50
                    ${isOpen ? `translate-y-2 opacity-100 visible` : "translate-y-[-5] opacity-0 invisible"}
                `}
            >
                <div className="flex flex-col h-full items-center cursor-pointer text-md w-full">
                    {options.map((option, key) => (
                        (
                            <div key={key + option.value} className="w-full" onClick={() => handleSelectOption(option)}>
                                {hrAfter?.includes(key) && (
                                    <hr className="border-neutral-medium"/>
                                )}
                                <DropDownItem
                                    label={option.label}
                                    item={option.item}
                                    icon={option.icon}
                                    childStyle={childStyle}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default DropDown;