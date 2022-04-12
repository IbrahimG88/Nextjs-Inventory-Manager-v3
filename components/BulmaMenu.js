import Link from "next/link";
import { useState } from "react";

export default function BulmaMenu() {
  const [isActive, setActive] = useState("Home");

  const data = [
    { link: "/", label: "Home" },
    { link: "/react-table", label: "Inventory" },
    {
      link: "/accordion-updated",
      label: "Add Stocks",
    },
    {
      link: "/load-inventory-from-lis",
      label: "Update tests list",
    },
  ];

  return (
    <aside
      className="menu column is-one-quarter"
      style={{ " menuItemActiveColor": "#fff" }}
    >
      <p className="menu-label ">Menu</p>
      <ul className="menu-list">
        {data.map((item) => (
          <li key={item.label}>
            <Link href={item.link} passHref>
              <a
                //href={item.link}
                className={item.label === isActive ? "is-active" : null}
                onClick={(event) => {
                  // event.preventDefault();
                  setActive(item.label);
                }}
              >
                <span>{item.label}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// you need a map function for the list elements
// toggle class on multiple elements react
// https://stackoverflow.com/questions/47812067/toggle-class-on-multiple-elements-react

/*
const data = [
  { link: '', label: 'Notifications', icon: BellRinging },
  { link: '', label: 'Billing', icon: Receipt2 },
  { link: '', label: 'Security', icon: Fingerprint },
  { link: '', label: 'SSH Keys', icon: Key },
  { link: '', label: 'Databases', icon: DatabaseImport },
  { link: '', label: 'Authentication', icon: TwoFA },
  { link: '', label: 'Other Settings', icon: Settings },
];


data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}



      <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
*/
