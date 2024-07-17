import { createContext, useContext, useReducer } from "react";
const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "VARSHA",
  email: "varsha.sud@gmail.com",
  password: "random",
};
const AuthContext = createContext();
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "login":
      return { ...state, user: payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (FAKE_USER.email === email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: email });
    else console.log("LOGIN ERROR");
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) console.log("Context Error");
  return context;
}
export { AuthProvider, useAuth };
