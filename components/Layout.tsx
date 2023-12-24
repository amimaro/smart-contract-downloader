import Head from "next/head";
import AppContextProvider from "../utils/useAppContext";
import { AppGithubButtons } from "./AppGithubButtons";

export default function Layout({ children }: any) {
  return (
    <main className="h-full w-full text-foreground dark">
      <Head>
        <title>Smart Contract Downloader</title>
        <meta name="description" content="Find and Download smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 z-10 flex h-full flex-col items-center justify-between gap-2 bg-zinc-900 p-4 md:flex-row">
        <h1 className="text-xl">Smart Contract Downloader</h1>
        <div className="pt-2">
          <AppGithubButtons />
        </div>
      </div>
      <AppContextProvider>
        <div className="p-4">{children}</div>
      </AppContextProvider>
    </main>
  );
}
