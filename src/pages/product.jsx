import PageNav from "../components/PageNav.jsx";
import styles from "./product.module.css";
import { useNavigate } from "react-router-dom";
export default function Product() {
  const navigate = useNavigate();
  return (
    <main className={styles.product}>
      <PageNav />
      <section className={styles.image}></section>
      <section className={styles.text}>
        <div>
          Introducing WorldWise, the revolutionary app designed to track your
          global journey effortlessly. With its intuitive interface and
          cutting-edge technology, WorldWise maps out your footprints, offering
          a visual representation of the places you've explored. From bustling
          cities to serene landscapes, this app becomes your digital travel
          companion, chronicling your adventures in real-time.
        </div>
        <div>
          <br /> With WorldWise, every step becomes a part of your personal
          travel diary. Whether it's a spontaneous road trip or a planned
          expedition, the app seamlessly records your movements and the
          destinations you've visited. Dive into your travel history, reminisce
          about past experiences, and discover new insights into your
          wanderlust. WorldWise not only tracks your physical journey but also
          enriches your travel experience by providing valuable insights,
          recommendations, and memories that last a lifetime. Embark on a
          journey of self-discovery with WorldWise and let your footprints pave
          the way to unforgettable adventures.
        </div>
      </section>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </main>
  );
}
