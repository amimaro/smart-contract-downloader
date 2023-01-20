import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="font-mono">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
