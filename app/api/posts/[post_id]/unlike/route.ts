import { connectDb } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { post_id: string } }
) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ message: "You are not authenticated." })
    }

    try {
        await connectDb();
        const post = await Post.findById(params.post_id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" });
        }

        await post.unlikePost(user.id);
        return NextResponse.json({ message: "Post liked successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}