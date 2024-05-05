import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Briefcase, HomeIcon, MessagesSquare, SearchIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const Header = () => {
    return (
        <div className="flex items-center p-2 max-w-6xl mx-auto justify-between">
            <div><Image src="/logo.png" alt="" width={80} height={40} /></div>

            <div className="flex flex-1 items-center max-w-96 bg-gray-100 p-2 rounded-md mx-2">
                <SearchIcon className="h-4 text-gray-600" />
                <input type="text" className="flex-1 bg-transparent outline-none" placeholder="Search..." />
            </div>

            <div className="flex items-center space-x-4 px-6">
                <Link href="/" className="icon">
                    <HomeIcon className="h-5" />
                    <p>Home</p>
                </Link>
                <Link href="/" className="icon hidden md:flex">
                    <UserIcon className="h-5" />
                    <p>Network</p>
                </Link>
                <Link href="/" className="icon hidden md:flex">
                    <Briefcase className="h-5" />
                    <p>Jobs</p>
                </Link>
                <Link href="/" className="icon hidden md:flex">
                    <MessagesSquare className="h-5" />
                    <p>Messaging</p>
                </Link>

                {/* User Button */}

                <SignedIn>
                    <UserButton />
                </SignedIn>

                <SignedOut>
                    <Button asChild variant="secondary">
                        <SignInButton />
                    </Button>
                </SignedOut>


            </div>
        </div>
    )
}

export default Header