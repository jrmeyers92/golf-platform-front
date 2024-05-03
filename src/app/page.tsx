import { auth, currentUser } from "@clerk/nextjs/server";
import HomeHero from "@/components/HomeHero";

export default async function Home() {
  const { userId } = auth();

  const user = await currentUser();
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HomeHero />
    </main>
  );
}
