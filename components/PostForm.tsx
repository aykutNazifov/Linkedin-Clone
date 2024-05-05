"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { ImageIcon } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
import createPostAction from "@/actions/createPostAction"

const PostForm = () => {
    const { user } = useUser()
    const ref = useRef<HTMLFormElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)


    const handlePostAction = async (formData: FormData) => {
        const formDataCopy = formData
        ref.current?.reset()

        const text = formDataCopy.get("postInput") as string

        if (!text) {
            throw new Error("Post input is required!")
        }

        try {
            await createPostAction(formDataCopy)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="mb-2">
            <form ref={ref} action={handlePostAction} className="p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        {user?.id ? (
                            <AvatarImage src={user?.imageUrl ?? "https://github.com/shadcn.png"} />
                        ) : (
                            <AvatarImage src={"https://github.com/shadcn.png"} />
                        )}
                        <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <input type="text" placeholder="Start writing a post..." name="postInput" className="flex-1 outline-none rounded-full py-3 px-4 border" />

                    <input ref={fileInputRef} type="file" name="image" accept="image/*" className="hidden" onChange={handlePreviewChange} />
                </div>
                {preview && (
                    <div className="w-full h-[300px] relative mt-2">
                        <Image alt="" src={preview} fill className="object-cover" />
                    </div>
                )}
                <div className="flex justify-end space-x-2 mt-2">
                    <Button onClick={() => fileInputRef.current?.click()} type="button"><ImageIcon className="mr-2" size={16} />{preview ? "Change" : "Add"} Image</Button>

                    {preview && (
                        <Button type="button" variant="outline" onClick={() => setPreview(null)}>Remove Image</Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default PostForm