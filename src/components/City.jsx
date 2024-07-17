import { useParams } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useEffect } from "react";
import styles from "./City.module.css";
export default function City() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { getCity, currentcity, loading, error } = useCities();
  useEffect(() => {
    console.log(id);
    getCity(id);
    console.log(currentcity);
  }, [id]);
  let { cityName, emoji, date, notes } = currentcity;
  date = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      {loading && <p>Loading City!!</p>}
      {!loading && !error && (
        <div className={styles.city}>
          <div>
            <p>CITY NAME</p>
            <p>
              <strong>
                {emoji} {cityName}
              </strong>
            </p>
          </div>
          <div>
            <p>YOU WENT TO {cityName} ON</p>
            <p>{date}</p>
          </div>
          <div>
            <p>YOUR COMMENTS</p>
            <p>{notes}</p>
          </div>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            BACK
          </button>
        </div>
      )}
    </>
  );
}
