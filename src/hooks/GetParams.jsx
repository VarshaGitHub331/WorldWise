import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function useLatLng() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
