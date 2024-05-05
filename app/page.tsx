import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";

export default function Home() {
  return (
    <div className="grid max-w-6xl mx-auto py-5 grid-cols-8 space-x-4">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation />
      </section>
      <section className="col-span-full md:col-span-6 lg:col-span-4">
        <PostForm />
      </section>
      <section className="hidden xl:inline col-span-2">Widget</section>
    </div>
  );
}
