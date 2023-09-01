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
    comments: string[]
}

export type FriendType = {
    _id: string,
    firstName: string,
    lastName: string,
    occupation: string,
    location: string,
    pictureUrl: string
}
