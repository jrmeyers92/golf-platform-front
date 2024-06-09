import AllPosts from "@/components/AllPosts";
import HomeHero from "@/components/HomeHero";
import MyPosts from "@/components/MyPosts";
import { SignedIn } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HomeHero />
      <SignedIn>
        <div className="container my-6 grid grid-cols-3 gap-4">
          <div className="col-span-1 ">
            <MyPosts />
          </div>
          <div className="col-span-2 h-10">
            <AllPosts />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
