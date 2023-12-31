import {IconType} from "react-icons";

type Props = {
    label: string
    onClick: (e: any) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
    gradient?: boolean
};

const Button = ({label, onClick, disabled, outline, small, icon: Icon, gradient}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70 disabled:cursor-not-allowed
                rounded-3xl
                transition-all
                duration-300
                w-full
                ${outline ? "bg-slate-900" : "bg-primary-main"}
                ${outline ? "shadow-[0_0_0_1px_rgba(100,116,139,1)]" : "shadow-[0_0_0_1px_rgba(6,182,212,1)]"}
                ${outline ? "hover:shadow-[0_0_0_3px_rgba(100,116,139,1)]" : gradient ? "hover:drop-shadow-[0_2px_6px_rgba(137,63,237,0.90)]" : "hover:drop-shadow-[0_1px_3px_rgba(6,182,212,0.50)]"}
                ${outline ? "text-gray-300" : "text-bkg-alt"}
                ${gradient && "bg-gradient-to-br from-indigo-500 to-purple-600"}
                ${gradient && ""}
                ${small ? "py-1" : "py-2"}
                ${small ? "text-sm" : "text-md"}
                ${small ? "font-light" : "font-medium"}
                select-none
            `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    );
};

export default Button;