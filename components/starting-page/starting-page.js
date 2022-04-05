/*
import classes from "./starting-page.module.css";

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default StartingPageContent;

*/

import { useSession, signIn, signOut } from "next-auth/react";

import AuthForm from "../../components/auth/auth-form";

import "bulma/css/bulma.min.css";
import BulmaNavBar from "../../pages/Layout/bulma-Navbar";
import BulmaMenu from "../../pages/Layout/bulma-menu";
import { Fragment } from "react";

import { ChakraProvider } from "@chakra-ui/react";

export default function StartingPageContent() {
  const { data: session } = useSession();
  if (session) {
    return (
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
    );
  }
  return (
    <>
      <AuthForm />
    </>
  );
}

/*
above:  <AuthForm />
  Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
 */
