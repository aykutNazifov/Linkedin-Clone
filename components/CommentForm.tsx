import createCommentAction from '@/actions/createCommentAction';
import { useUser } from '@clerk/nextjs';
import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const CommentForm = ({ postId }: { postId: string }) => {

    const { user } = useUser();
    const ref = useRef<HTMLFormElement>(null);

    const handleCommentAction = async (formData: FormData): Promise<void> => {
        const formDataCopy = formData;
        ref.current?.reset();

        try {
            if (!user?.id) {
                throw new Error("User not authenticated");
            }

            await createCommentAction(postId, formDataCopy);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form
            ref={ref}
            action={handleCommentAction}
            className="flex items-center space-x-1"
        >
            <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 bg-white border rounded-full px-3 py-2">
                <input
                    type="text"
                    name="commentInput"
                    placeholder="Add a comment..."
                    className="outline-none flex-1 text-sm bg-transparent"
                />
                <button type="submit" hidden>
                    Comment
                </button>
            </div>
        </form>
    )
}

export default CommentForm