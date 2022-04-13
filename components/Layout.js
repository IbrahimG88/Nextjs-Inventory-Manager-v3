import Footer from "../components/Footer";
import BulmaMenu from "./BulmaMenu";
import BulmaNavBar from "./BulmaNavbar";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthForm from "./auth/auth-form";
import Head from "next/head";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [menuToggle, setMenuToggle] = useState(true);
  if (session) {
    return (
      <>
        <BulmaNavBar />
        <br />
        <Button
          onClick={() => setMenuToggle(!menuToggle)}
          style={{
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          Toggle Menu
        </Button>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {menuToggle ? <BulmaMenu className="column is-one-quarter" /> : null}
          <Head>
            <title>Invnetory Manager</title>
          </Head>
          <main style={{ margin: "auto" }}>{children}</main>
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
