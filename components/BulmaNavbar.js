import { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/Inventory-Manager-logos_black.png";

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
          <a href="/">
            <Image
              src={Logo}
              alt="App Logo"
              width={100}
              height={100}
              styles={{ radios: "10px" }}
            />
          </a>

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
          <div className="navbar-start">
            <a className="navbar-item">Documentation</a>

            <a className="navbar-item">About</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Contact us</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light" onClick={() => signOut()}>
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
