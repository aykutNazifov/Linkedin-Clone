import { IPostDocument } from '@/mongodb/models/post'
import React from 'react'

interface IPostOptionsProps {
    post: IPostDocument
}

const PostOptions: React.FC<IPostOptionsProps> = ({ post }) => {
    return (
        <div>PostOptions</div>
    )
}

export default PostOptions