import { connectDb } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    auth().protect()

    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ message: "You are not authenticated." })
    }

    const body = await req.json()

    const { text, imageUrl } = body

    const userDb: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || ""
    }

    const postBody = {
        user: userDb,
        text,
        ...(imageUrl && { imageUrl })
    }

    try {
        await connectDb()

        await Post.create(postBody)

        return NextResponse.json({ message: "Post created successfully." })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }

}

export async function GET(req: Request) {
    try {
        await connectDb();

        const posts = await Post.getAllPosts()

        return NextResponse.json({ posts })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}