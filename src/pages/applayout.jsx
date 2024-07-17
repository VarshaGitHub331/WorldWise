import styles from "./applayout.module.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Map from "../components/Map.jsx";
export default function AppLayout() {
  const [click, setClick] = useState(false);
  return (
    <main className={styles.applayout}>
      <section className={styles.citiesAndCountries}>
        <div className={styles.logo}>
          <img src="logo.png"></img>
        </div>
        <div className="twobuttons">
          <Link to="/app/cities">
            <button
              style={{ backgroundColor: click === 1 ? "grey" : "black" }}
              onClick={(e) => {
                setClick((click) => Number(e.target.id));
              }}
              id={1}
            >
              Cities
            </button>
          </Link>
          <Link to="countries">
            <button
              style={{ backgroundColor: click == 2 ? "grey" : "black" }}
              onClick={(e) => {
                setClick((click) => Number(e.target.id));
              }}
              id={2}
            >
              Countries
            </button>
          </Link>
        </div>
        <Outlet />
      </section>
      <section className={styles.map}>
        <Map />
      </section>
    </main>
  );
}
