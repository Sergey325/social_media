import UserImage from "./UserImage";
import {useState} from "react";
import {IoMdSend} from "react-icons/io";
import axios from "axios";
import {setPost} from "../state";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {User} from "../../types";
import toast from "react-hot-toast";

type Props = {
    postId: string
};

const CreateComment = ({postId}: Props) => {
    const [comment, setComment] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { _id, pictureUrl } = useSelector((state: RootState) => state.currentUser as User)
    const { token } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    const handleCreateComment = async () => {
        setIsLoading(true)
        axios.patch(`http://localhost:3001/posts/${postId}/comment`, {
            userId: _id,
            comment: comment
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res => {
            toast.success("Comment added successfully!")
            const updatedPost = res.data
            dispatch(setPost({post: updatedPost}));
            setComment("")
        })).catch(error => {
            toast.error(error.response?.data.message)
        }).finally(() => {
            setIsLoading(false)
        })
    };

    return (
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
    );
};

export default CreateComment;