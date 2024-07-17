import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation.jsx";
import styles from "./Map.module.css";
export default function Map() {
  const { user, isAuthenticated, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const { isLoading, position: geoPosition, getPosition } = useGeolocation();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  useEffect(() => {
    if (mapLat && mapLng) setPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  useEffect(() => {
    if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);
  return (
    <div className={styles.MapContainer}>
      <button
        onClick={(e) => {
          getPosition();
        }}
      >
        {isLoading === true ? "Loading" : "Get GeoLocation"}
      </button>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <>
              <Marker position={[city.position.lat, city.position.lng]}>
                <Popup>You are at {city.cityName}</Popup>
              </Marker>
            </>
          );
        })}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 5);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
