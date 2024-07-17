import { useState, useEffect } from "react";
import styles from "./ListOfCities.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
export default function ListOfCities() {
  const { cities, setCities, loading, error } = useCities();
  return (
    <>
      {loading && <p>Loading Data</p>}
      {error && <p>Error in fetching</p>}
      {cities && <List cities={cities} setCities={setCities} />}
    </>
  );
}
function List() {
  const { cities, setCities } = useCities();

  return (
    <ul className={styles.citieslist}>
      {cities.map((city, i) => {
        return <City key={i} City={city} />;
      })}
    </ul>
  );
}
function City({ City, key }) {
  const navigate = useNavigate();
  const { currentcity } = useCities();
  const { removeCity } = useCities();
  const { cityName, country, emoji, dates, notes, position, id } = City;
  const date = new Date(City.date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`${City.id}?lat=${position.lat}&lng=${position.lng}`}>
      <li
        className={`${styles.city} ${
          currentcity.id === id ? styles["city--active"] : " "
        }`}
      >
        <div>{City.emoji}</div>
        <div className={styles.name}>
          <strong>{City.cityName}</strong>
        </div>
        <div>{date}</div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              removeCity(City.id);
            }}
          >
            X
          </button>
        </div>
      </li>
    </Link>
  );
}
