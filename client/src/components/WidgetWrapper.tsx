type Props = {
    children: React.ReactNode
};

const WidgetWrapper = ({children}: Props) => {
    return (
        <div className="px-6 pt-6 pb-3 rounded-xl bg-bkg-alt">
            {children}
        </div>
    );
};

export default WidgetWrapper;