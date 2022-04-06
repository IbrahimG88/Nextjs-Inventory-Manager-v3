// pages/_app.js
import { SessionProvider } from "next-auth/react";

import "bulma/css/bulma.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}
