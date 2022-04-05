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
import AuthForm from "../auth/auth-form";

export default function StartingPageContent() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
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
