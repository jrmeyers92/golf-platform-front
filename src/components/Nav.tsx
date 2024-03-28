import { buttonVariants } from "./ui/button";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="my-4 flex items-center justify-between px-2">
      <h1 className="text-2xl font-bold tracking-tighter">
        <Link href="/">Golfrr</Link>
      </h1>
      <div className="flex items-center gap-2">
        <Link href="sign-in" className={buttonVariants()}>
          Sign In
        </Link>
        <Link href="sign-up" className={buttonVariants()}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
