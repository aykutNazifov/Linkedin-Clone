import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import { connectDb } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";

const fetchPosts = async () => {
  try {
    await connectDb()
    const posts = await Post.getAllPosts()
    return posts
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const posts = await fetchPosts()

  return (
    <div className="grid max-w-6xl mx-auto py-5 grid-cols-8 space-x-4">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation />
      </section>
      <section className="col-span-full md:col-span-6 lg:col-span-4">
        <PostForm />
        {posts && (
          <PostFeed posts={posts} />
        )}
      </section>
      <section className="hidden xl:inline col-span-2">Widget</section>
    </div>
  );
}
