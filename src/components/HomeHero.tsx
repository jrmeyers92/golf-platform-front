import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import PostModal from "./PostModal";
import { Button, buttonVariants } from "./ui/button";

const HomeHero = () => {
  const siginInButtonClass = cn(
    buttonVariants({ size: "lg" }),
    "mt-4 bg-green-500 hover:bg-green-600",
  );
  return (
    <section className="relative max-h-[92vh] w-full overflow-hidden">
      <Image
        src="/heroBg.jpg"
        alt="Golf course"
        width={2000}
        height={800}
        className="h-full w-full object-cover brightness-50"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
        <h1 className="mb-2 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-7xl">
          <SignedOut>Welcome to Golfrr</SignedOut>
          <SignedIn>Welcome back to Golfrr</SignedIn>
        </h1>
        <p className="text-center text-white md:text-2xl">
          <SignedOut>The best place to find golf courses near you.</SignedOut>
          <SignedIn>Find your next golf course.</SignedIn>
        </p>

        <SignedIn>
          <PostModal
            buttonText="Make A Post"
            buttonClasses="mt-4 bg-green-500 hover:bg-green-600"
          />
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-4 bg-green-500 hover:bg-green-600",
            )}
          >
            <SignUpButton />
          </Button>
        </SignedOut>
      </div>
    </section>
  );
};

export default HomeHero;
