/*
import { useSession, signIn, signOut } from "next-auth/react";
import Home from "./home";

import AuthForm from "../components/auth/auth-form";

import "bulma/css/bulma.min.css";

import { Fragment } from "react";

import { ChakraProvider } from "@chakra-ui/react";

export default function MyAppHere() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Hello too myy app you are signed in</p>
        <button onClick={() => signOut()}>Sign out</button>
        <Home />
        <Fragment>
          <p>Signed in as {session.user.email} </p>
          <br />
          <button onClick={() => signOut()}>Sign out</button>
          <ChakraProvider>
            <BulmaNavBar />
            <div style={{ display: "flex", "flex-direction": "row" }}>
              <BulmaMenu className="column is-one-quarter" />
            </div>
          </ChakraProvider>
        </Fragment>
      </div>
    );
  }
  return (
    <>
      <AuthForm />
    </>
  );
}

*/
