import { connectDb } from "@/mongodb/db"
import { Post } from "@/mongodb/models/post"
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { post_id: string } }) {
    try {
        await connectDb()
        const post = await Post.findById(params.post_id)

        if (!post) {
            return NextResponse.json({ message: "Post not found." })
        }

        return NextResponse.json({ post })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}


export async function DELETE(req: Request, { params }: { params: { post_id: string } }) {
    auth().protect()
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ message: "You are not authenticated." })
    }

    try {
        await connectDb()

        const post = await Post.findById(params.post_id)

        if (!post) {
            return NextResponse.json({ message: "Post not found." })
        }

        if (post.user.userId !== user.id) {
            return NextResponse.json({ message: "You are not allowed to delete this post." })
        }

        await post.removePost()

        return NextResponse.json({ message: "Post has been deleted successfully." })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}