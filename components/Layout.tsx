import Head from "next/head";
import AppContextProvider from "../utils/useAppContext";
import { AppGithubButtons } from "./AppGithubButtons";
import { cn } from "@/lib/utils";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full w-full flex-col">
      <Head>
        <title>Smart Contract Downloader</title>
        <meta name="description" content="Find and Download smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between gap-4 px-4 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight">
            Smart Contract Downloader
          </h1>
          <div className="hidden md:block">
            <AppGithubButtons />
          </div>
        </div>
      </header>
      <AppContextProvider>
        <div className="mx-auto w-full max-w-[1024px] flex-1 p-4 sm:p-6">
          <div className="block pb-2 md:hidden">
            <AppGithubButtons />
          </div>
          {children}
        </div>
      </AppContextProvider>
    </main>
  );
}
