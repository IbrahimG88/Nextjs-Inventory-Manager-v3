import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BulmaMenu from "./BulmaMenu";
import BulmaNavBar from "./BulmaNavbar";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthForm from "./auth/auth-form";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <BulmaNavBar />
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <BulmaMenu className="column is-one-quarter" />

          <main>{children}</main>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <AuthForm />
    </>
  );
}
