import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider, useAuth } from "./contexts/FakeAuthContext.jsx";
const Product = lazy(() => import("./pages/product.jsx"));
const Pricing = lazy(() => import("./pages/pricing.jsx"));
const Home = lazy(() => import("./pages/home.jsx"));
const PageNotFound = lazy(() => import("./pages/pagenotfound.jsx"));
const AppLayout = lazy(() => import("./pages/applayout.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
import ListOfCities from "./components/ListOfCities.jsx";
import ListOfCountries from "./components/ListOfCountries.jsx";
import City from "./components/City.jsx";
import "./App.css";
import Form from "./components/form.jsx";
/*dist/index.html                   0.45 kB │ gzip:   0.29 kB
dist/assets/index-cbd3e132.css   28.98 kB │ gzip:   4.58 kB
dist/assets/index-ae6934a4.js   516.17 kB │ gzip: 147.95 kB*/
function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<p>Loading</p>}>
              <Routes>
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<ListOfCities />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<ListOfCountries />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
