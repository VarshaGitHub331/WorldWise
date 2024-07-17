import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import styles from "./login.module.css";
import { AuthProvider, useAuth } from "../contexts/FakeAuthContext.jsx";
export default function Login() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState("zach@gmail.com");
  const [password, setPassword] = useState(" ");
  function Submit(e) {
    e.preventDefault();
    login(email, password);
    if (user && isAuthenticated) {
      navigate("/app");
    } else navigate("/login");
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <section>
        <form
          action="/app"
          method="get"
          onSubmit={(e) => {
            Submit(e);
          }}
        >
          <div>
            <label htmlFor="email">Email Address-</label>
            <br />
            <input
              value={email}
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password-</label>
            <br />
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button>Submit</button>
        </form>
      </section>
    </main>
  );
}
