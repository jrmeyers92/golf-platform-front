import { buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

export const Nav = () => {
  return (
    <nav className="flex h-[8vh] w-full items-center justify-between border-b px-2 py-4">
      <h1 className="text-2xl font-bold tracking-tighter">
        <Link href="/">Golfrr</Link>
      </h1>

      <div className="flex gap-2">
        <SignedOut>
          <SignUpButton className={buttonVariants()} />
          <SignInButton className={buttonVariants({ variant: "outline" })} />
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
