import { useSession, signIn, signOut } from "next-auth/react";

export default function MyAppHere() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Hello too myy app you are signed in</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
}
