import {RootState} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";
import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import PostWidget from "./PostWidget";
import toast from "react-hot-toast";

type Props = {
    userId: string;
    isProfile?: Boolean
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts);
    const token = useSelector((state: RootState) => state.token);
    const observer = useRef<IntersectionObserver | null>(null);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true)
    const limit = 5

    const getPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/posts`,  {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: page, limit: limit }
            });
            const newPosts = response.data

            if(newPosts[newPosts.length-1]?._id === posts[posts.length-1]?._id){
                setLoadMore(false)
            }

            dispatch(setPosts({ posts: newPosts }))
            setPage(prevPage => prevPage + 1)
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Error fetching posts')
        }
    }, [dispatch, page, posts, token, setPage])

    const getUserPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/posts/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: page, limit: limit }
            });
            const newPosts = response.data

            if(newPosts[newPosts.length-1]?._id === posts[posts.length-1]?._id){
                setLoadMore(false)
            }

            dispatch(setPosts({ posts: newPosts }))
            setPage(prevPage => prevPage + 1)
            
        } catch (error) {
            console.error('Error fetching user posts:', error);
            toast.error('Error fetching user posts')
        }
    }, [dispatch, page, token, userId, setPage]);

    const loadMorePosts = useCallback(async () => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    }, [getPosts, getUserPosts, isProfile])

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [isProfile]);

    const lastPostElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(async (entries) => {
                if (entries[0].isIntersecting && loadMore) {
                    await loadMorePosts();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loadMore, loadMorePosts]
    );

    return (
        <>
            {posts.map(
                ({ _id, userId, firstName, lastName, description, location, pictureUrl, userPictureUrl, likes, comments }, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div key={_id} className="mt-8" ref={lastPostElementRef}>
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
                        );
                    } else {
                        return (
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
                        );
                    }
                }
            )}
        </>
    );
};

export default PostsWidget;
