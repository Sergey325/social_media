import {RootState} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";
import {useCallback, useEffect} from "react";
import axios from "axios";
import PostWidget from "./PostWidget";
import toast from "react-hot-toast";

type Props = {
    userId: string;
    isProfile?: Boolean
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.posts)
    const token = useSelector((state: RootState) => state.token)

    const getPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const reversedPosts = [...response.data].reverse();
            dispatch(setPosts({ posts: reversedPosts }));
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Error fetching posts')
        }
    }, [dispatch, token]) 

    const getUserPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/posts/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setPosts({ posts: response.data }));
        } catch (error) {
            console.error('Error fetching user posts:', error);
            toast.error('Error fetching user posts')
        }
    }, [dispatch, token, userId]) 

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [getPosts, getUserPosts, isProfile]);

    return (
        <>
            {posts.map(
                ({
                     _id,
                     userId,
                     firstName,
                     lastName,
                     description,
                     location,
                     pictureUrl,
                     userPictureUrl,
                     likes,
                     comments,
                }) => (
                    <div key={_id} className="mt-8">
                        <PostWidget
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            pictureUrl={pictureUrl}
                            userPictureUrl={userPictureUrl}
                            likes={likes}
                            comments={comments}
                        />
                    </div>

                )
            )}
        </>
    );
};

export default PostsWidget;