import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
export default function PageNav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.first}>
            <NavLink to="/">
              <img src="logo.png" alt="sorry" />
            </NavLink>
          </li>
          <li className={styles.other}>
            <NavLink to="/product">PRODUCT</NavLink>
          </li>
          <li className={styles.other}>
            {" "}
            <NavLink to="/pricing">PRICING</NavLink>
          </li>
          <li className={styles.other}>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
