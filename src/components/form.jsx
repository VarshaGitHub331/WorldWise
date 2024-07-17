import styles from "./form.module.css";
import useLatLng from "../hooks/GetParams.jsx";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext.jsx";

function CountrytoEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 123797 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [lat, lng] = useLatLng();
  const [name, setName] = useState(" ");
  const [country, setCountry] = useState(" ");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState(" ");
  const [LoadingCity, setLoadingCity] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [countryName, setCountryName] = useState(" ");
  const { createCity } = useCities();
  useEffect(() => {
    async function CityFromLoc() {
      try {
        setLoadingCity(true);
        setErrorCity(false);
        const res = await fetch(
          `http://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        console.log(data);
        if (!data.countryCode) {
          throw new Error(" Doesnt seem to be a city");
        }
        setName(data.city || data.locality);
        setCountry(data.countryCode);
        setCountryName(data.countryName);
        setLoadingCity(false);
      } catch (e) {
        setErrorCity(true);
      } finally {
        setLoadingCity(false);
      }
    }
    CityFromLoc();
  }, [lat, lng]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !date) return;
    const newCity = {
      cityName: name,
      countryName,
      emoji: country,
      date,
      notes: note,
      position: { lat, lng },
    };
    console.log(newCity);
    createCity(newCity);
  }
  return (
    <>
      {errorCity && <p>Error in Fetching City</p>}
      {!errorCity && (
        <form
          className={styles.addCity}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label htmlFor="cityn">City Name</label>

            <input
              type="text"
              id="cityn"
              value={!LoadingCity && `${name + " " + country}`}
            />
          </div>
          <div>
            <label htmlFor="time">When did you go {!LoadingCity && name}</label>

            <DatePicker
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
            />
          </div>
          <div>
            <label htmlFor="notes">
              Notes About Your Trip To {!LoadingCity && name}
            </label>

            <input
              type="text"
              id="notes"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </div>
          <button>ADD</button>
        </form>
      )}
    </>
  );
}
