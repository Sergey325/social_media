import WidgetWrapper from "../../components/UI/WidgetWrapper";

const AdvertWidget = () => {
    return (
        <WidgetWrapper>
            <div className="flex justify-between items-center">
                <span className="text-neutral-dark text-sm">Sponsored</span>
                <span className="text-neutral-medium text-xs">Create Ad</span>
            </div>
            <img
                alt="advert"
                src="https://res.cloudinary.com/dby8qzoac/image/upload/v1693556567/info4_fewmrp.jpg"
                className="w-full h-auto rounded-xl my-3"
            />
            <div className="flex justify-between items-center">
                <span className="text-neutral-main text-sm">MikaCosmetics</span>
                <span className="text-neutral-medium text-xs">mikacosmetics.com</span>
            </div>
            <p className="text-neutral-medium text-sm my-2">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </p>
        </WidgetWrapper>
    );
};

export default AdvertWidget;