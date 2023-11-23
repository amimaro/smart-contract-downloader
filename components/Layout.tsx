import Head from "next/head";
import AppContextProvider from "../utils/useAppContext";
import { AppGithubButtons } from "./AppGithubButtons";
import BuyMeACoffee from "./BuyMeACoffee";

export default function Layout({ children }: any) {
  return (
    <main className="h-full w-full p-4">
      <Head>
        <title>Smart Contract Downloader</title>
        <meta name="description" content="Find and Download smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <h1>Smart Contract Downloader</h1>
        <div className="flex flex-col items-end gap-4">
          <AppGithubButtons />
          <BuyMeACoffee />
        </div>
      </div>
      <AppContextProvider>{children}</AppContextProvider>
    </main>
  );
}
