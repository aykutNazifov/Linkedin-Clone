import { IPostDocument } from '@/mongodb/models/post'
import React from 'react'
import Post from './Post'

interface IPostFeedProps {
    posts: IPostDocument[]
}

const PostFeed: React.FC<IPostFeedProps> = ({ posts }) => {
    return (
        <div className='pb-20 space-y-2'>
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    )
}

export default PostFeed