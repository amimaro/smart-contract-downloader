import Head from "next/head";
import AppContextProvider from "../utils/useAppContext";
import { AppGithubButtons } from "./AppGithubButtons";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function Layout({ children }: any) {
  return (
    <main className="h-full w-full text-foreground dark">
      <Head>
        <title>Smart Contract Downloader</title>
        <meta name="description" content="Find and Download smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <NavbarBrand>
          <h1 className="text-xl">Smart Contract Downloader</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          <div className="hidden pt-2 md:block">
            <AppGithubButtons />
          </div>
        </NavbarContent>
      </Navbar>
      <AppContextProvider>
        <div className="mx-auto max-w-[1024px] p-6">
          <div className="block pb-2 md:hidden">
            <AppGithubButtons />
          </div>
          {children}
        </div>
      </AppContextProvider>
    </main>
  );
}
