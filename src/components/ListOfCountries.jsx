import { useState, useEffect } from "react";
import styles from "./ListOfCountries.module.css";
export default function ListOfCountries() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchCountries() {
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCountries((countries) =>
          data.map((city, i) => ({
            flag: city.emoji,
            country: city.country,
            key: i,
          }))
        );
        console.log("done");
        console.log(data);
      } catch (e) {
        setError(true);
      }
    }
    fetchCountries();
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <p>Loading Data</p>}
      {error && <p>Error in fetching</p>}
      {countries && <List countries={countries} setCountries={setCountries} />}
    </>
  );
}
function List({ countries, setCountries }) {
  function removeCountry(key) {
    setCountries((cities) => cities.filter((city) => city.key !== key));
  }
  return (
    <ul className={styles.countrieslist}>
      {countries.map((country) => (
        <Country
          key={country.key}
          Country={country}
          removeCountry={() => removeCountry(country.key)}
        />
      ))}
    </ul>
  );
}
function Country({ Country, key, removeCountry }) {
  return (
    <li className={styles.country}>
      <button className={styles.closeButton} onClick={removeCountry}>
        X
      </button>
      <div className={styles.countryDetails}>
        <div className={styles.countryFlag}>{Country.flag}</div>
        <div className={styles.countryName}>{Country.country}</div>
      </div>
    </li>
  );
}
