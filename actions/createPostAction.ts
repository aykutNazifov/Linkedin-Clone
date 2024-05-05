"use server"

import { connectDb } from "@/mongodb/db"
import { Post } from "@/mongodb/models/post"
import { IUser } from "@/types/user"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export default async function createPostAction(formData: FormData) {
    const user = await currentUser()

    if (!user) {
        throw new Error("User not authenticated!")
    }

    const postInput = formData.get("postInput") as string
    const image = formData.get("imgae") as File

    if (!postInput) {
        throw new Error("Post input is required!")
    }

    const userDb: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || ""
    }

    try {
        await connectDb()
        const body = {
            user: userDb,
            text: postInput
        }

        await Post.create(body)

    } catch (error: any) {
        console.log("err", error)
        throw new Error("Something went wrong!", error)
    }

    revalidatePath("/")
}

