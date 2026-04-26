import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "./ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            SkillAI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>
              Sign In
            </Link>
            <Link href="/sign-up" className={buttonVariants()}>
              Get Started
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
