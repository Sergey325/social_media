type Props = {
    imageUrl: string,
    sizeInPx?: number
};


const UserImage = ({imageUrl, sizeInPx = 60}: Props) => {
    return (
        <div style={{width: sizeInPx, height: sizeInPx}}>
            <img
                src={imageUrl ? imageUrl : "images/placeholder.jpg"}
                className="rounded-full object-cover max-w-min"
                style={{width: sizeInPx, height: sizeInPx}}
                alt="userImage"
            />
        </div>
    );
};

export default UserImage;