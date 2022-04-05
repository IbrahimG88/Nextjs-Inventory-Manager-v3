import { useSession, signIn, signOut } from "next-auth/react";

import AuthForm from "../components/auth/auth-form";
import StartingPageContent from "../components/starting-page/starting-page";

function HomePage() {
  return <StartingPageContent />;
}

export default HomePage;

/*
export default function Component() {
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
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
*/
