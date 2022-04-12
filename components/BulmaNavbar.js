import { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/Inventory-Manager-logos_black.png";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function BulmaNavBar() {
  return (
    <Fragment>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ backgroundColor: "bisque" }}
      >
        <div className="navbar-brand">
          <Image
            src={Logo}
            alt="App Logo"
            width={100}
            height={100}
            styles={{ radios: "10px" }}
          />

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Button className="button is-light" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
