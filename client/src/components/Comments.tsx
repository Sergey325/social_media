import UserImage from "./UserImage";
import {Comment} from "../../types";
import {formatDistanceToNow} from "date-fns";
import {useNavigate} from "react-router-dom";
import CreateComment from "./CreateComment";

type Props = {
    comments: Comment[]
    postId: string
};

const Comments = ({comments, postId}: Props) => {
    const navigate = useNavigate()

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
                <CreateComment postId={postId}/>
            </div>
        </div>
    );
};

export default Comments;