import { useSession, signIn, signOut } from "next-auth/react";

import "bulma/css/bulma.min.css";

import { Fragment } from "react";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

/*
function HomePage() {
  return (
    <Fragment>
      <StartingPageContent />
    </Fragment>
  );
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
