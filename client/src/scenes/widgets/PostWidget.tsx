import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {setPost} from "../../state";
import axios from "axios";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";

type Props = {
    postId: string,
    postUserId: string,
    name: string,
    description: string,
    location: string,
    pictureUrl: string,
    userPictureUrl: string,
    likes: Record<string, boolean>,
    comments: Array<string>,
};

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    pictureUrl,
    userPictureUrl,
    likes,
    comments
}: Props) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);
    const loggedInUserId = useSelector((state: RootState) => state.user?._id) as string;
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const patchLike = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/posts/${postId}/like`, {
                userId: loggedInUserId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const updatedPost = response.data;
            dispatch(setPost({ post: updatedPost }));
        } catch (error) {
            console.error("Error patching like:", error);
        }
    };

    return (
        <WidgetWrapper>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPictureUrl={userPictureUrl}
            />
        </WidgetWrapper>
    );
};

export default PostWidget;