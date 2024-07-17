/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  loading: false,
  error: false,
  currentcity: {},
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "loading":
      return { ...state, loading: payload };
    case "error":
      return { ...state, error: payload };
    case "get":
      return { ...state, cities: payload };
    case "remove":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== payload),
      };
    case "current":
      return {
        ...state,
        currentcity: payload,
      };
    case "add":
      return {
        ...state,
        cities: [...state.cities, payload],
      };
    default:
      console.log("Action type not matching");
  }
}
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, loading, error, currentcity } = state;
  useEffect(() => {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "error", payload: false });
    async function fetchCities() {
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "get", payload: data });
        console.log("done");
        console.log(data);
      } catch (e) {
        dispatch({ type: "error", payload: true });
      }
    }
    fetchCities();
    dispatch({ type: "loading", payload: false });
  }, []);
  async function removeCity(id) {
    try {
      dispatch({ type: "remove", payload: id });
      await fetch(`http://localhost:8000/cities/${id}`, { method: "DELETE" });
    } catch (e) {
      console.log("ERROR OCCURED");
    }
  }
  async function getCity(id) {
    try {
      dispatch({ type: "loading", payload: "true" });
      dispatch({ type: "error", payload: false });
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "current", payload: data });
    } catch (e) {
      console.log(e);
      dispatch({ type: "error", payload: true });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }
  async function createCity(city) {
    try {
      const res = await fetch("http://localhost:8000/cities", {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-type": "application/json",
        },
      });
      dispatch({ type: "add", payload: city });
    } catch (e) {
      console.log("some error occured");
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        removeCity,
        getCity,
        currentcity,
        createCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Undefined context", 404);
  return context;
}
export { CitiesProvider, useCities };
