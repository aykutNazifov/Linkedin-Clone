"use server"

import { Post } from "@/mongodb/models/post"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export default async function deletePostAction(postId: string) {
    const user = await currentUser()

    if (!user?.id) {
        throw new Error("User is not authenticated.")
    }

    const post = await Post.findById(postId)

    try {
        await post?.removePost()
        revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
}