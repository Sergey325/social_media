export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    pictureUrl: string,
    friends: FriendType[],
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number,
    online: boolean,

}

export type Post = {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    pictureUrl: string,
    userPictureUrl: string,
    likes: Record<string, boolean>;
    comments: Comment[]
}

export type FriendType = {
    _id: string,
    firstName: string,
    lastName: string,
    occupation: string,
    location: string,
    pictureUrl: string
    online: boolean,
}

export type Comment = {
    userId: string,
    firstName: string,
    lastName: string,
    text: string,
    userPictureUrl: string,
    date: Date,
}

export type Message = {
    _id: string,
    sender: User,
    chat: Chat,
    content: string,
    unread: Boolean,
    createdAt: Date,
}

export type Chat = {
    _id: string,
    participants: User[],
    latestMessage: Message,
}
