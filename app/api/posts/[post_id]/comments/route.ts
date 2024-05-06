import { connectDb } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { post_id: string } }
) {
    try {
        await connectDb();

        const post = await Post.findById(params.post_id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" });
        }

        const comments = await post.getAllComments();
        return NextResponse.json({ comments });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}

export interface AddCommentRequestBody {
    text: string;
}

export async function POST(
    request: Request,
    { params }: { params: { post_id: string } }
) {
    const { text }: AddCommentRequestBody = await request.json();
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ message: "You are not authenticated." })
    }
    try {
        await connectDb()
        const post = await Post.findById(params.post_id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" });
        }

        const userDb: IUser = {
            userId: user.id,
            userImage: user.imageUrl,
            firstName: user.firstName || "",
            lastName: user.lastName || ""
        }

        const comment = {
            user: userDb,
            text,
        };

        await post.commentOnPost(comment);
        return NextResponse.json({ message: "Comment added successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error })
    }
}
