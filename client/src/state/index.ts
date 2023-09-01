import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {FriendType, Post, User} from "../../types";

interface mainState {
    mode: string,
    currentUser: User | null
    visitedUser: User | null
    token: string | null
    posts: Post[]
}

const initialState: mainState = {
    mode: "light",
    currentUser: null,
    visitedUser: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
            console.log(action.payload.user)
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.currentUser = null;
            state.token = null;
        },
        setFriends: (state, action: PayloadAction<{ friends: FriendType[] }>) => {
            if(state.currentUser) {
                state.currentUser.friends = action.payload.friends
                console.log("friends changed")
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
        setVisitedUser: (state, action: PayloadAction<{ user: User;}>) => {
            state.visitedUser = action.payload.user;
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setVisitedUser} = authSlice.actions;
export default authSlice.reducer;