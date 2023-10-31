import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {RootState} from "../../index";
import {User} from "../../../types";
import axios from "axios";
import {setPosts} from "../../state";
import toast from "react-hot-toast";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import ImageUpload from "../../components/ImageUpload";
import {ImAttachment} from "react-icons/im";
import Button from "../../components/Button";

type Props = {
    pictureUrl: string
};

const MyPostWidget = ({pictureUrl}: Props) => {
    const dispatch = useDispatch()
    const [isAttachment, setIsAttachment] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [post, setPost] = useState("")
    const { _id } = useSelector((state: RootState) => state.currentUser as User)
    const token = useSelector((state: RootState) => state.token)

    const handlePost = () => {
        const data = {
            "userId": _id,
            "description": post,
            "pictureUrl": imageUrl
        }
        axios.post(`${process.env.REACT_APP_ENDPOINT}/posts`, data,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                const posts = [...res.data].reverse()
                dispatch(setPosts({posts}))
                toast.success("Post has been created")
                setImageUrl("")
                setPost("")
                setIsAttachment(false)
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
    }

    return (
        <WidgetWrapper>
            <div className="flex items-center gap-6 text-sm sm:text-base">
                <div>
                    <UserImage imageUrl={pictureUrl}/>
                </div>
                <input
                    type="text"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    className="
                        w-full
                        appearance-none
                        outline-none
                        py-2
                        px-4
                        rounded-3xl
                        bg-neutral-light
                        text-neutral-dark
                        transition duration-300
                    "
                    placeholder="What's on your mind"
                />

            </div>
            {
                isAttachment &&
                <div className="rounded-md border-2 border-neutral-400 mt-4 p-2">
                    <ImageUpload rounded={false} onChange={(pictureUrl) => setImageUrl(pictureUrl)}/>
                </div>
            }
            <div className="mt-5">
                <hr className="border-neutral-500"/>
                <div className="flex justify-between items-center mt-4">
                    <div
                        className="
                            flex items-center
                            text-neutral-mediumMain hover:text-neutral-mediumMain/70
                            gap-2
                            cursor-pointer
                        "
                        onClick={() => setIsAttachment((value) => !value)}
                    >
                        <ImAttachment size={20} />
                        <span className="text-sm sm:text-base">Attachment</span>
                    </div>
                    <div className="w-[110px] text-xs sm:text-sm font-medium">
                        <Button label="POST" onClick={handlePost} />
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};

export default MyPostWidget;