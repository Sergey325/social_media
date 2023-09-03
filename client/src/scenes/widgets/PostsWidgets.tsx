import {RootState} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";
import {useEffect} from "react";
import axios from "axios";
import PostWidget from "./PostWidget";

type Props = {
    userId: string;
    isProfile?: Boolean
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.posts)
    const token = useSelector((state: RootState) => state.token)

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/posts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const reversedPosts = [...response.data].reverse();
            dispatch(setPosts({ posts: reversedPosts }));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getUserPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setPosts({ posts: response.data }));
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [posts]); // eslint-disable-line react-hooks/exhaustive-deps

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