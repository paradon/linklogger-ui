import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        stroke="black"
        strokeWidth="2"
        d="M3 5 L17 5 M3 10 L17 10 M3 15 L17 15"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path stroke="black" stroke-width="2" d="M5 5 L15 15 M15 5 L5 15" />
    </svg>
  );
}

function Hamburger({ isOpen }: { isOpen: boolean }) {
  return isOpen ? <CrossIcon /> : <HamburgerIcon />;
}

export default function Navbar({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className={styles.navigation}>
      <span className={styles.brandName}>{title}</span>
      <button
        className={styles.hamburger}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <Hamburger isOpen={isNavExpanded} />
      </button>
      <ul
        className={`${styles.navigationMenu} ${
          isNavExpanded ? styles.expanded : ''
        }`}
      >
        {items.map((item) => (
          <li key={item.label}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : undefined
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
