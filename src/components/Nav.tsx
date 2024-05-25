import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export const Nav = () => {
  return (
    <nav className="flex h-[8vh] w-full items-center justify-between border-b px-2 py-4">
      <h1 className="text-2xl font-bold tracking-tighter">
        <Link href="/">Golfrr</Link>
      </h1>

      <div className="flex gap-2">
        <SignedOut>
          <Button asChild>
            <SignUpButton />
          </Button>
          <Button
            asChild
            className={cn(buttonVariants({ variant: "outline" }), "text-black")}
          >
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="mr-2">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
