import PageNav from "../components/PageNav.jsx";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
export default function Home() {
  return (
    <main className={styles.home}>
      <PageNav />
      <section>
        <h1>
          You travel the world
          <br />
          WorldWise keeps track of your <br />
          adventures
        </h1>
        <h2>
          A world map that tracks your footsteps in every city you can think of.
          Never forget your experiences and show your firends how you have
          wandered the world.
        </h2>
      </section>
      <Link to="/app">
        <button>Start Tracking Now</button>
      </Link>
    </main>
  );
}
