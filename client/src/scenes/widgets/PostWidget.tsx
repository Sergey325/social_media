import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {setPost} from "../../state";
import axios from "axios";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import {AiOutlineShareAlt} from "react-icons/ai";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {BsChatLeft} from "react-icons/bs";
import UserImage from "../../components/UserImage";
import {Comment} from "../../../types";
import {useNavigate} from "react-router-dom";
import {formatDistanceToNow, format} from 'date-fns';
import CreateComment from "../../components/CreateComment";

type Props = {
    postId: string,
    postUserId: string,
    name: string,
    description: string,
    location: string,
    pictureUrl: string,
    userPictureUrl: string,
    likes: Record<string, boolean>,
    comments: Array<Comment>,
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
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.token);
    const loggedInUserId = useSelector((state: RootState) => state.currentUser?._id) as string;
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
            dispatch(setPost({post: updatedPost}));
        } catch (error) {
            console.error("Error patching like:", error);
        }
    };

    const readableDate = (commentDate: Date): string => {
        const currentTime = new Date();
        return formatDistanceToNow(new Date(commentDate)) + " ago";
    }

    return (
        <WidgetWrapper>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPictureUrl={userPictureUrl}
            />
            <p className="text-neutral-main text-sm sm:text-base mt-4">
                {description}
            </p>
            {pictureUrl &&
                <img src={pictureUrl} alt="postPicture" className="w-full h-auto rounded-xl mt-3"/>
            }
            <div className="flex justify-between items-center text-neutral-main mt-4 mb-1">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-1.5">
                        <div onClick={patchLike} className="cursor-pointer hover:text-neutral-mediumMain">
                            {
                                isLiked ? <FaHeart className="text-primary-main" size={22}/> : <FaRegHeart size={22}/>
                            }
                        </div>
                        <span className="text-neutral-dark">{likeCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsChatLeft
                            size={20}
                            strokeWidth={0.9}
                            onClick={() => setIsComments(!isComments)}
                            className="hover:text-neutral-mediumMain cursor-pointer"
                        />
                        <span className="text-neutral-dark ">{comments.length}</span>
                    </div>
                </div>
                <AiOutlineShareAlt className="cursor-pointer hover:text-neutral-mediumMain" size={26}/>
            </div>
            {isComments && comments.length > 0 &&
                <div className="mt-2">
                    {comments.map((comment, i) => (
                        <div key={`${name}-${i}`}>
                            <hr className="border-neutral-500"/>
                            <div className="my-2 pl-1">
                                <div className="flex items-center gap-2">
                                    <UserImage imageUrl={comment.userPictureUrl} sizeInPx={40}/>
                                    <div
                                        className="flex flex-col text-sm"
                                        onClick={() => {
                                            navigate(`/profile/${comment.userId}`);
                                            navigate(0);
                                        }}
                                    >
                                        <span className="text-neutral-main hover:text-primary-light cursor-pointer">
                                            {comment.firstName} {comment.lastName}
                                        </span>
                                        <span className="text-neutral-medium ">
                                            {readableDate(comment.date)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-neutral-main text-base my-1">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    <hr className="border-neutral-500"/>
                    <div className="mt-3">
                        <CreateComment postId={postId}/>
                    </div>
                </div>
            }
        </WidgetWrapper>
    );
};

export default PostWidget;