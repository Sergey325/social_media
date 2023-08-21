import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Post, User} from "../../types";

interface mainState {
    user: User | null
    token: string | null
    posts: Post[]
}

const initialState: mainState = {
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action: PayloadAction<{ friends: User[] }>) => {
            if(state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action: PayloadAction<{ post: Post }>) => {
            const updatedPosts = state.posts.map(post => {
                if(post._id === action.payload.post._id) return action.payload.post
                return post
            })
            state.posts = updatedPosts
        },
    }
})

export const { setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;