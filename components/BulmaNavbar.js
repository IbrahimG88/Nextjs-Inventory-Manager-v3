import { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/Inventory-Manager-logos_black.png";
import Link from "next/link";

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
          <Link href="/" passHref>
            <Image
              src={Logo}
              alt="App Logo"
              width={100}
              height={100}
              styles={{ radios: "10px" }}
            />
          </Link>

          <Link
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item">Documentation</Link>

            <Link className="navbar-item">About</Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link">Contact us</Link>

              <div className="navbar-dropdown">
                <Link className="navbar-item">About</Link>
                <Link className="navbar-item">Jobs</Link>
                <Link className="navbar-item">Contact</Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item">Report an issue</Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-light" onClick={() => signOut()}>
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
