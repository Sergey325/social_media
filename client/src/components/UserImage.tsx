type Props = {
    imageUrl: string,
    sizeInPx?: number
};

const UserImage = ({imageUrl, sizeInPx = 60}: Props) => {
    return (
        <div className={`h-[60px] w-[60px]`}>
            <img
                src={imageUrl} 
                className={`h-[${sizeInPx}px] w-[${sizeInPx}px] rounded-full object-cover`}
                alt="userImage"
            />
        </div>
    );
};

export default UserImage;