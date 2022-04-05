// pages/_app.js
import { SessionProvider } from "next-auth/react";
import "bulma/css/bulma.min.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
