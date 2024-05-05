import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from './ui/button'

const UserInformation = async () => {
    const user = await currentUser()
    return (
        <div className='flex flex-col justify-center items-center bg-white rounded-lg border py-4'>
            <Avatar>
                {user?.id ? (
                    <AvatarImage src={user?.imageUrl ?? "https://github.com/shadcn.png"} />
                ) : (
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                )}
                <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>

            <SignedIn>
                <div className='text-center'>
                    <p className='font-semibold'>
                        {user?.firstName} {user?.lastName}
                    </p>
                </div>
            </SignedIn>

            <SignedOut>
                <div className='text-center'>
                    <p>You are not signed in</p>
                    <Button variant="secondary">
                        <SignInButton>Sign In</SignInButton>
                    </Button>
                </div>
            </SignedOut>

            <hr className='w-full my-5 border-gray-200' />

            <div className='flex justify-between w-full px-4 text-sm'>
                <p className='font-semibold text-gray-400'>Posts</p>
                <p className='text-blue-400'>0</p>
            </div>

            <div className='flex justify-between w-full px-4 text-sm'>
                <p className='font-semibold text-gray-400'>Comments</p>
                <p className='text-blue-400'>0</p>
            </div>
        </div>
    )
}

export default UserInformation