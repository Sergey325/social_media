import UserImage from "./UserImage";
import {Comment, Post, User} from "../../types";
import {formatDistanceToNow} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../index";
import {IoMdSend} from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
    postComments: Comment[]
    postId: string
};

const Comments = ({postId, postComments}: Props) => {
    const [comments, setComments] = useState(postComments)
    const [comment, setComment] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { _id, pictureUrl } = useSelector((state: RootState) => state.currentUser as User)
    const { token } = useSelector((state: RootState) => state)
    const navigate = useNavigate()

    const handleCreateComment = async () => {
        setIsLoading(true)
        axios.patch(`${process.env.REACT_APP_ENDPOINT}/posts/${postId}/comment`, {
            userId: _id,
            comment: comment
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res => {
            toast.success("Comment added successfully!")
            const updatedPost = res.data as Post
            setComments(updatedPost.comments)
            setComment("")
        })).catch(error => {
            toast.error(error.response?.data.message)
        }).finally(() => {
            setIsLoading(false)
        })
    };

    const readableDate = (commentDate: Date): string => {
        return formatDistanceToNow(new Date(commentDate)) + " ago";
    }

    return (
        <div className="mt-2">
            {comments.map((comment, i) => (
                <div key={`${postId}-${i}`}>
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
                        <p className="text-neutral-main text-sm lg:text-base my-1">
                            {comment.text}
                        </p>
                    </div>
                </div>
            ))}
            <hr className="border-neutral-500"/>
            <div className="mt-3">
                <div className="flex items-center text-sm gap-2">
                    <div>
                        <UserImage imageUrl={pictureUrl} sizeInPx={40}/>
                    </div>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isLoading}
                        className="
                        w-full
                        appearance-none
                        outline-none
                        py-2
                        px-4
                        rounded-3xl
                        bg-neutral-light
                        text-neutral-dark
                        transition
                        duration-300
                    "
                        placeholder="Leave a comment..."
                    />
                    <IoMdSend
                        size={32}
                        className="text-neutral-main hover:text-primary-main cursor-pointer transition"
                        onClick={handleCreateComment}
                    />
                </div>
            </div>
        </div>
    );
};

export default Comments;