import { IUser } from "@/types/user";
import mongoose, { Document, Model, Schema, model, models } from "mongoose";
import { Comment, IComment, ICommentBase } from "./comment";

export interface IPostBase {
    user: IUser;
    text: string;
    imageUrl?: string;
    comments?: IComment[];
    likes?: string[];
}

export interface IPost extends Document, IPostBase {
    createdAt: Date;
    updatedAt: Date;
}

interface IPostMethods {
    likePost(userId: string): Promise<void>;
    unlikePost(userId: string): Promise<void>;
    commentOnPost(comment: ICommentBase): Promise<void>;
    getAllComents(): Promise<IComment[]>;
    removePost(): Promise<void>;
}

interface IPostStatics {
    getAllPosts(): Promise<IPostDocument[]>
}

export interface IPostDocument extends IPost, IPostMethods { }
interface IPostModel extends IPostStatics, Model<IPostDocument> { }

const postSchema = new Schema({
    user: {
        userId: { type: String, required: true },
        userImage: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: { type: String },
    comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] },
    likes: { type: [String] }
}, { timestamps: true })

postSchema.methods.likePost = async function (userId: string) {
    try {
        await this.updateOne({ $addToSet: { likes: userId } })
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}

postSchema.methods.unlikePost = async function (userId: string) {
    try {
        await this.updateOne({ $pull: { likes: userId } })
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}

postSchema.methods.removePost = async function () {
    try {
        await this.model("Post").deleteOne({ _id: this._id })
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}

postSchema.methods.commentOnPost = async function (commentToAdd: ICommentBase) {
    try {
        const comment = await Comment.create(commentToAdd)
        this.comments.push(comment._id)
        await this.save()
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}

postSchema.methods.getAllComents = async function () {
    try {
        await this.populate({
            path: "comments",
            options: { sort: { creatdAt: -1 } }
        })
        return this.comments;
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}


postSchema.statics.getAllPosts = async function (userId: string) {
    try {
        const posts = await this.find().sort({ createdAt: -1 }).populate({
            path: "comments",
            options: { sort: { createdAt: -1 } }
        }).lean()

        return posts.map((post: IPostDocument) => ({
            ...post,
            _id: post._id.toString(),
            comments: post.comments?.map((comment: IComment) => ({
                ...comment,
                _id: comment._id.toString(),
            }))
        }))
    } catch (error) {
        throw new Error("Something went wrong.")
    }
}

export const Post = models.Post || mongoose.model<IPostDocument, IPostModel>("Post", postSchema)



