"use client"

import { IPostDocument } from '@/mongodb/models/post'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import ReactTimeago from "react-timeago";
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import deletePostAction from '@/actions/deletePostAction'
import Image from 'next/image'
import PostOptions from './PostOptions'

interface IPostProps {
    post: IPostDocument
}

const Post: React.FC<IPostProps> = ({ post }) => {
    const { user } = useUser()

    const isAuthor = user?.id === post.user.userId

    const handleDeletePost = async () => {
        const pormise = await deletePostAction(post?._id)
    }


    return (
        <div className='bg-white rounded-md border'>
            <div className='p-4 flex space-x-2'>
                <div>
                    <Avatar>
                        {user?.id ? (
                            <AvatarImage src={post.user?.userImage ?? "https://github.com/shadcn.png"} />
                        ) : (
                            <AvatarImage src={"https://github.com/shadcn.png"} />
                        )}
                        <AvatarFallback>{post.user?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex justify-between flex-1'>
                    <div>
                        <div className="font-semibold">
                            {post.user.firstName} {post.user.lastName}{" "}
                            {isAuthor && (
                                <Badge className="ml-2" variant="secondary">
                                    Author
                                </Badge>
                            )}
                        </div>
                        <div className="text-xs text-gray-400">
                            @{post.user.firstName}
                            {post.user.firstName}-{post.user.userId.toString().slice(-4)}
                        </div>

                        <div className="text-xs text-gray-400">
                            <ReactTimeago date={new Date(post.createdAt)} />
                        </div>
                    </div>
                    {isAuthor && (
                        <Button onClick={() => handleDeletePost()} variant="outline"><Trash2 /></Button>
                    )}
                </div>
            </div>

            <div className="">
                <p className="px-4 pb-2 mt-2">{post.text}</p>

                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        alt="Post Image"
                        width={500}
                        height={500}
                        className="w-full mx-auto"
                    />
                )}
            </div>

            <PostOptions post={post} />
        </div>
    )
}

export default Post